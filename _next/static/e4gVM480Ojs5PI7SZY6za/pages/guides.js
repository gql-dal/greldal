(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{596:function(e,a,n){__NEXT_REGISTER_PAGE("/guides",function(){return e.exports=n(597),{page:e.exports.default}})},597:function(e,a,n){"use strict";n.r(a);var t=n(0),o=n.n(t),r=n(1),s=n(3);function c(e,a){if(null==e)return{};var n,t,o=function(e,a){if(null==e)return{};var n,t,o={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||(o[n]=e[n]);return o}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}a.default=function(e){var a=e.components;c(e,["components"]);return o.a.createElement(r.MDXTag,{name:"wrapper",components:a},o.a.createElement(r.MDXTag,{name:"h1",components:a,props:{id:"welcome"}},o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"h1",props:{href:"#welcome","aria-hidden":"true"}},o.a.createElement(r.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Welcome"),o.a.createElement(r.MDXTag,{name:"p",components:a},"This series of posts is a guided tour of GRelDAL. Please go through the ",o.a.createElement(s.a,{href:"#quick-start"},"Quick Start")," first if you haven't already."),o.a.createElement(r.MDXTag,{name:"p",components:a},"After walking through the guides, you will develop a good operational familiarity with GRelDAL. These guides cover all important features of GRelDAL in reasonable detail. For more granular aspects you are encouraged to checkout the ",o.a.createElement(s.a,{href:"api"},"API docs")," and the ",o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"https://github.com/gql-dal/greldal"}},"source code"),"."),o.a.createElement(r.MDXTag,{name:"p",components:a},"If you are looking for a quick solution to a problem you may checkout the ",o.a.createElement(s.a,null,"FAQs"),"."),o.a.createElement(r.MDXTag,{name:"h2",components:a,props:{id:"sections"}},o.a.createElement(r.MDXTag,{name:"a",components:a,parentName:"h2",props:{href:"#sections","aria-hidden":"true"}},o.a.createElement(r.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon icon-link"}})),"Sections"),o.a.createElement(r.MDXTag,{name:"p",components:a},o.a.createElement("h3",null,o.a.createElement(s.a,null,"Mapping Data Sources"))),o.a.createElement(r.MDXTag,{name:"p",components:a},"This briefly covers what a data source is, and how it relates to concepts in RDBMS and GraphQL. Going through this guide will enable you to understand how GRelDAL maps from database tables to GraphQL types and how this mapping can be configured for various use cases."),o.a.createElement(s.a,{href:"mapping-data-sources"},"Read More..."),o.a.createElement(r.MDXTag,{name:"p",components:a},o.a.createElement("h3",null,o.a.createElement(s.a,null,"Mapping Operations"))),o.a.createElement(r.MDXTag,{name:"p",components:a},"Data sources are not useful in themselves. They are useful only if we can perform some operations on them. These operations enable us to query the database, save and update information and delete information we don't need."),o.a.createElement(r.MDXTag,{name:"p",components:a},"This guide covers usage of operation presets which enable us to quickly setup CRUD operations and then delve deeper into custom operations which can contain complex business logic."),o.a.createElement(s.a,{href:"mapping-operations"},"Read More..."),o.a.createElement(r.MDXTag,{name:"p",components:a},o.a.createElement("h3",null,o.a.createElement(s.a,null,"Mapping Associations"))),o.a.createElement(r.MDXTag,{name:"p",components:a},"Much of the power of relational databases comes from establishing constraints between databases and perform operations on multiple tables at ones using joins. This guide covers how we can take advantage of GRelDAL's powerful association mapping capabilities to take advantages of these features."),o.a.createElement(s.a,{href:"mapping-associations"},"Read More..."),o.a.createElement(r.MDXTag,{name:"p",components:a},o.a.createElement("h3",null,o.a.createElement(s.a,null,"Best Practices"))),o.a.createElement(r.MDXTag,{name:"p",components:a},"This section contains some closing notes around best practices when developing data driven GraphQL APIs."),o.a.createElement(s.a,{href:"best-practices"},"Read More..."))}}},[[596,1,0]]]);