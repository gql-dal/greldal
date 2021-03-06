import { graphql, GraphQLID, GraphQLSchema, printSchema } from "graphql";
import Knex from "knex";
import { has, map, sortBy } from "lodash";

import {
    mapArgs,
    mapDataSource,
    MappedMultiSourceUnionQueryOperation,
    MappedSingleSourceQueryOperation,
    mapSchema,
    operationPresets,
    SingleSourceQueryOperationResolver,
    useDatabaseConnector,
    mapFields,
    mapAssociations,
    types,
} from "..";
import { setupDepartmentSchema, teardownDepartmentSchema } from "./helpers/setup-department-schema";
import { setupKnex } from "./helpers/setup-knex";
import { MappedDataSource } from "../MappedDataSource";
import { getCount } from "./knex-helpers";
import { removeErrorCodes } from "./helpers/snapshot-sanitizers";
import {
    setupUserSchema,
    teardownUserSchema,
    mapUsersDataSource,
    insertFewUsers,
    mapUsersDataSourceWithJSONFields,
} from "./helpers/setup-user-schema";
import { Maybe } from "../utils/util-types";

let knex: Knex;

jest.setTimeout(30000);

describe("Integration scenarios", () => {
    beforeAll(() => {
        knex = setupKnex();
        useDatabaseConnector(knex);
    });

    afterAll(async () => {
        await knex.destroy();
    });

    describe("Conventionally mapped data source", () => {
        let users: MappedDataSource, schema: GraphQLSchema;
        beforeAll(async () => {
            await setupUserSchema(knex);
            await insertFewUsers(knex);
            users = mapUsersDataSource();
            schema = mapSchema(operationPresets.defaults(users));
        });
        afterAll(async () => {
            await teardownUserSchema(knex);
        });
        test("generated schema", () => {
            expect(printSchema(schema)).toMatchSnapshot();
        });
        test("singular query operation without params", async () => {
            const r1 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: {}) {
                            id
                            name
                        }
                    }
                `,
            );
            expect(r1.errors).not.toBeDefined();
            expect(r1).toMatchSnapshot();
        });
        test("singular query operation with params", async () => {
            const r2 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: { id: 2 }) {
                            id
                            name
                        }
                    }
                `,
            );
            expect(r2.errors).not.toBeDefined();
            expect(r2).toMatchSnapshot();
        });
        test("singular query operation for non-existent row", async () => {
            const r3 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: { id: 10 }) {
                            id
                            name
                        }
                    }
                `,
            );
            expect(r3.errors).not.toBeDefined();
            expect(r3.data!.findOneUser).toBeNull();
        });
        test("batch query operation without args", async () => {
            const r4 = await graphql(
                schema,
                `
                    query {
                        findManyUsers(where: {}) {
                            id
                            name
                        }
                    }
                `,
            );
            expect(r4.errors).not.toBeDefined();
            expect(r4).toMatchSnapshot();
        });
        test("batch query operations with arguments", async () => {
            const r5 = await graphql(
                schema,
                `
                    query {
                        findManyUsers(where: { id: 1 }) {
                            id
                            name
                        }
                    }
                `,
            );
            expect(r5.errors).not.toBeDefined();
            expect(r5).toMatchSnapshot();
        });
    });

    describe("Conventionally mapped data source with JSON fields", () => {
        let users: MappedDataSource, schema: GraphQLSchema;
        beforeAll(async () => {
            await setupUserSchema(knex);
            await insertFewUsers(knex);
            users = mapUsersDataSourceWithJSONFields();
            schema = mapSchema(operationPresets.defaults(users));
        });
        afterAll(async () => {
            await teardownUserSchema(knex);
        });
        test("generated schema", () => {
            expect(printSchema(schema)).toMatchSnapshot();
        });
        test("singular query operation without params", async () => {
            const r1 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: {}) {
                            id
                            name
                            metadata {
                                positionsHeld {
                                    title
                                    organization
                                    duration
                                }
                                awards {
                                    title
                                    compensation
                                }
                            }
                        }
                    }
                `,
            );
            expect(r1.errors).not.toBeDefined();
            expect(r1).toMatchSnapshot();
        });
        test("singular query operation with params", async () => {
            const r2 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: { id: 2 }) {
                            id
                            name
                            metadata {
                                positionsHeld {
                                    title
                                    organization
                                    duration
                                }
                                awards {
                                    title
                                    compensation
                                }
                            }
                        }
                    }
                `,
            );
            expect(r2.errors).not.toBeDefined();
            expect(r2).toMatchSnapshot();
        });
        test("batch query operation without args", async () => {
            const r4 = await graphql(
                schema,
                `
                    query {
                        findManyUsers(where: {}) {
                            id
                            name
                            metadata {
                                positionsHeld {
                                    title
                                    organization
                                    duration
                                }
                                awards {
                                    title
                                    compensation
                                }
                            }
                        }
                    }
                `,
            );
            expect(r4.errors).not.toBeDefined();
            expect(r4).toMatchSnapshot();
        });
        test("batch query operations with arguments", async () => {
            const r5 = await graphql(
                schema,
                `
                    query {
                        findManyUsers(where: { id: 1 }) {
                            id
                            name
                            metadata {
                                positionsHeld {
                                    title
                                    organization
                                    duration
                                }
                                awards {
                                    title
                                    compensation
                                }
                            }
                        }
                    }
                `,
            );
            expect(r5.errors).not.toBeDefined();
            expect(r5).toMatchSnapshot();
        });
    });

    describe("Paginated queries", () => {
        let users: MappedDataSource, schema: GraphQLSchema;
        beforeAll(async () => {
            await setupUserSchema(knex);
            users = mapUsersDataSource();
            schema = mapSchema([operationPresets.paginatedFindManyOperation(users)]);
        });
        afterAll(async () => {
            await teardownUserSchema(knex);
        });
        test("generated schema", () => {
            expect(printSchema(schema)).toMatchSnapshot();
        });
    });

    describe("Custom column field mapping", () => {
        let users: MappedDataSource, schema: GraphQLSchema;
        beforeAll(async () => {
            await knex.schema.createTable("customers", t => {
                t.increments("pk");
                t.string("first_name");
                t.string("last_name");
            });
            const fields = mapFields({
                id: {
                    sourceColumn: "pk",
                    type: types.intId,
                },
                firstName: {
                    sourceColumn: "first_name",
                    type: types.string,
                },
                lastName: {
                    sourceColumn: "last_name",
                    type: types.string,
                },
            });
            users = mapDataSource({
                name: {
                    mapped: "User",
                    stored: "customers",
                },
                fields,
            });
            schema = mapSchema(operationPresets.defaults(users));
            await knex("customers").insert([
                { pk: 1, first_name: "John", last_name: "Doe" },
                { pk: 2, first_name: "Jane", last_name: "Doe" },
            ]);
        });
        afterAll(async () => {
            await knex.schema.dropTable("customers");
        });
        test("generated schema", () => {
            expect(printSchema(schema)).toMatchSnapshot();
        });
        test("singular query operation", async () => {
            const r1 = await graphql(schema, "query { findOneUser(where: {}) { id, firstName, lastName }}");
            expect(r1.errors).not.toBeDefined();
            expect(r1).toMatchSnapshot();
            const r2 = await graphql(schema, "query { findOneUser(where: {id: 2}) { id, firstName, lastName }}");
            expect(r2.errors).not.toBeDefined();
            expect(r2).toMatchSnapshot();
        });
        test("batch query operation", async () => {
            const r3 = await graphql(schema, "query { findManyUsers(where: {}) { id, firstName, lastName }}");
            expect(r3.errors).not.toBeDefined();
            expect(r3).toMatchSnapshot();
        });
        test("custom mapping of arguments", async () => {
            const argMapping = mapArgs({
                fullName: {
                    description: "Full name of user",
                    type: types.string,
                    interceptQuery: (qb: Knex.QueryBuilder, value: Maybe<string>) => {
                        if (!value) return qb;
                        const names = value.split(" ");
                        return qb.where({
                            first_name: names[0],
                            last_name: names[1],
                        });
                    },
                },
            });
            const schema = mapSchema([
                new MappedSingleSourceQueryOperation({
                    name: "findUsersByFullName",
                    rootSource: users,
                    singular: true,
                    args: argMapping,
                }),
            ]);
            const r3 = await graphql(
                schema,
                `
                    query {
                        findUsersByFullName(fullName: "John Doe") {
                            id
                            firstName
                            lastName
                        }
                    }
                `,
            );
            expect(r3.errors).not.toBeDefined();
            expect(r3).toMatchSnapshot();
        });
    });

    describe("Computed fields mapping", () => {
        let schema: GraphQLSchema;
        beforeAll(async () => {
            await knex.schema.createTable("users", t => {
                t.increments("id");
                t.string("first_name");
                t.string("last_name");
                t.integer("parent_id")
                    .unsigned()
                    .references("id")
                    .inTable("users");
            });
            const users: any = mapDataSource({
                name: "User",
                fields: mapFields({
                    id: { type: types.intId },
                    first_name: { type: types.string },
                    last_name: { type: types.string },
                    full_name: {
                        type: types.string,
                        dependencies: ["first_name", "last_name"],
                        derive: ({ first_name, last_name }: any) => {
                            return `${first_name} ${last_name}`;
                        },
                        reduce: (row: any, fullName: string) => {
                            [row.first_name, row.last_name] = fullName.split(" ");
                        },
                    },
                }),
                associations: mapAssociations({
                    parent: {
                        target: () => users,
                        singular: true,
                        fetchThrough: [
                            {
                                join: "leftOuterJoin",
                            },
                        ],
                        associatorColumns: {
                            inSource: "parent_id",
                            inRelated: "id",
                        },
                    },
                    children: {
                        target: () => users,
                        singular: false,
                        fetchThrough: [
                            {
                                join: "leftOuterJoin",
                            },
                        ],
                        associatorColumns: {
                            inSource: "id",
                            inRelated: "parent_id",
                        },
                    },
                }),
            });
            schema = mapSchema(operationPresets.query.defaults(users));
            await knex("users").insert([
                {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                },
                {
                    id: 2,
                    parent_id: 1,
                    first_name: "Jane",
                    last_name: "Doe",
                },
                {
                    id: 3,
                    parent_id: 2,
                    first_name: "John",
                    last_name: "Delta",
                },
            ]);
        });
        test("singular query operation", async () => {
            const r1 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: {}) {
                            id
                            full_name
                        }
                    }
                `,
            );
            expect(r1.errors).not.toBeDefined();
            expect(r1).toMatchSnapshot();
        });
        test("nested singular query operation", async () => {
            const r1 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: { id: 2 }) {
                            id
                            first_name
                            full_name
                            parent {
                                id
                                first_name
                                last_name
                            }
                        }
                    }
                `,
            );
            expect(r1.errors).not.toBeDefined();
            expect(r1).toMatchSnapshot();
            const r2 = await graphql(
                schema,
                `
                    query {
                        findOneUser(where: { id: 2 }) {
                            id
                            first_name
                            full_name
                            parent(where: { id: 1 }) {
                                full_name
                                children {
                                    id
                                    full_name
                                    children {
                                        id
                                        full_name
                                    }
                                }
                            }
                        }
                    }
                `,
            );
            expect(r2.errors).not.toBeDefined();
            expect(r2).toMatchSnapshot();
        });
        afterAll(async () => {
            await knex.schema.dropTable("users");
        });
        test("batch query operation", async () => {
            const r1 = await graphql(
                schema,
                `
                    query {
                        findManyUsers(where: {}) {
                            id
                            first_name
                            full_name
                            parent {
                                id
                                first_name
                                last_name
                            }
                            children {
                                id
                                full_name
                            }
                        }
                    }
                `,
            );
            expect(r1.errors).not.toBeDefined();
            expect(r1).toMatchSnapshot();
        });
    });

    describe("Multi-source operations", () => {
        describe("Union query", () => {
            let generatedSchema: GraphQLSchema;
            let students: MappedDataSource, staff: MappedDataSource;
            beforeAll(async () => {
                await knex.schema.createTable("students", t => {
                    t.increments("id");
                    t.string("name");
                    t.integer("completion_year");
                });
                await knex.schema.createTable("staff", t => {
                    t.increments("id");
                    t.string("name");
                    t.string("designation");
                });
                await knex("students").insert([
                    {
                        name: "ram",
                        completion_year: 2009,
                    },
                    {
                        name: "abhi",
                        completion_year: 2010,
                    },
                ]);
                await knex("staff").insert([
                    {
                        name: "rahman",
                        designation: "Principal",
                    },
                    {
                        name: "akbar",
                        designation: "Teacher",
                    },
                ]);
                students = mapDataSource({
                    name: "Student",
                    fields: mapFields({
                        id: {
                            type: types.intId,
                        },
                        name: {
                            type: types.string,
                        },
                        completion_year: {
                            type: types.number,
                        },
                    }),
                });
                staff = mapDataSource({
                    name: { stored: "staff", mapped: "Staff" },
                    fields: mapFields({
                        id: {
                            type: types.intId,
                        },
                        name: {
                            type: types.string,
                        },
                        designation: {
                            type: types.string,
                        },
                    }),
                });
                generatedSchema = mapSchema([
                    new MappedMultiSourceUnionQueryOperation({
                        dataSources: () => ({
                            students: {
                                selection: () => students,
                            },
                            staff: {
                                selection: () => staff,
                            },
                        }),
                        unionMode: "union",
                        name: `findManyUsers`,
                        singular: false,
                        shallow: false,
                        description: undefined,
                    }),
                ]);
            });

            afterAll(async () => {
                await knex.schema.dropTable("students");
                await knex.schema.dropTable("staff");
            });

            test("generated schema", () => {
                expect(printSchema(generatedSchema)).toMatchSnapshot();
            });

            test("batch query operation", async () => {
                const r1 = await graphql(
                    generatedSchema,
                    `
                        query {
                            findManyUsers(where: {}) {
                                id
                                name
                            }
                        }
                    `,
                );
                expect(r1.errors).not.toBeDefined();
                expect(sortBy(r1.data!.findManyUsers, "name")).toMatchSnapshot();
            });
        });
    });

    describe("Data sources associated by joins", () => {
        [
            ["with primary key", true],
            ["without primary key", false],
        ].forEach(([d1, hasPrimaryKey]) => {
            describe(d1 as string, () => {
                let tags: MappedDataSource, products: MappedDataSource, departments: MappedDataSource;
                let generatedSchema: GraphQLSchema;
                beforeAll(async () => {
                    await setupDepartmentSchema(knex);
                    await knex("tags").insert([{ name: "imported" }, { name: "third-party" }]);
                    await knex("departments").insert([{ name: "textile" }, { name: "heavy goods" }]);
                    await knex("products").insert([
                        { name: "silk gown", department_id: 1 },
                        { name: "steel welding machine", department_id: 2 },
                        { name: "harpoon launcher", department_id: 2 },
                        { name: "bulldozer", department_id: 2 },
                        { name: "tractor", department_id: 2 },
                    ]);
                    await knex("product_tag_associators").insert([
                        { product_id: 1, tag_id: 1 },
                        { product_id: 2, tag_id: 2 },
                        { product_id: 2, tag_id: 1 },
                    ]);
                    const fields = mapFields({
                        id: {
                            type: types.intId,
                            isPrimary: hasPrimaryKey ? true : undefined,
                        },
                        name: {
                            type: types.string,
                        },
                    });
                    // @snippet:start mapAssociation_multiJoin_custom
                    /// import {mapDataSource, mapAssociations} from "greldal";
                    tags = mapDataSource({
                        name: "Tag",
                        fields,
                        associations: mapAssociations({
                            products: {
                                target: () => products,
                                singular: false,
                                fetchThrough: [
                                    {
                                        join: joinBuilder =>
                                            joinBuilder
                                                .leftOuterJoin("product_tag_associators", "tag_id", "=", "id")
                                                .leftOuterJoin("products", "id", "=", "product_id"),
                                    },
                                ],
                            },
                        }),
                    });
                    // @snippet:end

                    // @snippet:start mapAssociation_leftOuterJoin_default
                    /// import {mapDataSource, mapAssociations} from "greldal";
                    products = mapDataSource({
                        name: "Product",
                        fields,
                        associations: mapAssociations({
                            department: {
                                target: () => departments,
                                singular: true,
                                fetchThrough: [
                                    {
                                        join: "leftOuterJoin",
                                    },
                                ],
                                associatorColumns: {
                                    inSource: "department_id",
                                    inRelated: "id",
                                },
                            },
                        }),
                    });
                    // @snippet:end

                    departments = mapDataSource({
                        name: "Department",
                        fields,
                        associations: mapAssociations({
                            products: {
                                target: () => products,
                                singular: false,
                                fetchThrough: [
                                    {
                                        join: "leftOuterJoin",
                                    },
                                ],
                                associatorColumns: {
                                    inSource: "id",
                                    inRelated: "department_id",
                                },
                            },
                        }),
                    });
                    generatedSchema = mapSchema([
                        ...operationPresets.defaults(tags),
                        ...operationPresets.defaults(departments),
                        ...operationPresets.defaults(products),
                    ]);
                });
                afterAll(async () => {
                    await teardownDepartmentSchema(knex);
                });
                test("generated schema", () => {
                    expect(printSchema(generatedSchema)).toMatchSnapshot();
                });
                test("query operations involving auto-inferred binary joins", async () => {
                    const r1 = await graphql(
                        generatedSchema,
                        // @snippet:start mapAssociation_leftOuterJoin_default_query
                        `
                            query {
                                findOneProduct(where: {}) {
                                    id
                                    name
                                    department(where: {}) {
                                        id
                                        name
                                    }
                                }
                            }
                        `,
                        // @snippet:end
                    );
                    expect(r1).toMatchSnapshot();
                    const r2 = await graphql(
                        generatedSchema,
                        `
                            query {
                                findOneDepartment(where: { id: 1 }) {
                                    id
                                    name
                                    products(where: {}) {
                                        id
                                        name
                                    }
                                }
                            }
                        `,
                    );
                    expect(r2).toMatchSnapshot();
                    const r3 = await graphql(
                        generatedSchema,
                        `
                            query {
                                findOneDepartment(where: { name: "heavy goods" }) {
                                    id
                                    name
                                    products(where: {}) {
                                        id
                                        name
                                    }
                                }
                            }
                        `,
                    );
                    expect(r3).toMatchSnapshot();
                });
                test("query operations involving user specified complex joins", async () => {
                    const r1 = await graphql(
                        generatedSchema,
                        `
                            query {
                                findManyTags(where: {}) {
                                    id
                                    name
                                    products(where: {}) {
                                        id
                                        name
                                    }
                                }
                            }
                        `,
                    );
                    expect(r1).toMatchSnapshot();
                });
            });
        });
    });

    describe("Data sources linked by side-loadable associations", () => {
        let generatedSchema: GraphQLSchema;

        beforeAll(async () => {
            await setupDepartmentSchema(knex);
            await knex("tags").insert([{ name: "imported" }, { name: "third-party" }]);
            await knex("departments").insert([{ name: "textile" }, { name: "heavy goods" }]);
            await knex("products").insert([
                { name: "silk gown", department_id: 1 },
                { name: "steel welding machine", department_id: 2 },
            ]);
            await knex("product_tag_associators").insert([
                { product_id: 1, tag_id: 1 },
                { product_id: 2, tag_id: 2 },
                { product_id: 2, tag_id: 1 },
            ]);
            const fields = {
                id: {
                    type: types.intId,
                },
                name: {
                    type: types.string,
                },
            };

            // @snippet:start mapAssociation_sideLoading
            /// import {mapDataSource, mapAssociations} from "greldal";

            const departments = mapDataSource({
                name: "Department",
                fields: mapFields(fields),
                associations: mapAssociations({
                    products: {
                        target: () => products,
                        singular: false,
                        associatorColumns: {
                            inSource: "id",
                            inRelated: "department_id",
                        },
                        fetchThrough: [
                            // We can define multiple side-loading strategies here.
                            //
                            // When user queried by id of department, then we don't have to wait for the query on departments to complete
                            // before we start fetching products. In case of preFetch strategy, these queries can happen in parallel, because
                            // given the parameters used to query the data source we can start a parallel query to fetch all the products in
                            // matching departments
                            {
                                useIf(operation) {
                                    return has(operation.args, ["where", "id"]);
                                },
                                preFetch(operation) {
                                    // What preFetch returns is a MappedForeignOperation - which basically points to another operation
                                    // in the related data source (findManyProducts) and the arguments needed to initiate this operation.

                                    const args: any = operation.args;
                                    const department_id: string = args.where.id;
                                    return {
                                        operation: findManyProducts,
                                        args: {
                                            where: {
                                                department_id,
                                            },
                                        },
                                    };
                                },
                            },

                            // However if the query parameters to departments are not enough to identify which products we need to fetch,
                            // we can wait for the departments
                            {
                                postFetch(_operation, parents) {
                                    // As above, we are instructing GRelDAL to initiate another operation in a foreign data source.
                                    // However, in this case this body will execute once the query on parents has finished. So we have an array of
                                    // fetched parents at our disposal which we can use to identify additional arguments to narrow down the
                                    // subset of products to fetch.
                                    return {
                                        operation: findManyProductsByDepartmentIdList,
                                        args: {
                                            department_ids: map(parents, "id"),
                                        },
                                    };
                                },
                            },
                        ],
                    },
                }),
            });
            // @snippet:end

            const products = mapDataSource({
                name: "Product",
                fields: mapFields({
                    ...fields,
                    department_id: {
                        type: types.number,
                    },
                }),
            });
            const findOneProduct = operationPresets.query.findOneOperation(products);
            const findManyProducts = operationPresets.query.findManyOperation(products);
            const args = mapArgs({
                department_ids: {
                    type: types.array(types.number),
                },
            });
            const findManyProductsByDepartmentIdList = new MappedSingleSourceQueryOperation({
                rootSource: products,
                name: `findManyProductsByDepartmentIdList`,
                args,
                resolver(ctx) {
                    return new SingleSourceQueryOperationResolver(ctx);
                },
                rootQuery(_dataSource, args, ahv) {
                    return products.rootQueryBuilder(ahv).whereIn("department_id", args.department_ids as number[]);
                },
                singular: false,
                shallow: false,
                description: undefined,
            });
            generatedSchema = mapSchema([...operationPresets.defaults(departments), findOneProduct, findManyProducts]);
        });

        afterAll(async () => {
            await teardownDepartmentSchema(knex);
        });

        test("pre-fetch queries", async () => {
            const r1 = await graphql(
                generatedSchema,
                `
                    query {
                        findOneDepartment(where: { id: 1 }) {
                            id
                            name
                            products(where: {}) {
                                id
                                name
                                department_id
                            }
                        }
                    }
                `,
            );
            expect(r1).toMatchSnapshot();
        });

        test("post-fetch queries", async () => {
            const r1 = await graphql(
                generatedSchema,
                `
                    query {
                        findOneDepartment(where: { name: "textile" }) {
                            id
                            name
                            products(where: {}) {
                                id
                                name
                                department_id
                            }
                        }
                    }
                `,
            );
            expect(r1).toMatchSnapshot();
        });
    });

    describe("Mutation Presets", () => {
        let users: MappedDataSource, schema: GraphQLSchema;
        beforeAll(async () => {
            await knex.schema.createTable("users", t => {
                t.increments("id");
                t.string("name");
                t.text("addr");
            });
            users = mapDataSource({
                name: "User",
                fields: mapFields({
                    id: {
                        type: types.intId,
                        isPrimary: true,
                    },
                    name: {
                        type: types.string,
                    },
                    address: {
                        type: types.string,
                        sourceColumn: "addr",
                    },
                }),
            });
            schema = mapSchema([
                ...operationPresets.query.defaults(users),
                ...operationPresets.mutation.defaults(users),
            ]);
        });
        afterAll(async () => {
            await knex.schema.dropTable("users");
        });
        describe("Insertion", () => {
            describe("Singular", () => {
                it("Inserts mapped entity", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                insertOneUser(
                                    entity: { id: 1, name: "Sherlock Holmes", address: "221 B Baker Street" }
                                ) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).not.toBeDefined();
                    expect(r1).toMatchSnapshot();
                    const numRows = await getCount(knex("users"));
                    expect(numRows).toMatchSnapshot();
                });
                it("surfaces database failues", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                insertOneUser(
                                    entity: { id: 1, name: "Sherlock Holmes", address: "221 B Baker Street" }
                                ) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).toBeDefined();
                    expect(removeErrorCodes(r1.errors as any)).toMatchSnapshot();
                });
            });
            describe("Batch", () => {
                it("Inserts mapped entities", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                insertManyUsers(
                                    entities: [
                                        { id: 2, name: "John Doe", address: "A B C" }
                                        { id: 3, name: "Jane Doe", address: "A B C" }
                                    ]
                                ) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).not.toBeDefined();
                    expect(r1).toMatchSnapshot();
                    const numRows = getCount(knex("users").whereIn("id", [2, 3]));
                    expect(numRows).toMatchSnapshot();
                });
                it("surfaces database failues", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                insertManyUsers(
                                    entities: [
                                        { id: 4, name: "John Doe", address: "A B C" }
                                        { id: 4, name: "Jane Doe", address: "A B C" }
                                    ]
                                ) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).toBeDefined();
                    expect(removeErrorCodes(r1.errors as any)).toMatchSnapshot();
                });
            });
        });
        describe("Update", () => {
            beforeEach(async () => {
                await knex("users").insert([
                    {
                        id: 5,
                        name: "Ali",
                        addr: "A B C",
                    },
                    {
                        id: 6,
                        name: "Ram",
                        addr: "A B C",
                    },
                ]);
            });
            afterEach(async () => {
                await knex("users").del();
            });
            describe("Singular", () => {
                it("Updates mapped entity", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                updateOneUser(where: { id: 5 }, update: { name: "Rahman" }) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).not.toBeDefined();
                    expect(r1).toMatchSnapshot();
                    const row = await knex("users").where({ id: 5 });
                    expect(row).toMatchSnapshot();
                });
                it("surfaces database failues", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                updateOneUser(where: { id: 5 }, update: { id: 6 }) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).toBeDefined();
                    expect(removeErrorCodes(r1.errors as any)).toMatchSnapshot();
                });
            });
            describe("Batch", () => {
                it("Updates mapped entities", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                updateManyUsers(where: { address: "A B C" }, update: { address: "D E F" }) {
                                    id
                                    name
                                    address
                                }
                            }
                        `,
                    );
                    expect(r1.errors).not.toBeDefined();
                    expect(r1).toMatchSnapshot();
                    const n1 = await getCount(knex("users").where({ addr: "A B C" }));
                    expect(n1).toMatchSnapshot();
                    const n2 = await getCount(knex("users").where({ addr: "D E F" }));
                    expect(n2).toMatchSnapshot();
                });
                it("surfaces database failues", async () => {
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                updateManyUsers(where: { id: 5 }, update: { id: 6 }) {
                                    id
                                    name
                                }
                            }
                        `,
                    );
                    expect(r1.errors).toBeDefined();
                    expect(removeErrorCodes(r1.errors as any)).toMatchSnapshot();
                });
            });
        });
        describe("Deletion", () => {
            beforeEach(async () => {
                await knex("users").insert([
                    {
                        id: 11,
                        name: "Ramesh",
                        addr: "H J K",
                    },
                    {
                        id: 12,
                        name: "Akbar",
                        addr: "H J K",
                    },
                    {
                        id: 13,
                        name: "Grisham",
                        addr: "P Q R",
                    },
                    {
                        id: 14,
                        name: "Gautam",
                        addr: "P Q R",
                    },
                ]);
            });
            afterEach(async () => {
                await knex("users").delete();
            });
            describe("Singular", () => {
                it("Deletes mapped entity", async () => {
                    const prevCount = await getCount(knex("users"));
                    const matchCount = await getCount(knex("users").where({ addr: "P Q R" }));
                    expect(matchCount).toBeGreaterThan(0);
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                deleteOneUser(where: { address: "P Q R" }) {
                                    id
                                    name
                                    address
                                }
                            }
                        `,
                    );
                    expect(r1.errors).not.toBeDefined();
                    expect(r1).toMatchSnapshot();
                    const count = await getCount(knex("users"));
                    expect(count).toBe(prevCount - 1);
                });
            });
            describe("Batch", () => {
                it("Deletes mapped entities", async () => {
                    const prevCount = await getCount(knex("users"));
                    const matchCount = await getCount(
                        knex("users")
                            .where({ addr: "H J K" })
                            .count(),
                    );
                    const r1 = await graphql(
                        schema,
                        `
                            mutation {
                                deleteManyUsers(where: { address: "H J K" }) {
                                    id
                                    name
                                    address
                                }
                            }
                        `,
                    );
                    expect(r1.errors).not.toBeDefined();
                    expect(r1).toMatchSnapshot();
                    const count = await getCount(knex("users"));
                    expect(count).toBe(prevCount - matchCount);
                });
            });
        });
    });
});
