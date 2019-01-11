import { GraphQLFieldConfigArgumentMap, GraphQLNonNull, GraphQLResolveInfo } from "graphql";
import * as Knex from "knex";

import { MappedAssociation } from "./MappedAssociation";
import { MappedDataSource } from "./MappedDataSource";
import { MappedOperation, OperationMapping } from "./MappedOperation";
import { QueryOperationResolver } from "./QueryOperationResolver";
import { ResolveInfoVisitor } from "./ResolveInfoVisitor";
import { Dict } from "./util-types";
import { MemoizeGetter } from "./utils";
import { isPresetQueryParams } from "./operation-presets";

export interface QueryOperationMapping<TSrc extends MappedDataSource = MappedDataSource, TArgs extends object = {}>
    extends OperationMapping<TSrc, TArgs> {
    resolver?: <TMapping extends QueryOperationMapping<TSrc, TArgs> & OperationMapping<TSrc, TArgs>>(
        operation: MappedQueryOperation<TSrc, TArgs, TMapping>,
        source: any,
        context: any,
        args: TArgs,
        resolveInfoRoot: GraphQLResolveInfo,
        resolveInfoVisitor?: ResolveInfoVisitor<any>,
    ) => QueryOperationResolver<TSrc, TArgs, TMapping>;
}

/**
 * @api-category MapperClass
 */
export class MappedQueryOperation<
    TSrc extends MappedDataSource,
    TArgs extends {},
    TMapping extends QueryOperationMapping<TSrc, TArgs> = QueryOperationMapping<TSrc, TArgs>
> extends MappedOperation<TSrc, TArgs, TMapping> {
    opType: "query" = "query";

    defaultResolver(
        source: any,
        context: any,
        args: TArgs,
        resolveInfoRoot: GraphQLResolveInfo,
        resolveInfoVisitor?: ResolveInfoVisitor<any>,
    ): QueryOperationResolver<TSrc, TArgs, TMapping> {
        return new QueryOperationResolver<TSrc, TArgs, TMapping>(
            this,
            source,
            context,
            args,
            resolveInfoRoot,
            resolveInfoVisitor,
        );
    }

    @MemoizeGetter
    get defaultArgs(): GraphQLFieldConfigArgumentMap {
        return {
            where: {
                type: GraphQLNonNull(this.rootSource.defaultShallowInputType),
            },
        };
    }

    interceptQueryByArgs(qb: Knex.QueryBuilder, args: TArgs) {
        if (this.mapping.args) {
            return this.mapping.args.interceptQuery(qb, args);
        }
        return qb;
    }

    deriveWhereParams(args: TArgs, association?: MappedAssociation): Dict {
        if (this.mapping.deriveWhereParams) {
            return this.mapping.deriveWhereParams.call(this, args, association);
        }
        if (isPresetQueryParams(args)) {
            return args.where;
        }
        return {};
    }
}