(window.webpackJsonp=window.webpackJsonp||[]).push([["0646"],{"4tvf":function(e,a,t){"use strict";t.r(a);var n=t("wk2l"),o=t("ERkP"),s=t.n(o),p=t("yTr/");t("YNhk");a.default=function(e){var a=e.components;Object(n.a)(e,["components"]);return s.a.createElement(p.MDXTag,{name:"wrapper",components:a},s.a.createElement(p.MDXTag,{name:"h1",components:a,props:{id:"type-safety"}},s.a.createElement(p.MDXTag,{name:"a",components:a,parentName:"h1",props:{href:"#type-safety","aria-hidden":"true"}},s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Type Safety"),s.a.createElement(p.MDXTag,{name:"p",components:a},"GRelDAL is written in TypeScript and comes with type definitions. However having type definitions and being type safe are two different things."),s.a.createElement(p.MDXTag,{name:"p",components:a},"GRelDAL attempts to balance a compromise between type-safety and ease of use. If enforcement of type-safety causes the APIs to significantly depart from\nidomatic JavaScript or TypeScript conventions we are usually willing to compromise on type-safety."),s.a.createElement(p.MDXTag,{name:"p",components:a},"Having said that, we do make a sincere attempt to ensure that as many bugs are caught at the compile time as opposed to run time and your contributions to make this better are very much appreciated."),s.a.createElement(p.MDXTag,{name:"p",components:a},"In addition, if the error checking has to happen at runtime we try to fail-fast with clear error messages up-front."),s.a.createElement(p.MDXTag,{name:"h2",components:a,props:{id:"runtime-type-validators"}},s.a.createElement(p.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#runtime-type-validators","aria-hidden":"true"}},s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Runtime Type Validators"),s.a.createElement(p.MDXTag,{name:"p",components:a},"In the introduction section, we saw that stores are defined like this:"),s.a.createElement(p.MDXTag,{name:"pre",components:a},s.a.createElement(p.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"hljs language-ts",metaString:""}},s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"import")," { types, mapDataSource } ",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"from")," ",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"greldal"'),";\n\n",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"const")," users = mapDataSource({\n    name: ",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"User"'),",\n    description: ",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-string"}},'"users"'),",\n    fields: {\n        id: {\n            ",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"type"),": types.string,\n            to: GraphQLID,\n        },\n        name: {\n            ",s.a.createElement(p.MDXTag,{name:"span",components:a,parentName:"code",props:{className:"hljs-keyword"}},"type"),": types.string,\n        },\n    },\n});")),s.a.createElement(p.MDXTag,{name:"p",components:a},"The type specifications (eg. ",s.a.createElement(p.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"types.string"),") in the mapping above are referred to as runtime types, and they validate the type of arguments at runtime.\nThey are not implemented inside GRelDAL - rather, we use ",s.a.createElement(p.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/gcanti/io-ts"}},"io-ts"),", an excellent library by ",s.a.createElement(p.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://mobile.twitter.com/GiulioCanti"}},"Giulio Canti"),"."),s.a.createElement(p.MDXTag,{name:"p",components:a},"You may wonder that given GraphQL already does validation of types at boundaries, why bother with this at all."),s.a.createElement(p.MDXTag,{name:"p",components:a},"There are two reasons:"),s.a.createElement(p.MDXTag,{name:"ol",components:a},s.a.createElement(p.MDXTag,{name:"li",components:a,parentName:"ol"},s.a.createElement(p.MDXTag,{name:"p",components:a,parentName:"li"},"We can extract out static types from these runtime types. This enables us to write type-safe code, when using TypeScript, without ever having to define any additional types. We can simply derive the types of the entities from the data source mapping itself and if you use incorrect fields or arguments, your code will fail to compile.")),s.a.createElement(p.MDXTag,{name:"li",components:a,parentName:"ol"},s.a.createElement(p.MDXTag,{name:"p",components:a,parentName:"li"},"Runtime types are composable and support ",s.a.createElement(p.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/gcanti/io-ts#refinements"}},"refinements"),", so you can embed generic validation logic in the runtime types and share them across field mappings & argument mappings across multiple stores and operations."))),s.a.createElement(p.MDXTag,{name:"p",components:a},"We not only extract static types from runtime types, we also derive GraphQL types from them - so you have to specify only the runtime types for most cases.\nIn some cases automatic type derivations are not possible and you may need to specify the GraphQL types separately - as is the case with ",s.a.createElement(p.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"GraphQLID")," in the snippet above.\nThe inferred GraphQL type would have been ",s.a.createElement(p.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"GraphQLString")," but because we have specified ",s.a.createElement(p.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"GraphQLID")," it would take precedence."))}},"I/E6":function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/type-safety",function(){var e=t("4tvf");return{page:e.default||e}}])}},[["I/E6","5d41","9da1"]]]);