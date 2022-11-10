"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[886],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(r),f=a,m=d["".concat(p,".").concat(f)]||d[f]||s[f]||o;return r?n.createElement(m,c(c({ref:t},u),{},{components:r})):n.createElement(m,c({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var l=2;l<o;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1445:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>s,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:4},c="\u88c5\u9970\u8005\u6a21\u5f0f",i={unversionedId:"structural-pattern/04Decorator",id:"structural-pattern/04Decorator",title:"\u88c5\u9970\u8005\u6a21\u5f0f",description:"- \u88c5\u9970\u8005\u6a21\u5f0f \uff08Decorator Pattern\uff09\u53c8\u79f0\u88c5\u9970\u5668\u6a21\u5f0f\uff0c\u5728\u4e0d\u6539\u53d8\u539f\u5bf9\u8c61\u7684\u57fa\u7840\u4e0a\uff0c\u901a\u8fc7\u5bf9\u5176\u6dfb\u52a0\u5c5e\u6027\u6216\u65b9\u6cd5\u6765\u8fdb\u884c\u5305\u88c5\u62d3\u5c55\uff0c\u4f7f\u5f97\u539f\u6709\u5bf9\u8c61\u53ef\u4ee5\u52a8\u6001\u5177\u6709\u66f4\u591a\u529f\u80fd\u3002",source:"@site/docs/04-structural-pattern/04Decorator.md",sourceDirName:"04-structural-pattern",slug:"/structural-pattern/04Decorator",permalink:"/design-pattern/docs/structural-pattern/04Decorator",draft:!1,editUrl:"https://github.com/retech-fe/design-pattern/blob/main/docs/04-structural-pattern/04Decorator.md",tags:[],version:"current",lastUpdatedBy:"pengfei.zuo",lastUpdatedAt:1668048125,formattedLastUpdatedAt:"Nov 10, 2022",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"\u9002\u914d\u5668\u6a21\u5f0f",permalink:"/design-pattern/docs/structural-pattern/03Adapter"},next:{title:"\u5916\u89c2\u6a21\u5f0f",permalink:"/design-pattern/docs/structural-pattern/05Facade"}},p={},l=[],u={toc:l};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u88c5\u9970\u8005\u6a21\u5f0f"},"\u88c5\u9970\u8005\u6a21\u5f0f"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u88c5\u9970\u8005\u6a21\u5f0f \uff08Decorator Pattern\uff09\u53c8\u79f0\u88c5\u9970\u5668\u6a21\u5f0f\uff0c\u5728\u4e0d\u6539\u53d8\u539f\u5bf9\u8c61\u7684\u57fa\u7840\u4e0a\uff0c\u901a\u8fc7\u5bf9\u5176\u6dfb\u52a0\u5c5e\u6027\u6216\u65b9\u6cd5\u6765\u8fdb\u884c\u5305\u88c5\u62d3\u5c55\uff0c\u4f7f\u5f97\u539f\u6709\u5bf9\u8c61\u53ef\u4ee5\u52a8\u6001\u5177\u6709\u66f4\u591a\u529f\u80fd\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u672c\u8d28\u662f\u529f\u80fd\u52a8\u6001\u7ec4\u5408\uff0c\u5373\u52a8\u6001\u5730\u7ed9\u4e00\u4e2a\u5bf9\u8c61\u6dfb\u52a0\u989d\u5916\u7684\u804c\u8d23\uff0c\u5c31\u589e\u52a0\u529f\u80fd\u89d2\u5ea6\u6765\u770b\uff0c\u4f7f\u7528\u88c5\u9970\u8005\u6a21\u5f0f\u6bd4\u7528\u7ee7\u627f\u66f4\u4e3a\u7075\u6d3b\u3002\u597d\u5904\u662f\u6709\u6548\u5730\u628a\u5bf9\u8c61\u7684\u6838\u5fc3\u804c\u8d23\u548c\u88c5\u9970\u529f\u80fd\u533a\u5206\u5f00\uff0c\u5e76\u4e14\u901a\u8fc7\u52a8\u6001\u589e\u5220\u88c5\u9970\u53bb\u9664\u76ee\u6807\u5bf9\u8c61\u4e2d\u91cd\u590d\u7684\u88c5\u9970\u903b\u8f91\u3002"))))}s.isMDXComponent=!0}}]);