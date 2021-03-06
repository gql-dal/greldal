import { getTypeAccessorError } from "./utils/errors";
import { Dict, NNil, Maybe, ReturnType } from "./utils/util-types";
import { transform, forEach, reduce } from "lodash";
import * as t from "io-ts";
import * as types from "./utils/types";
import * as Knex from "knex";
import _debug from "debug";
import { GraphQLInputType, GraphQLOutputType } from "graphql";
import { MappedField } from "./MappedField";
import { FieldMapping } from "./FieldMapping";
import { MappedAssociation } from "./MappedAssociation";
import {
    deriveDefaultShallowOutputType,
    deriveDefaultOutputType,
    deriveDefaultShallowInputType,
    derivePaginatedOutputType,
} from "./graphql-type-mapper";
import { assertSupportedConnector, globalConnector, assertConnectorConfigured } from "./utils/connector";
import { MemoizeGetter } from "./utils/utils";
import { StoreQueryParams } from "./SingleSourceQueryOperationResolver";
import { ReverseMapper } from "./ReverseMapper";
import { AliasHierarchyVisitor } from "./AliasHierarchyVisitor";
import { DataSourceMapping } from "./DataSourceMapping";
import { deriveMappedDataSourceName, deriveStoredDataSourceName } from "./utils/conventional-naming";
import { deriveDefaultIdOutputType } from "./graphql-type-mapper";

const debug = _debug("greldal:MappedDataSource");

type AssociationsIn<T extends DataSourceMapping> = ReturnType<NNil<T["associations"]>>;

type FieldsIn<T extends DataSourceMapping> = ReturnType<NNil<T["fields"]>>;

type AssociationKeysIn<T extends DataSourceMapping> = keyof AssociationsIn<T>;

type FieldKeysIn<T extends DataSourceMapping> = keyof FieldsIn<T>;

type AssociatedDataSource<T extends DataSourceMapping, K extends AssociationKeysIn<T>> = AssociationsIn<T>[K]["target"];

type ShallowEntityType<T extends DataSourceMapping> = { [K in FieldKeysIn<T>]: FieldsIn<T>[K]["Type"] };

type NestedEntityType<T extends DataSourceMapping> = ShallowEntityType<T> &
    { [K in AssociationKeysIn<T>]: AssociatedDataSource<T, K>["EntityType"] };

/**
 * Represents mapping between a relational data source and associated GraphQL types
 * originating from the schema of this data source.
 *
 * @api-category MapperClass
 */
export class MappedDataSource<T extends DataSourceMapping = any> {
    fields: Dict<MappedField>;
    associations: Dict<MappedAssociation>;

    constructor(private mapping: T) {
        this.fields = mapping.fields ? mapping.fields(this) : {};
        this.associations = mapping.associations ? mapping.associations(this) : {};
        debug(
            "Mapped data source with name: %s, fields: %O, associations: %O",
            this.mappedName,
            Object.keys(this.fields),
            Object.keys(this.associations),
        );
        if (mapping.connector) {
            assertSupportedConnector(mapping.connector);
        }
    }

    /**
     * Knex instance used to connect to data source.
     *
     * This can be a data-source specific connector (if provided in the mapping configuration), and if not,
     * will fall back to global connector.
     *
     * Throws if a connector is not found.
     */
    get connector(): Knex {
        return assertConnectorConfigured(this.mapping.connector || globalConnector);
    }

    /**
     * Get a knex query builder for this data source
     *
     * This internally aliases tables for ease of reverse-mapping.
     */
    rootQueryBuilder(aliasHierarchyVisitor?: Maybe<AliasHierarchyVisitor>): Knex.QueryBuilder {
        if (this.mapping.rootQuery) return this.mapping.rootQuery(aliasHierarchyVisitor);
        return aliasHierarchyVisitor
            ? this.connector(`${this.storedName} as ${aliasHierarchyVisitor.alias}`)
            : this.connector(this.storedName);
    }

    /**
     * Get list of fields representing columns covered by primary key constraint
     */
    get primaryFields() {
        return Object.values<MappedField<any>>(this.fields).filter(f => f.isPrimary);
    }

    get primaryColumnNames() {
        return this.primaryFields.map(f => f.sourceColumn!);
    }

    /**
     * Name of the GraphQL output type representing an entity from this data source. Also used in other GraphQL output
     * types for this data source.
     */
    @MemoizeGetter
    get mappedName() {
        return deriveMappedDataSourceName(this.mapping.name);
    }

    /**
     * Name of the GraphQL output type representing a shallow entity (containing only fields and not associations) from this data source.
     */
    @MemoizeGetter
    get shallowMappedName() {
        return `Shallow${this.mappedName}`;
    }

    /**
     * Name of the table/view backing this data source
     */
    @MemoizeGetter
    get storedName() {
        return deriveStoredDataSourceName(this.mapping.name);
    }

    /**
     * Name of the GraphQL output type representing a page container that wraps page specific metadata along with
     * entities in the page (in a paginated query)
     */
    @MemoizeGetter
    get pageContainerName() {
        return `${this.mappedName}PageContainer`;
    }

    /**
     * Name of the GraphQL output type representing a page container that wraps page specific metadata along with
     * shallow entities in the page (in a paginated query)
     */
    @MemoizeGetter
    get shallowPageContainerName() {
        return `${this.shallowMappedName}PageContainer`;
    }

    /**
     * Name of the GraphQL output type representing a page that wraps a subset of result entities (in a paginated query)
     */
    @MemoizeGetter
    get pageName() {
        return `${this.mappedName}Page`;
    }

    /**
     * Name of the GraphQL output type representing a page that wraps a subset of shallow result entities (in a paginated query)
     */
    @MemoizeGetter
    get shallowPageName() {
        return `${this.shallowMappedName}Page`;
    }

    /**
     * List of names of the columns in the data source which are mapped through the fields in the data source mapping
     *
     * It is not necessary that all columns of backing table are covered by fields of the data source.
     */
    @MemoizeGetter
    get storedColumnNames(): string[] {
        return transform(
            this.fields,
            (result: string[], field: MappedField<MappedDataSource<T>, FieldMapping<any, any>>) => {
                if (field.isMappedFromColumn) {
                    result.push(field.sourceColumn!);
                }
            },
            [],
        );
    }

    /**
     * io-ts type props for field properties of a member entity
     */
    @MemoizeGetter
    get shallowEntityTypeSpecProps(): Dict<types.AnyTypeSpec> {
        return transform(this.fields, (result, field, name) => {
            result[name] = field.typeSpec;
            return result;
        });
    }

    /**
     * io-ts type props for association properties of a member entity
     */
    @MemoizeGetter
    get associationTypeSpecProps(): Dict<types.AnyTypeSpec> {
        const result: Dict<types.AnyTypeSpec> = {};
        forEach(this.associations, (association, name) => {
            result[name] = association.target.entityType;
        });
        return transform(
            this.associations,
            (result: t.Props, association: MappedAssociation<MappedDataSource<T>>, name: string) => {
                result[name] = association.target.entityType;
            },
            {},
        );
    }

    /**
     * io-ts type props for all properties (from fields and associations)
     */
    @MemoizeGetter
    get entityTypeSpecProps(): Dict<types.AnyTypeSpec> {
        return {
            ...this.shallowEntityTypeSpecProps,
            ...this.associationTypeSpecProps,
        };
    }

    /**
     * io-ts runtime type for shallow member entity (excludes associations) from this data source.
     */
    @MemoizeGetter
    get shallowEntityTypeSpec() {
        return types.object(`Shallow${this.mappedName}`, this.shallowEntityTypeSpecProps);
    }

    /**
     * io-ts runtime type for member entity from this data source.
     */
    @MemoizeGetter
    get entityTypeSpec() {
        return types.object(this.mappedName, this.entityTypeSpecProps);
    }

    /**
     * Getter to extract static type of Shallow member entity
     *
     * This is only useful in maped types. Throws if invoked directly.
     */
    get ShallowEntityType(): ShallowEntityType<T> {
        throw getTypeAccessorError("ShallowEntityType", "MappedDataSource");
    }

    /**
     * Getter to extract static type of member entity
     *
     * This is only useful in maped types. Throws if invoked directly.
     */
    get EntityType(): NestedEntityType<T> {
        throw getTypeAccessorError("NestedEntityType", "MappedDataSource");
    }

    /**
     * Getter to extract static type of the mapping used to configure the data source
     *
     * This is only useful in maped types. Throws if invoked directly.
     */
    get MappingType(): T {
        throw getTypeAccessorError("MappingType", "MappedDataSource");
    }

    /**
     * Get the default GraphQL output type for a member entity
     */
    @MemoizeGetter
    get defaultOutputType(): GraphQLOutputType {
        return deriveDefaultOutputType(this);
    }

    /**
     * Get the output type for the response ofa paginated response performed against this data source
     */
    @MemoizeGetter
    get paginatedOutputType() {
        return derivePaginatedOutputType(this.pageContainerName, this.pageName, this.defaultOutputType);
    }

    /**
     * Get the output type for the response of a paginated query (for shallow entities) performed against this data source
     */
    @MemoizeGetter
    get paginatedShallowOutputType() {
        return derivePaginatedOutputType(
            this.shallowPageContainerName,
            this.shallowPageName,
            this.defaultShallowOutputType,
        );
    }

    /**
     * Get the default GraphQL input type for a shallow member entity (excludes associations)
     */
    @MemoizeGetter
    get defaultShallowInputType(): GraphQLInputType {
        debug("Deriving default shallow input type for: ", this.mappedName);
        return deriveDefaultShallowInputType(this);
    }

    /**
     * Get the default GraphQL output type for a shallow member entity (excludes associations)
     */
    @MemoizeGetter
    get defaultShallowOutputType(): GraphQLOutputType {
        return deriveDefaultShallowOutputType(this);
    }

    @MemoizeGetter
    get defaultIdOutputType(): GraphQLOutputType {
        return deriveDefaultIdOutputType(this);
    }

    /**
     * Maps member entities (what the application interacts with) to rows (in the format the persistence layer expects)
     */
    mapEntitiesToRows(entities: ShallowEntityType<T>[]): Dict[] {
        return entities.map(entity =>
            reduce<ShallowEntityType<T>, Dict>(
                entity,
                (result: Dict, val, key: any) => {
                    const field = this.fields[key];
                    if (field) {
                        return field.updatePartialRow(result, val);
                    }
                    return result;
                },
                {},
            ),
        );
    }

    /**
     * Reverse map the rows obtained from the data source (the persistence layer) to member entities (what the application interacts with)
     */
    mapRowsToEntities(rows: Dict[], storeParams: StoreQueryParams<MappedDataSource<T>>) {
        return new ReverseMapper(storeParams).reverseMap(rows);
    }

    /**
     * Reverse map the rows obtained from the data source (the persistence layer) to shallow member entities
     * (what the application interacts with)
     *
     * This does not deal with mapping of associations, so is relatively cheaper than mapRowsToEntities
     */
    mapRowsToShallowEntities(rows: Dict[]) {
        return rows.map(row => {
            const mappedRow: Dict = {};
            for (const [, field] of Object.entries<MappedField<MappedDataSource<T>, FieldMapping<any, any>>>(
                this.fields,
            )) {
                mappedRow[field.mappedName] = field.getValue(row);
            }
            return mappedRow;
        });
    }

    /**
     * Given a query (entity field name -> value mapping), translates it into a query that the persistence
     * layer can process by mapping entity field names to source column names.
     */
    mapQueryParams(whereArgs: Dict, aliasHierarchyVisitor: AliasHierarchyVisitor) {
        const whereParams: Dict = {};
        Object.entries(whereArgs).forEach(([name, arg]) => {
            const field: MappedField = (this.fields as any)[name];
            if (field) {
                whereParams[`${aliasHierarchyVisitor.alias}.${field.sourceColumn}`] = arg;
                return;
            }
        });
        return whereParams;
    }
}

/**
 * Used to map a relational data source using specified configuration (of type [DataSourceMapping](api:DataSourceMapping)).
 *
 * Refer the guide on [Mapping Data Sources](guide:mapping-data-sources) for detailed explanation and examples.
 *
 * @api-category PrimaryAPI
 */
export const mapDataSource = <T extends DataSourceMapping>(mapping: T) => new MappedDataSource<T>(mapping);
