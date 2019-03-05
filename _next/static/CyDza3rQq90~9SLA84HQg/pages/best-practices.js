(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{ISbP:function(e,a,n){"use strict";n.r(a);var t=n("wk2l"),o=n("ERkP"),s=n.n(o),r=n("yTr/");a.default=function(e){var a=e.components;Object(t.a)(e,["components"]);return s.a.createElement(r.MDXTag,{name:"wrapper",components:a},s.a.createElement(r.MDXTag,{name:"h1",components:a,props:{id:"best-practices"}},s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"h1",props:{href:"#best-practices","aria-hidden":"true"}},s.a.createElement(r.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Best Practices"),s.a.createElement(r.MDXTag,{name:"p",components:a},"Following best practices are strongly recommended by the developers of GRelDAL based on their experience of working with ambitious data driven applications."),s.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"ensure-that-database-schema-is-in-source-control"}},s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#ensure-that-database-schema-is-in-source-control","aria-hidden":"true"}},s.a.createElement(r.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Ensure that database schema is in Source Control"),s.a.createElement(r.MDXTag,{name:"p",components:a},"GRelDAL currently doesn't do anything to ensure that the fields defined in data store are in sync with the database schema and you are responsible for ensuring that they don't go out of sync."),s.a.createElement(r.MDXTag,{name:"p",components:a},"One of the most practical ways to ensure this is to use ",s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://knexjs.org/#Migrations"}},"migrations")," and ensure that any schema changes are tracked in version control."),s.a.createElement(r.MDXTag,{name:"p",components:a},"For the same reason we also insist on having integration tests which test against an actual database on which the migrations have been run before each deployment."),s.a.createElement(r.MDXTag,{name:"p",components:a},"Because our underlying data access layer Knex already has good migration support and ",s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://knexjs.org/#Migrations-CLI"}},"CLI"),", GRelDAL doesn't provide any additional utilities for database schema management."),s.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"ensure-backward-compatibility-of-apis"}},s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#ensure-backward-compatibility-of-apis","aria-hidden":"true"}},s.a.createElement(r.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Ensure backward compatibility of APIs"),s.a.createElement(r.MDXTag,{name:"p",components:a},"It is also recommended to have a ",s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://jestjs.io/docs/en/snapshot-testing"}},"snapshot test")," of the output of ",s.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"printSchema(generatedSchema)"),", where ",s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://graphql.org/graphql-js/utilities/#printschema"}},"printSchema")," is a function exposed from ",s.a.createElement(r.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"graphql-js")," which prints out a human readable description of the schema and types involved in ",s.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://alligator.io/graphql/graphql-sdl/"}},"GraphQL SDL")," format."),s.a.createElement(r.MDXTag,{name:"p",components:a},"It is useful for auditing changes in the exposed API as the application involves. GraphQL APIs are generally expected to be forever backward compatible and auditing of the schema is a practical way of ensuring that."),s.a.createElement(r.MDXTag,{name:"p",components:a},"The schema snapshot also serves as contract document that describes your API in an industry standard format."))}},LmsV:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/best-practices",function(){var e=n("ISbP");return{page:e.default||e}}])}},[["LmsV",1,0]]]);