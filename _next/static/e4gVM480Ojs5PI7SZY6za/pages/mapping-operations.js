(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{603:function(e,a,n){__NEXT_REGISTER_PAGE("/mapping-operations",function(){return e.exports=n(604),{page:e.exports.default}})},604:function(e,a,n){"use strict";n.r(a);var s=n(0),t=n.n(s),o=n(1),p=n(3);function r(e,a){if(null==e)return{};var n,s,t=function(e,a){if(null==e)return{};var n,s,t={},o=Object.keys(e);for(s=0;s<o.length;s++)n=o[s],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)n=o[s],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}a.default=function(e){var a=e.components;r(e,["components"]);return t.a.createElement(o.MDXTag,{name:"wrapper",components:a},t.a.createElement(o.MDXTag,{name:"h1",components:a,props:{id:"mapping-operations"}},t.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"h1",props:{href:"#mapping-operations","aria-hidden":"true"}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Mapping Operations"),t.a.createElement(o.MDXTag,{name:"p",components:a},"GRelDAL supports two types of GraphQL operations: ",t.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://graphql.org/learn/schema/#the-query-and-mutation-types"}},"Queries and Mutations"),"."),t.a.createElement(o.MDXTag,{name:"p",components:a},"Let us say we have following data source mapping:"),t.a.createElement(o.MDXTag,{name:"pre",components:a},t.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"hljs language-ts",metaString:""}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," users = mapDataSource({\n    name: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"User"'),",\n    fields: {\n        id: {\n            to: GraphQLID,\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"type"),": types.number\n        },\n        name: {\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"type"),": types.string,\n        },\n    },\n});")),t.a.createElement(o.MDXTag,{name:"p",components:a},"Now we want to allow users to operate on this data source.\nThe most convenient way to make this happen is through one of pre-defined operation presets."),t.a.createElement(o.MDXTag,{name:"pre",components:a},t.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"hljs language-ts",metaString:""}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"import")," {operationPresets} ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"from")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"greldal"'),";\n\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," schema = mapSchema([\n    operationPresets.query.findOneOperation(users)\n]);")),t.a.createElement(o.MDXTag,{name:"p",components:a},"A ",t.a.createElement(o.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"findOne")," operation allows us to query the users table like this:"),t.a.createElement(o.MDXTag,{name:"pre",components:a},t.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{metaString:null}},"query {\n    findOneUser(where: {id: 1}) {\n        id\n        name\n    }\n}\n")),t.a.createElement(o.MDXTag,{name:"p",components:a},"This will result in an SQL query like:"),t.a.createElement(o.MDXTag,{name:"pre",components:a},t.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"hljs language-sql",metaString:""}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"select"),"\n    ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`GQL_DAL_users__4`"),".",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`id`")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"as")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`GQL_DAL_users__4__id`"),",\n    ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`GQL_DAL_users__4`"),".",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`name`")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"as")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`GQL_DAL_users__4__name`"),"\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"from")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`users`")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"as")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`GQL_DAL_users__4`"),"\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"where")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`GQL_DAL_users__4`"),".",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"`id`")," = ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-number"}},"1"),"\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"limit")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-number"}},"1"))),t.a.createElement(o.MDXTag,{name:"p",components:a},"The preset assumes that the properties of ",t.a.createElement(o.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"args.where")," map exactly to field names and we want to fetch results that match all of these values."),t.a.createElement(o.MDXTag,{name:"p",components:a},"In real world applications we would probably want more flexibility in terms of how the arguments map to queries."),t.a.createElement(o.MDXTag,{name:"p",components:a},"We will see a couple of approaches for this:"),t.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"computed-fields"}},t.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#computed-fields","aria-hidden":"true"}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Computed Fields"),t.a.createElement(o.MDXTag,{name:"p",components:a},"One approach that we have already seen is by defining computed fields in the data source mapping. GRelDQL can automatically resolve computed fields by mapping them to underlying concrete fields and deriving computed values from them."),t.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"argument-mapping"}},t.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#argument-mapping","aria-hidden":"true"}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Argument Mapping"),t.a.createElement(o.MDXTag,{name:"p",components:a},"We can also specify the exact arguments we want to expose in our operation and how they map to SQL:"),t.a.createElement(o.MDXTag,{name:"pre",components:a},t.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"hljs language-ts",metaString:""}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," argMapping = mapArgs({\n    fullName: {\n        description: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"Full name of user"'),",\n        ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"type"),": t.string,\n        interceptQuery: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-function"}},"(",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"span",props:{className:"hljs-params"}},"queryBuilder: Knex.QueryBuilder, value: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"span",props:{className:"hljs-built_in"}},"string")),") =>")," {\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," names = value.split(",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'" "'),");\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"return")," queryBuilder.where({\n                first_name: names[",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-number"}},"0"),"],\n                last_name: names[",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-number"}},"1"),"],\n            });\n        },\n    },\n});\n\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," schema = mapSchema([\n    ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"new")," MappedQueryOperation({\n        name: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"findUsersByFullName"'),",\n        rootSource: mappedDataSource,\n        singular: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-literal"}},"true"),",\n        args: argMapping,\n    }),\n]);")),t.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"writing-custom-resolvers"}},t.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#writing-custom-resolvers","aria-hidden":"true"}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Writing custom resolvers"),t.a.createElement(o.MDXTag,{name:"p",components:a},"This is the most flexible option: A custom resolver is a class that extends from OperationResolver and implements a resolve function that contains the logic of the operation and returns what the API expects."),t.a.createElement(o.MDXTag,{name:"p",components:a},"More often than not, a resolver will delegate to one or more of other operations as illustrated below:"),t.a.createElement(o.MDXTag,{name:"pre",components:a},t.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"hljs language-ts",metaString:""}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"import")," {OperationResolver} ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"from")," ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"greldal"'),";\n\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," findOperation = operationPresets.query.findOneOperation(users);\n\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"class")," CustomFindOperationResolver ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"extends")," OperationResolver {\n    resolve() {\n        ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"return")," findOperation.resolve({\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"this"),".source,\n            {\n                department_id: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"this"),".args.department\n            },\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"this"),".context,\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"this"),".resolveInfoRoot\n        });\n    }\n}\n\n",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," schema = mapSchema([\n    ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"new")," MappedQueryOperation({\n        name: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},"'findByDepartmentId'"),",\n        rootSource: users,\n        singular: ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-literal"}},"true"),",\n        args: mapArgs({\n            department: {\n                ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"type"),": t.string\n            }\n        }),\n        resolver; ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-function"}},"(",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"span",props:{className:"hljs-params"}},"operation, source, context, args, resolveInfoRoot"),") =>"),"\n            ",t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"new")," CustomFindOperationResolver(\n                operation,\n                source,\n                context,\n                args,\n                resolveInfoRoot\n            )\n    })\n]);")),t.a.createElement(o.MDXTag,{name:"p",components:a},"GRelDAL makes it easy to model complex business logic as a composition of individual operations by leveraging delegation."),t.a.createElement(o.MDXTag,{name:"h2",components:a,props:{id:"writing-custom-operation-mapping"}},t.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#writing-custom-operation-mapping","aria-hidden":"true"}},t.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Writing custom operation mapping"),t.a.createElement(o.MDXTag,{name:"p",components:a},"While custom resolvers are flexible enough for most common scenarios, in some cases it may be helpful to write a custom operation mapping which provides a more granular control over how an operation is mapped to the graphql API."),t.a.createElement(o.MDXTag,{name:"p",components:a},"This approach involves extending the MappedOperation class and providing a custom implementation for the graphQLOperation getter."),t.a.createElement(o.MDXTag,{name:"hr",components:a}),t.a.createElement(p.b,null,"Mapping Associations"))}}},[[603,1,0]]]);