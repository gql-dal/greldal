import {NextPageLink, Link} from "../components/Link";

# Mapping Data Sources

Creation of a GraphQL API using GRelDAL essentially involves defining operations on data sources.

Operations are what we expose to the outside world through GraphQL queries and mutations and these operations interact with the data stored in our databases through data sources. These data sources are usually backed by tables, but they can also be backed by views, materialized views, joined tables, etc.

We can use the mapSource function to map a datasource:

```ts
const users = mapDataSource({
    name: "User",
    fields: {
        id: {
            type: types.number,
            to: GraphQLID,
        },
        name: {
            type: types.string,
        },
    },
});
```

As we have already covered in the <Link href="#quick-start">Quick Start</Link> the above configuration tells GRelDAL that we want to map the `users` table (pluralized from `User`) to a `User` data source, and this data source will have two fields: id, name.

GRelDAL's focus on convention over configuration reduces quite a bit of boilerplate from what would otherwise have been a more verbose mapping:

```ts
const users = mapDataSource({
    name: {
        mapped: "User",
        stored: "users",
    },
    fields: {
        id: {
            sourceColumn: "id",
            type: types.string,
            to: {
                input: GraphQLID,
                output: GraphQLID,
            },
        },
        name: {
            sourceColumn: "name",
            type: types.string,
            to: {
                input: GraphQLString,
                output: GraphQLString,
            },
        },
    },
});
```

## Type specifications

Note that for every field we had to specify a type. This type was specified through what we call runtime-types. The section on <Link>Type Safety</Link>
goes into more on detail on this, but essentially for all primitives we have corresponding runtime types:

| string  | types.string  |
| number  | types.number  |
| boolean | types.boolean |

Some GraphQL types have no equivalent typescript type (eg. GraphQLInt, GraphQLID) and for them we can specifically mention the input and output types.
In case both are same (`{to: {input: GraphQLID, output: GraphQLID}}`) can can just specify them once (`{to: GraphQLID}`).

We can compose these types to build composite types:

```
const addresses = types.array([
    types.type({
        street: types.string,
        plot_no: types.number
    })
])
```

Refer to the documentation of io-ts (which we simply re-export as types) for more details around using and defining runtime types.

## Computed fields

Fields don't necessarily have to map to columns one-to-one.

We can have computed fields which depend on other column-based fields and are computed on the fly:

```
fields: {
    fullName: {
        dependencies: ["firstName", "lastName"],
        derive: ({firstName, lastName}) => `${firstName} ${lastName}`,
        to: types.string
    }
}
```

## Associations

GRelDAL supports linking together data sources through associations and performing operations that span across multiple data sources.

The section on <Link>association mapping</Link> will cover this in more detail.

<NextPageLink>Mapping Operations</NextPageLink>