(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"56J2":function(e,a,t){"use strict";t.r(a);var r=t("q1tI"),n=t.n(r),l=t("TJpk"),o=t.n(l),c=t("Wbzz"),i=t("hpys"),s=t("1wty"),m=t("okzv"),u=t("uBiN"),d=t("ok1R"),p=t("rhny"),g=t("jrRI"),f=t("3OM0"),h=t("L3zb"),E=t("sOKU"),v=function(e){var a=e.query,t=e.filter;return n.a.createElement(u.a,{role:"search",method:"GET"},n.a.createElement(d.a,{form:!0,id:"search-form"},n.a.createElement(p.a,{md:"2"},n.a.createElement(g.a,null,n.a.createElement(f.a,{for:"searchFilter"},n.a.createElement("h6",null,"Filter")),n.a.createElement(h.a,{type:"select",name:"filter",id:"search-tag",bsSize:"lg","aria-controls":"search-results-count",onChange:function(e){return Object(c.navigate)(location.pathname+"?keywords="+a+"&filter="+encodeURIComponent(e.target.value))},value:t},n.a.createElement("option",{value:""},"All"),n.a.createElement("option",{value:"gameplay"},"Gameplay"),n.a.createElement("option",{value:"logic"},"Logic")))),n.a.createElement(p.a,{md:"8"},n.a.createElement(g.a,null,n.a.createElement(f.a,{for:"searchQuery"},n.a.createElement("h6",null,"Search")),n.a.createElement(h.a,{type:"search",id:"search-input",name:"keywords",bsSize:"lg","aria-controls":"search-results-count",onChange:function(e){return Object(c.navigate)(location.pathname+"?keywords="+encodeURIComponent(e.target.value)+"&filter="+t)},placeholder:"Search...",value:a}))),n.a.createElement(p.a,{md:"2"},n.a.createElement(E.a,{type:"submit",color:"primary",size:"lg",id:"search-btn"},"Search"))))},b=t("7gj2"),y=t("IpnI"),w=t.n(y),k=t("ihot");a.default=function(e,a){var t=e.data,l=e.pageContext,u=l.moduleCurrentPage,d=l.moduleNumPages,p=t.allMarkdownRemark.edges,g=k,f=1===u,h=u===d,E=u-1==1?"":(u-1).toString(),y=(u+1).toString(),L=Object(r.useState)(!1),R=L[0],S=L[1],j=Object(r.useState)([]),x=j[0],U=j[1],O=a.location;"undefined"!=typeof window&&(O=location.search);var z=new URLSearchParams(O).get("keywords")||"",P=new URLSearchParams(O).get("filter")||"";function C(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}return Object(r.useEffect)((function(){z||P?(U(g.filter((function(e){var a=new RegExp(C(z),"gi"),t=new RegExp(C(P),"gi");return e.tags.match(t)&&e.title.match(a)}))),S(!0)):(U([]),S(!1))}),[O]),n.a.createElement(i.a,null,n.a.createElement("div",{className:"index-container"},n.a.createElement(o.a,{title:"Modules | "+w.a.siteTitle}),n.a.createElement(m.a,null),n.a.createElement(v,{query:z,filter:P}),R&&n.a.createElement(b.a,{id:"src",query:z,filter:P,results:x,postEdges:p}),!R&&n.a.createElement(s.a,{id:"modules",postEdges:p})),!f&&n.a.createElement(c.Link,{to:"/modules/"+E,rel:"prev"},"← Previous Page"),!h&&n.a.createElement(c.Link,{to:"/modules/"+y,rel:"next"},"Next Page →"))}},ihot:function(e){e.exports=JSON.parse('[{"path":"/modules/farming","tags":"Logic","cover":{"publicURL":"/static/7a1748f57787e6b191d9f87d6bf63a50/cover.jpg"},"title":"Farming","date":"01/01/2017"},{"path":"/modules/light-and-shadow","tags":"Gameplay Template","cover":{"publicURL":"/static/7a1748f57787e6b191d9f87d6bf63a50/cover.jpg"},"title":"Light And Shadow","date":"01/01/2017"},{"path":"/modules/gooey-defence","tags":"Gameplay Template","cover":{"publicURL":"/static/7a1748f57787e6b191d9f87d6bf63a50/cover.jpg"},"title":"Gooey Defence","date":"01/01/2017"},{"path":"/modules/gooey-example","tags":"Logic","cover":{"publicURL":"/static/7a1748f57787e6b191d9f87d6bf63a50/cover.jpg"},"title":"Gooey Example","date":"01/01/2017"}]')}}]);
//# sourceMappingURL=component---src-templates-modulelist-jsx-0193a5a4e3717ea4a12e.js.map