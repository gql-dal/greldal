import { GraphQLOutputType, GraphQLList, GraphQLResolveInfo } from "graphql";
import * as Knex from "knex";
import * as t from "io-ts";
import _debug from "debug";
import { MappedDataSource } from "./MappedDataSource";
import { assertType } from "./assertions";
import { getTypeAccessorError } from "./errors";
import { ResolveInfoVisitor } from "./ResolveInfoVisitor";
import { MemoizeGetter } from "./utils";
import { AliasHierarchyVisitor } from "./AliasHierarchyVisitor";
import { ResolverContext } from "./ResolverContext";
import { MappedOperation } from "./MappedOperation";
import { MappedAssociation } from "./MappedAssociation";
import { Dict } from "./util-types";
import { OperationMappingRT } from "./OperationMapping";
import { SourceAwareOperationResolver } from "./SourceAwareOperationResolver";

const debug = _debug("greldal:MappedOperation");

type RCtx<TSrc extends MappedDataSource, TArgs extends object> = ResolverContext<
    MappedSingleSourceOperation<TSrc, TArgs>,
    TSrc,
    TArgs
>;

export const SingleSourceOperationMappingRT = t.intersection([
    OperationMappingRT,
    t.partial({
        rootQuery: t.Function,
        deriveWhereParams: t.Function,
    }),
]);

/**
 * A MappedOperation encapsulates the logic and information needed to map an operation
 * on a data source to a GraphQL Query/Mutation
 *
 * A MappedOperation is expected to not contain the actual logic for the operation - it delegates
 * to a Resolver class which will handle how this operation can be resolved in the context of
 * specified data source using the provided args.
 *
 * MappedOperation is primarily concerned with selection of appropriate data sources (if more than one
 * are specified), selection of an appropriate resolver (if more than one are specified) and delegating
 * to the selected resolver for perforrming the actual operation in database.
 *
 * Creating a custom sub-class of a MappedOperation is usually not required for most common use cases
 * because most use cases are better served by a custom resolver used with either MappedQueryOperation
 * or MappedMutationOperation, both of which descend from this class.
 *
 * In rare cases, sub-classing MappedOperation (or one of its descendants) can be beneficial when
 * consumer wants a more control over the mapping of operation to GraphQL layer than is possible through
 * the OperationMapping configuration.
 *
 * Example of such use cases include:
 *
 * - When GraphQL args can not be deduced from a static configuration and need to be defined dynamically
 * - Arbitrary adhoc (potentially async) transformation of args before delegating to a resolver.
 *
 * @api-category MapperClass
 */
export abstract class MappedSingleSourceOperation<
    TSrc extends MappedDataSource,
    TArgs extends object
> extends MappedOperation<TArgs> {
    constructor(
        public mapping: MappedOperation<TArgs>["mapping"] & {
            rootSource: TSrc;

            rootQuery?: (
                dataSource: TSrc,
                args: TArgs,
                aliasHierarchyVisitor: AliasHierarchyVisitor,
            ) => Knex.QueryBuilder;

            deriveWhereParams?: (args: TArgs, association?: MappedAssociation) => Dict;

            resolver?: <TCtx extends ResolverContext<MappedSingleSourceOperation<TSrc, TArgs>, TSrc, TArgs>, TResolved>(
                ctx: TCtx,
            ) => SourceAwareOperationResolver<TCtx, TSrc, TArgs, TResolved>;
        },
    ) {
        super(mapping);
        assertType(SingleSourceOperationMappingRT, mapping, `Operation configuration: ${mapping.name}`);
    }

    get rootSource() {
        return this.mapping.rootSource;
    }

    @MemoizeGetter
    get type(): GraphQLOutputType {
        if (this.mapping.returnType) {
            return this.mapping.returnType;
        }
        let baseType: GraphQLOutputType;
        if (this.shallow) {
            baseType = this.mapping.rootSource.defaultShallowOutputType;
        } else {
            baseType = this.mapping.rootSource.defaultOutputType;
        }
        if (this.singular) {
            return baseType;
        }
        return GraphQLList(baseType);
    }

    get ResolverContextType(): RCtx<TSrc, TArgs> {
        throw getTypeAccessorError("ResolverContextType", "MappedOperation");
    }

    // abstract defaultResolver<TCtx extends RCtx<TSrc, TArgs>, TResolved>(
    //     ctx: any,
    // ): Resolver<TCtx, any, TArgs, TResolved>;

    rootQuery(dataSource: TSrc, args: TArgs, aliasHierachyVisitor: AliasHierarchyVisitor): Knex.QueryBuilder {
        if (this.mapping.rootQuery) {
            return this.mapping.rootQuery.call<
                MappedSingleSourceOperation<TSrc, TArgs>,
                [TSrc, TArgs, AliasHierarchyVisitor],
                Knex.QueryBuilder
            >(this, dataSource, args, aliasHierachyVisitor);
        }
        return dataSource.rootQueryBuilder(aliasHierachyVisitor);
    }

    async createResolverContext(
        source: any,
        args: TArgs,
        context: any,
        resolveInfo: GraphQLResolveInfo,
        resolveInfoVisitor?: ResolveInfoVisitor<any>,
    ): Promise<RCtx<TSrc, TArgs>> {
        return ResolverContext.create(
            this,
            { [this.rootSource.mappedName]: { selection: () => this.rootSource } },
            source,
            args,
            context,
            resolveInfo,
            resolveInfoVisitor,
        );
    }
}
