(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"/XES":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return i});var r=n("VVJP"),a=n("vTWr");function i(e,t){return!t||"object"!==Object(r.default)(t)&&"function"!=typeof t?Object(a.default)(e):t}},"1TCz":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return v});var r=n("k9sC"),a=n.n(r),i=n("yP/C"),o=n("h7sq"),c=n("tS02"),u=n("/XES"),l=n("ztBH"),s=n("Fayl"),f=n("ERkP"),d=n.n(f),p=n("Khd+"),h=n.n(p),m=n("NxFA"),v=function(e){function t(){return Object(o.default)(this,t),Object(u.default)(this,Object(l.default)(t).apply(this,arguments))}return Object(s.default)(t,e),Object(c.default)(t,[{key:"render",value:function(){var e=this.props,t=e.Component,n=e.pageProps;return e.router.route.match(/\/api/)?d.a.createElement(p.Container,null,d.a.createElement(t,n)):d.a.createElement(p.Container,null,d.a.createElement(m.a,null,d.a.createElement(t,n)))}}],[{key:"getInitialProps",value:function(){var e=Object(i.default)(a.a.mark(function e(t){var n,r,i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.Component,t.router,r=t.ctx,i={},!n.getInitialProps){e.next=6;break}return e.next=5,n.getInitialProps(r);case 5:i=e.sent;case 6:return e.abrupt("return",{pageProps:i});case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(h.a)},"1kx4":function(e,t){e.exports=function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}).toLowerCase()}},"5A7e":function(e,t,n){e.exports=n("VAi2")},"9bSt":function(e,t,n){"use strict";var r=n("UwCj"),a=n("jHgz");e.exports=function(e,t,n){t in e?r.f(e,t,a(0,n)):e[t]=n}},AZcf:function(e,t){e.exports="/greldal/_next/static/images/81342499647d5509de6dd828ff74969e.png"},CLPb:function(e,t,n){"use strict";n.r(t);var r=n("ysci"),a=n.n(r);var i=n("Td7S"),o=n.n(i),c=n("5A7e"),u=n.n(c);function l(e){return function(e){if(a()(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(u()(Object(e))||"[object Arguments]"===Object.prototype.toString.call(e))return o()(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"default",function(){return l})},Fayl:function(e,t,n){"use strict";n.r(t);var r=n("Tqks"),a=n.n(r),i=n("U9rZ"),o=n.n(i);function c(e,t){return(c=o.a||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=a()(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}n.d(t,"default",function(){return u})},HaU7:function(e,t,n){"use strict";var r=n("lpv4"),a=r(n("k9sC")),i=r(n("WWUj")),o=r(n("OCF2")),c=r(n("E1+a")),u=r(n("Z05o")),l=r(n("OY2S")),s=r(n("zBsc")),f=r(n("wt0f")),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},p=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var h=d(n("ERkP")),m=p(n("aWzz")),v=n("kMDi"),y=n("Bkb1"),b=function(e){function t(){return(0,c.default)(this,t),(0,l.default)(this,(0,s.default)(t).apply(this,arguments))}return(0,f.default)(t,e),(0,u.default)(t,[{key:"getChildContext",value:function(){return{router:y.makePublicRouterInstance(this.props.router)}}},{key:"componentDidCatch",value:function(e){throw e}},{key:"render",value:function(){var e=this.props,t=e.router,n=e.Component,r=e.pageProps,a=x(t);return h.default.createElement(g,null,h.default.createElement(n,(0,o.default)({},r,{url:a})))}}],[{key:"getInitialProps",value:function(){var e=(0,i.default)(a.default.mark(function e(t){var n,r,i;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.Component,t.router,r=t.ctx,e.next=3,v.loadGetInitialProps(n,r);case 3:return i=e.sent,e.abrupt("return",{pageProps:i});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(h.Component);b.childContextTypes={router:m.default.object},t.default=b;var g=function(e){function t(){return(0,c.default)(this,t),(0,l.default)(this,(0,s.default)(t).apply(this,arguments))}return(0,f.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){this.scrollToHash()}},{key:"componentDidUpdate",value:function(){this.scrollToHash()}},{key:"scrollToHash",value:function(){var e=window.location.hash;if(e=!!e&&e.substring(1)){var t=document.getElementById(e);t&&setTimeout(function(){return t.scrollIntoView()},0)}}},{key:"render",value:function(){return this.props.children}}]),t}(h.Component);t.Container=g;var w=v.execOnce(function(){0});function x(e){var t=e.pathname,n=e.asPath,r=e.query;return{get query(){return w(),r},get pathname(){return w(),t},get asPath(){return w(),n},back:function(){w(),e.back()},push:function(t,n){return w(),e.push(t,n)},pushTo:function(t,n){w();var r=n?t:null,a=n||t;return e.push(r,a)},replace:function(t,n){return w(),e.replace(t,n)},replaceTo:function(t,n){w();var r=n?t:null,a=n||t;return e.replace(r,a)}}}t.createUrl=x},I9iR:function(e,t,n){"use strict";e.exports=function(e,t,n,r,a,i,o,c){if(!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,a,i,o,c],s=0;(u=new Error(t.replace(/%s/g,function(){return l[s++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}}},"Khd+":function(e,t,n){e.exports=n("HaU7")},NxFA:function(e,t,n){"use strict";var r=n("h7sq"),a=n("tS02"),i=n("/XES"),o=n("ztBH"),c=n("Fayl"),u=n("vTWr"),l=n("znL5"),s=n("ERkP"),f=n.n(s),d=n("j/s1");function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n("yVJX");var m=n("I9iR"),v=n.n(m),y=n("Rkrg"),b=n.n(y),g=function(){function e(e,t,n){var r=this;this.nativeMediaQueryList=e.matchMedia(t),this.active=!0,this.cancellableListener=function(){r.matches=r.nativeMediaQueryList.matches,r.active&&n.apply(void 0,arguments)},this.nativeMediaQueryList.addListener(this.cancellableListener),this.matches=this.nativeMediaQueryList.matches}return e.prototype.cancel=function(){this.active=!1,this.nativeMediaQueryList.removeListener(this.cancellableListener)},e}(),w=function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return h(p(p(t=e.call.apply(e,[this].concat(r))||this)),"state",{matches:t.props.defaultMatches}),h(p(p(t)),"updateMatches",function(){var e=t.mediaQueryList.matches;t.setState({matches:e});var n=t.props.onChange;n&&n(e)}),t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var a=r.prototype;return a.componentWillMount=function(){if("object"==typeof window){var e=this.props.targetWindow||window;"function"!=typeof e.matchMedia&&v()(!1);var t=this.props.query;"string"!=typeof t&&(t=b()(t)),this.mediaQueryList=new g(e,t,this.updateMatches),this.updateMatches()}},a.componentWillUnmount=function(){this.mediaQueryList.cancel()},a.render=function(){var e=this.props,t=e.children,n=e.render,r=this.state.matches;return n?r?n():null:t?"function"==typeof t?t(r):(!Array.isArray(t)||t.length)&&r?f.a.Children.only(t):null:null},r}(f.a.Component);h(w,"defaultProps",{defaultMatches:!0});var x=w,E=n("hAPS");n("sb3w"),n("16WD"),n("aLGl");n.d(t,"a",function(){return O});var O=function(e){function t(){var e,n;Object(r.default)(this,t);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return n=Object(i.default)(this,(e=Object(o.default)(t)).call.apply(e,[this].concat(c))),Object(l.a)(Object(u.default)(Object(u.default)(n)),"state",{show:!1,showDrawer:!1}),Object(l.a)(Object(u.default)(Object(u.default)(n)),"containerRef",f.a.createRef()),Object(l.a)(Object(u.default)(Object(u.default)(n)),"toggleDrawer",function(){n.setState({showDrawer:!n.state.showDrawer})}),n}return Object(c.default)(t,e),Object(a.default)(t,[{key:"componentDidMount",value:function(){this.setState({show:!0})}},{key:"componentDidUpdate",value:function(e){if(this.props.children!==e.children){var t=this.containerRef.current;if(!t)return;t.scrollTop=0}}},{key:"render",value:function(){var e=this;if(!this.state.show)return this.renderWideLayout();var t=this.props;t.sidebar,t.children;return f.a.createElement(x,{query:"(max-width: 1000px)"},function(t){return t?e.renderCompactLayout():e.renderWideLayout()})}},{key:"renderCompactLayout",value:function(){var e=this.props,t=e.children,n=e.sidebar;return f.a.createElement(k,{ref:this.containerRef},f.a.createElement(j,null,f.a.createElement(j.Action,null,f.a.createElement(j.Action.Control,{onClick:this.toggleDrawer},"☰")),f.a.createElement(j.Title,null,"GRelDAL")),f.a.createElement(P,{id:"container"},this.state.showDrawer?f.a.createElement(E.d,{onClick:this.toggleDrawer},f.a.createElement(E.c,null,n)):t))}},{key:"renderWideLayout",value:function(){var e=this.props,t=e.children,n=e.sidebar,r=this.state.show;return f.a.createElement("div",{style:{display:r?"block":"none"},ref:this.containerRef},f.a.createElement(E.a,null,f.a.createElement(E.c,null,n)),f.a.createElement(_,{id:"container"},t))}}]),t}(f.a.Component),k=d.a.div.withConfig({displayName:"PageLayout__CompactLayoutContainer",componentId:"ct4rbe-0"})(["position:absolute;top:0;left:0;right:0;bottom:0;overflow:auto;"]),j=d.a.div.withConfig({displayName:"PageLayout__AppHeader",componentId:"ct4rbe-1"})(["background:#acacac;line-height:1rem;border-bottom:2px solid #8a8a8a;display:flex;flex-direction:row;position:sticky;top:0;"]);j.Action=d.a.div.withConfig({displayName:"PageLayout__Action",componentId:"ct4rbe-2"})(["flex-grow:0;flex-shrink:0;flex-basis:3rem;padding:0.4rem;"]),j.Action.Control=d.a.button.withConfig({displayName:"PageLayout__Control",componentId:"ct4rbe-3"})(["padding:0.6rem;line-height:1rem;display:block;border:1px solid #8a8a8a;box-shadow:none;background:#ddd;font-size:1.6rem;"]),j.Title=d.a.div.withConfig({displayName:"PageLayout__Title",componentId:"ct4rbe-4"})(["flex-grow:1;flex-shrink:1;text-align:center;font-size:1.6rem;line-height:3rem;"]);var C=d.a.div.withConfig({displayName:"PageLayout__ContentContainer",componentId:"ct4rbe-5"})(["pre{padding:0 !important;}h1{margin:3rem 0;}h2,h3,h4,h5,h6{margin:2rem 0;}p,ol,ul{margin:2rem 0;}pre > code{border-left:4px solid #ddd;display:block;margin:0;padding:5px;}pre{max-width:calc(100% - 40px);overflow-x:auto;border:1px solid #ddd;background:#f8f8f8;}a,a:visited,a:hover,a:active{color:#0261cd;font-weight:bold;text-decoration:none;}"]),_=Object(d.a)(C).withConfig({displayName:"PageLayout__DesktopContentContainer",componentId:"ct4rbe-6"})(["max-width:700px;margin:40px 100px 50px 400px;"]),P=Object(d.a)(C).withConfig({displayName:"PageLayout__MobileContentContainer",componentId:"ct4rbe-7"})(["width:calc(100% - 40px);padding:20px;overflow-x:hidden;"])},R6fH:function(e,t,n){var r=n("M25K"),a=n("eD9m")("iterator"),i=n("tReM");e.exports=n("rFq9").isIterable=function(e){var t=Object(e);return void 0!==t[a]||"@@iterator"in t||i.hasOwnProperty(r(t))}},Rkrg:function(e,t,n){var r=n("1kx4"),a=function(e){var t="",n=Object.keys(e);return n.forEach(function(a,i){var o=e[a];(function(e){return/[height|width]$/.test(e)})(a=r(a))&&"number"==typeof o&&(o+="px"),t+=!0===o?a:!1===o?"not "+a:"("+a+": "+o+")",i<n.length-1&&(t+=" and ")}),t};e.exports=function(e){var t="";return"string"==typeof e?e:e instanceof Array?(e.forEach(function(n,r){t+=a(n),r<e.length-1&&(t+=", ")}),t):a(e)}},Td7S:function(e,t,n){e.exports=n("d5Ah")},VAi2:function(e,t,n){n("Fk9O"),n("/r3m"),e.exports=n("R6fH")},WWUj:function(e,t,n){var r=n("Ml6p");function a(e,t,n,a,i,o,c){try{var u=e[o](c),l=u.value}catch(s){return void n(s)}u.done?t(l):r.resolve(l).then(a,i)}e.exports=function(e){return function(){var t=this,n=arguments;return new r(function(r,i){var o=e.apply(t,n);function c(e){a(o,r,i,c,u,"next",e)}function u(e){a(o,r,i,c,u,"throw",e)}c(void 0)})}}},ZHK4:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){var e=n("1TCz");return{page:e.default||e}}])},d5Ah:function(e,t,n){n("/r3m"),n("qqHg"),e.exports=n("rFq9").Array.from},dMOP:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},hAPS:function(e,t,n){"use strict";var r=n("ERkP"),a=n.n(r),i=n("j/s1"),o=n("YNhk"),c=n("2ewA"),u=n("jvFD"),l=n.n(u),s=n("AZcf"),f=n.n(s);function d(){var e=Object(c.a)(["\n                            font-size: 0.8rem;\n                            font-weight: 100;\n                            color: orange;\n                            background: lemonchiffon;\n                            padding: 4px;\n                            border-radius: 4px;\n                            border: 1px solid orange;\n                            position: relative;\n                            top: -20px;\n                        "]);return d=function(){return e},e}function p(){return a.a.createElement(l.a,{href:"".concat("/greldal","/")},a.a.createElement("div",{style:{paddingBottom:"10px",display:"flex",flexDirection:"row",cursor:"pointer"}},a.a.createElement("img",{src:f.a,style:{height:"50px",width:"50px"}}),a.a.createElement("div",{style:{fontWeight:"600",fontSize:"2rem",lineHeight:"50px",paddingLeft:"10px",color:"#e535ab"}},"GRelDAL",a.a.createElement(h,null,"Beta"))))}var h=Object(i.a)("span")(d()),m=n("CLPb"),v=n("h7sq"),y=n("tS02"),b=n("/XES"),g=n("ztBH"),w=n("Fayl"),x=n("vTWr"),E=n("znL5"),O=n("nsO7"),k=function(e){function t(){var e,n;Object(v.default)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return n=Object(b.default)(this,(e=Object(g.default)(t)).call.apply(e,[this].concat(a))),Object(E.a)(Object(x.default)(Object(x.default)(n)),"state",{headers:[]}),n}return Object(w.default)(t,e),Object(y.default)(t,[{key:"render",value:function(){return Object(O.isEmpty)(this.state.headers)?null:a.a.createElement(a.a.Fragment,null,a.a.createElement(P,null,"Page Outline"),this.state.headers.map(function(e){return a.a.createElement("a",{href:"#".concat(e.id)},a.a.createElement("div",{style:{paddingLeft:10*e.level+"px",display:"flex",flexDirection:"row"}},a.a.createElement("div",{style:{marginRight:"5px"}},"►"),a.a.createElement("div",null,e.label)))}))}},{key:"componentDidMount",value:function(){this.updateOutline()}},{key:"componentDidUpdate",value:function(){this.updateOutline()}},{key:"updateOutline",value:function(){var e=Object(O.times)(6).map(function(e){return"#container h".concat(e+1)}).join(","),t=Object(m.default)(document.querySelectorAll(e)).map(function(e){return{level:Number(e.tagName.slice(1))-1,label:e.innerText,id:e.getAttribute("id")}}).filter(function(e){return e.id});Object(O.isEqual)(this.state.headers,t)||this.setState({headers:t})}}]),t}(a.a.Component);n.d(t,"c",function(){return j}),n.d(t,"d",function(){return C}),n.d(t,"a",function(){return _}),n.d(t,"b",function(){return P});var j=function(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,a.a.createElement(p,null),a.a.createElement(o.a,{href:"api",highlighted:!0},a.a.createElement(o.c,null,"⯈"),"API"),a.a.createElement(o.a,{href:"#quick-start"},a.a.createElement(A,null),"Quick Start"),a.a.createElement(o.a,{href:"faqs"},a.a.createElement(A,null),"Frequently Asked Questions"),a.a.createElement(o.a,{href:"guides"},a.a.createElement(P,null,"Guides")),a.a.createElement(o.a,{href:"mapping-data-sources"},a.a.createElement(A,null),"Mapping Data Sources"),a.a.createElement(o.a,{href:"mapping-operations"},a.a.createElement(A,null),"Mapping Operations"),a.a.createElement(o.a,{href:"mapping-associations"},a.a.createElement(A,null),"Mapping Associations"),a.a.createElement(o.a,{href:"best-practices"},a.a.createElement(A,null),"Best Practices"),a.a.createElement(P,null,"Additional Topics"),a.a.createElement(o.a,{href:"type-safety"},a.a.createElement(A,null),"Type Safety"),a.a.createElement(o.a,{href:"architecture-overview"},a.a.createElement(A,null),"Architecture"),a.a.createElement(o.a,{href:"comparision-with-alternatives"},a.a.createElement(A,null),"Comparision With Alternatives"),a.a.createElement(k,null),t)},C=i.a.div.withConfig({displayName:"Sidebar__SidebarContainer",componentId:"sc-1bydltt-0"})(["background:#fff;padding:10px 30px 30px 30px;a,a:visited{display:block;color:#000;font-weight:700;margin-top:5px;text-decoration:none;}h1,h2,h3,h4,h5,h6{font-size:0.75rem !important;font-weight:600;}"]),_=Object(i.a)(C).withConfig({displayName:"Sidebar__FixedSidebarContainer",componentId:"sc-1bydltt-1"})(["position:fixed;top:0;left:0;bottom:0;width:300px;overflow-y:auto;overflow-x:auto;border-right:1px solid #bbb;box-shadow:0 0 20px #ccc;"]),P=i.a.h1.withConfig({displayName:"Sidebar__SectionHeader",componentId:"sc-1bydltt-2"})(["background:#ddd;padding:5px 10px;text-transform:uppercase;border-radius:4px;color:gray;font-size:0.75rem;margin:1.6rem 0;"]),A=Object(i.a)(function(e){return a.a.createElement("span",e,"⚡")}).withConfig({displayName:"Sidebar__Bolt",componentId:"sc-1bydltt-3"})(["margin-right:5px;"])},qqHg:function(e,t,n){"use strict";var r=n("dWRk"),a=n("IFjL"),i=n("MrWc"),o=n("9vFK"),c=n("fawX"),u=n("MPuG"),l=n("9bSt"),s=n("1sfF");a(a.S+a.F*!n("EWHn")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,a,f,d=i(e),p="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,v=void 0!==m,y=0,b=s(d);if(v&&(m=r(m,h>2?arguments[2]:void 0,2)),null==b||p==Array&&c(b))for(n=new p(t=u(d.length));t>y;y++)l(n,y,v?m(d[y],y):d[y]);else for(f=b.call(d),n=new p;!(a=f.next()).done;y++)l(n,y,v?o(f,m,[a.value,y],!0):a.value);return n.length=y,n}})},vTWr:function(e,t,n){"use strict";function r(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.r(t),n.d(t,"default",function(){return r})},yVJX:function(e,t,n){e.exports=n("zPGv")()},zPGv:function(e,t,n){"use strict";var r=n("dMOP");function a(){}function i(){}i.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,i,o){if(o!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:a};return n.PropTypes=n,n}},znL5:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n("LcAa"),a=n.n(r);function i(e,t,n){return t in e?a()(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},ztBH:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c});var r=n("jPfo"),a=n.n(r),i=n("U9rZ"),o=n.n(i);function c(e){return(c=o.a?a.a:function(e){return e.__proto__||a()(e)})(e)}}},[["ZHK4",1,0,2]]]);