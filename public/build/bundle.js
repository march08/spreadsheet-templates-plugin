var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function l(t,e,n){t.insertBefore(e,n||null)}function o(t){t.parentNode.removeChild(t)}function c(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function f(){return d(" ")}function m(){return d("")}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function h(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}let $;function y(t){$=t}const b=[],_=[],v=[],w=[],x=Promise.resolve();let O=!1;function C(t){v.push(t)}let E=!1;const k=new Set;function L(){if(!E){E=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];y(e),j(e.$$)}for(y(null),b.length=0;_.length;)_.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];k.has(e)||(k.add(e),e())}v.length=0}while(b.length);for(;w.length;)w.pop()();O=!1,E=!1,k.clear()}}function j(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const N=new Set;let A;function S(){A={r:0,c:[],p:A}}function B(){A.r||r(A.c),A=A.p}function T(t,e){t&&t.i&&(N.delete(t),t.i(e))}function F(t,e,n,r){if(t&&t.o){if(N.has(t))return;N.add(t),A.c.push((()=>{N.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function I(t){t&&t.c()}function M(t,n,a,i){const{fragment:l,on_mount:o,on_destroy:c,after_update:u}=t.$$;l&&l.m(n,a),i||C((()=>{const n=o.map(e).filter(s);c?c.push(...n):r(n),t.$$.on_mount=[]})),u.forEach(C)}function H(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function q(t,e){-1===t.$$.dirty[0]&&(b.push(t),O||(O=!0,x.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(e,s,a,i,l,c,u=[-1]){const d=$;y(e);const f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:s.context||[]),callbacks:n(),dirty:u,skip_bound:!1};let m=!1;if(f.ctx=a?a(e,s.props||{},((t,n,...r)=>{const s=r.length?r[0]:n;return f.ctx&&l(f.ctx[t],f.ctx[t]=s)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](s),m&&q(e,t)),n})):[],f.update(),m=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);f.fragment&&f.fragment.l(t),t.forEach(o)}else f.fragment&&f.fragment.c();s.intro&&T(e.$$.fragment),M(e,s.target,s.anchor,s.customElement),L()}y(d)}class P{$destroy(){H(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const U=[];const W=function(e,n=t){let r;const s=[];function i(t){if(a(e,t)&&(e=t,r)){const t=!U.length;for(let t=0;t<s.length;t+=1){const n=s[t];n[1](),U.push(n,e)}if(t){for(let t=0;t<U.length;t+=2)U[t][0](U[t+1]);U.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(a,l=t){const o=[a,l];return s.push(o),1===s.length&&(r=n(i)||t),a(e),()=>{const t=s.indexOf(o);-1!==t&&s.splice(t,1),0===s.length&&(r(),r=null)}}}}("");function D(e){let n,r,s,a,c,m,h,$,y,b,_,v,w,x,O,C,E,k,L=e[0].description+"",j=e[0].name+"",N=e[0].description+"";return{c(){n=u("div"),r=u("a"),s=u("img"),m=f(),h=u("div"),$=u("div"),y=d(L),_=f(),v=u("a"),w=d(j),O=f(),C=u("div"),E=u("div"),k=d(N),s.src!==(a=e[0].imgUrl)&&g(s,"src",a),g(s,"loading","lazy"),g(s,"alt",c=e[0].name),g(s,"class","template-image"),g($,"class","template-desc"),g(h,"class","temp__desc svelte-ep8egi"),g(r,"data-w-id","a9327e93-7efd-87e0-0692-2dfef0ff007b"),g(r,"href",b=`/template/${e[0].slug}`),g(r,"class","temp__thumbnail w-inline-block svelte-ep8egi"),g(v,"href",x=`/template/${e[0].slug}`),g(v,"class","template__label"),g(E,"class","template-desc"),g(C,"class","temp__desc mobile svelte-ep8egi"),g(n,"role","listitem"),g(n,"class","home__template w-dyn-item svelte-ep8egi")},m(t,e){l(t,n,e),i(n,r),i(r,s),i(r,m),i(r,h),i(h,$),i($,y),i(n,_),i(n,v),i(v,w),i(n,O),i(n,C),i(C,E),i(E,k)},p(t,[e]){1&e&&s.src!==(a=t[0].imgUrl)&&g(s,"src",a),1&e&&c!==(c=t[0].name)&&g(s,"alt",c),1&e&&L!==(L=t[0].description+"")&&p(y,L),1&e&&b!==(b=`/template/${t[0].slug}`)&&g(r,"href",b),1&e&&j!==(j=t[0].name+"")&&p(w,j),1&e&&x!==(x=`/template/${t[0].slug}`)&&g(v,"href",x),1&e&&N!==(N=t[0].description+"")&&p(k,N)},i:t,o:t,d(t){t&&o(n)}}}function G(t,e,n){let{data:r}=e;return t.$$set=t=>{"data"in t&&n(0,r=t.data)},[r]}class J extends P{constructor(t){super(),z(this,t,G,D,a,{data:0})}}function K(e){let n;return{c(){n=u("div"),n.innerHTML='<div class="h6">Sorry, there are no results yet for this search</div>',g(n,"class","empty-search-wrap"),h(n,"display","block"),h(n,"padding-left","2rem"),h(n,"padding-right","2rem")},m(t,e){l(t,n,e)},p:t,i:t,o:t,d(t){t&&o(n)}}}class Q extends P{constructor(t){super(),z(this,t,null,K,a,{})}}function R(t,e,n){const r=t.slice();return r[3]=e[n],r}function V(e){let n,r;return n=new Q({}),{c(){I(n.$$.fragment)},m(t,e){M(n,t,e),r=!0},p:t,i(t){r||(T(n.$$.fragment,t),r=!0)},o(t){F(n.$$.fragment,t),r=!1},d(t){H(n,t)}}}function X(t){let e,n,r=t[0],s=[];for(let e=0;e<r.length;e+=1)s[e]=Y(R(t,r,e));const a=t=>F(s[t],1,1,(()=>{s[t]=null}));return{c(){e=u("div");for(let t=0;t<s.length;t+=1)s[t].c();g(e,"role","list"),g(e,"class","templates__grid w-dyn-items")},m(t,r){l(t,e,r);for(let t=0;t<s.length;t+=1)s[t].m(e,null);n=!0},p(t,n){if(1&n){let i;for(r=t[0],i=0;i<r.length;i+=1){const a=R(t,r,i);s[i]?(s[i].p(a,n),T(s[i],1)):(s[i]=Y(a),s[i].c(),T(s[i],1),s[i].m(e,null))}for(S(),i=r.length;i<s.length;i+=1)a(i);B()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)T(s[t]);n=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)F(s[t]);n=!1},d(t){t&&o(e),c(s,t)}}}function Y(t){let e,n;return e=new J({props:{data:t[3]}}),{c(){I(e.$$.fragment)},m(t,r){M(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.data=t[3]),e.$set(r)},i(t){n||(T(e.$$.fragment,t),n=!0)},o(t){F(e.$$.fragment,t),n=!1},d(t){H(e,t)}}}function Z(t){let e,n,r,s;const a=[X,V],i=[];function c(t,e){return t[0].length>0?0:1}return e=c(t),n=i[e]=a[e](t),{c(){n.c(),r=m()},m(t,n){i[e].m(t,n),l(t,r,n),s=!0},p(t,[s]){let l=e;e=c(t),e===l?i[e].p(t,s):(S(),F(i[l],1,1,(()=>{i[l]=null})),B(),n=i[e],n?n.p(t,s):(n=i[e]=a[e](t),n.c()),T(n,1),n.m(r.parentNode,r))},i(t){s||(T(n),s=!0)},o(t){F(n),s=!1},d(t){i[e].d(t),t&&o(r)}}}function tt(t,e,n){let r,{data:s}=e,{limit:a}=e;return t.$$set=t=>{"data"in t&&n(1,s=t.data),"limit"in t&&n(2,a=t.limit)},t.$$.update=()=>{6&t.$$.dirty&&n(0,r=a?s.slice(0,a):s)},[r,s,a]}class et extends P{constructor(t){super(),z(this,t,tt,Z,a,{data:1,limit:2})}}function nt(t,e,n){const r=t.slice();return r[9]=e[n],r}function rt(t){let e,n,r=t[1],s=[];for(let e=0;e<r.length;e+=1)s[e]=ot(nt(t,r,e));const a=t=>F(s[t],1,1,(()=>{s[t]=null}));return{c(){for(let t=0;t<s.length;t+=1)s[t].c();e=m()},m(t,r){for(let e=0;e<s.length;e+=1)s[e].m(t,r);l(t,e,r),n=!0},p(t,n){if(2&n){let i;for(r=t[1],i=0;i<r.length;i+=1){const a=nt(t,r,i);s[i]?(s[i].p(a,n),T(s[i],1)):(s[i]=ot(a),s[i].c(),T(s[i],1),s[i].m(e.parentNode,e))}for(S(),i=r.length;i<s.length;i+=1)a(i);B()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)T(s[t]);n=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)F(s[t]);n=!1},d(t){c(s,t),t&&o(e)}}}function st(t){let e,n,r,s,a,c,m=t[4].name+"";return a=new et({props:{limit:null,data:t[4].data}}),{c(){e=u("div"),n=u("div"),r=d(m),s=f(),I(a.$$.fragment),g(n,"class","h6"),g(e,"class","templates__headline-wrap")},m(t,o){l(t,e,o),i(e,n),i(n,r),l(t,s,o),M(a,t,o),c=!0},p(t,e){(!c||16&e)&&m!==(m=t[4].name+"")&&p(r,m);const n={};16&e&&(n.data=t[4].data),a.$set(n)},i(t){c||(T(a.$$.fragment,t),c=!0)},o(t){F(a.$$.fragment,t),c=!1},d(t){t&&o(e),t&&o(s),H(a,t)}}}function at(e){let n,r,s,a;return s=new et({props:{limit:null,data:e[5]}}),{c(){n=u("div"),n.innerHTML='<div class="h6">Featured templates</div>',r=f(),I(s.$$.fragment),g(n,"class","templates__headline-wrap")},m(t,e){l(t,n,e),l(t,r,e),M(s,t,e),a=!0},p:t,i(t){a||(T(s.$$.fragment,t),a=!0)},o(t){F(s.$$.fragment,t),a=!1},d(t){t&&o(n),t&&o(r),H(s,t)}}}function it(t){let e,n,r,s;return r=new et({props:{limit:null,data:t[3]}}),{c(){e=u("div"),e.innerHTML='<div class="h6">Search result</div>',n=f(),I(r.$$.fragment),g(e,"class","templates__headline-wrap")},m(t,a){l(t,e,a),l(t,n,a),M(r,t,a),s=!0},p(t,e){const n={};8&e&&(n.data=t[3]),r.$set(n)},i(t){s||(T(r.$$.fragment,t),s=!0)},o(t){F(r.$$.fragment,t),s=!1},d(t){t&&o(e),t&&o(n),H(r,t)}}}function lt(t){let e,n,r;return{c(){e=u("a"),n=u("div"),n.textContent="Explore all →",g(e,"href",r=`/category/${t[9].slug}`),g(e,"class","explore-link w-inline-block")},m(t,r){l(t,e,r),i(e,n)},p(t,n){2&n&&r!==(r=`/category/${t[9].slug}`)&&g(e,"href",r)},d(t){t&&o(e)}}}function ot(t){let e,n,r,s,a,c,m,h=t[9].name+"",$=t[9].data.length>3&&lt(t);return c=new et({props:{limit:3,data:t[9].data}}),{c(){e=u("div"),n=u("div"),r=d(h),s=f(),$&&$.c(),a=f(),I(c.$$.fragment),g(n,"class","h6"),g(e,"class","templates__headline-wrap")},m(t,o){l(t,e,o),i(e,n),i(n,r),i(e,s),$&&$.m(e,null),l(t,a,o),M(c,t,o),m=!0},p(t,n){(!m||2&n)&&h!==(h=t[9].name+"")&&p(r,h),t[9].data.length>3?$?$.p(t,n):($=lt(t),$.c(),$.m(e,null)):$&&($.d(1),$=null);const s={};2&n&&(s.data=t[9].data),c.$set(s)},i(t){m||(T(c.$$.fragment,t),m=!0)},o(t){F(c.$$.fragment,t),m=!1},d(t){t&&o(e),$&&$.d(),t&&o(a),H(c,t)}}}function ct(t){let e,n,r,s;const a=[it,at,st,rt],i=[];function c(t,e){return t[2]?0:t[0]?1:t[4]?2:3}return e=c(t),n=i[e]=a[e](t),{c(){n.c(),r=m()},m(t,n){i[e].m(t,n),l(t,r,n),s=!0},p(t,[s]){let l=e;e=c(t),e===l?i[e].p(t,s):(S(),F(i[l],1,1,(()=>{i[l]=null})),B(),n=i[e],n?n.p(t,s):(n=i[e]=a[e](t),n.c()),T(n,1),n.m(r.parentNode,r))},i(t){s||(T(n),s=!0)},o(t){F(n),s=!1},d(t){i[e].d(t),t&&o(r)}}}function ut(t,e,n){let r,s,a,i,{items:l}=e,{isFeaturedList:o}=e,{activeCategory:c}=e,{categories:u}=e;W.subscribe((t=>{n(8,i=t)}));const d=l.filter((t=>!!t.featuredOrder)).sort(((t,e)=>Number(t.featuredOrder)-Number(e.featuredOrder)));return t.$$set=t=>{"items"in t&&n(6,l=t.items),"isFeaturedList"in t&&n(0,o=t.isFeaturedList),"activeCategory"in t&&n(7,c=t.activeCategory),"categories"in t&&n(1,u=t.categories)},t.$$.update=()=>{if(320&t.$$.dirty&&n(3,r=l.filter((t=>t.name.toLowerCase().includes(i.toLowerCase())||t.description.toLowerCase().includes(i.toLowerCase())))),256&t.$$.dirty&&n(2,s=i.length>0),130&t.$$.dirty&&n(4,a=c?u.find((t=>(console.log(t.slug,c,t.slug===c),t.slug===c))):null),4&t.$$.dirty)try{const t=document.getElementById("ss-content");if(t){const e=t.previousElementSibling;e&&s?e.style.display="none":e&&!s&&(e.style.display="block")}}catch(t){}},[o,u,s,r,a,d,l,c,i]}class dt extends P{constructor(t){super(),z(this,t,ut,ct,a,{items:6,isFeaturedList:0,activeCategory:7,categories:1})}}const ft=Array.from(document.getElementsByClassName("embed_collection_item")).map((t=>{const e=Array.from(t.children).map((t=>{const e=t.getAttribute("data-property");return e?e.split(/:(.+)/):null})).filter((t=>!!t)),n=t.nextElementSibling;let r=[];if(n){r=Array.from(n.querySelectorAll("em")).map((t=>({slug:t.getAttribute("data-slug"),name:t.getAttribute("data-name")})))}return e.reduce(((t,e)=>Object.assign(Object.assign({},t),{[e[0]]:e[1]})),{secondaryCategories:r})})),mt=Object.entries(ft.reduce(((t,e)=>{const n=e.secondaryCategories.reduce(((t,e)=>Object.assign(Object.assign({},t),{[e.slug]:e.name})),{});return Object.assign(Object.assign(Object.assign({},t),{[e.primarySlug]:e.primaryCategory}),n)}),{})).filter((t=>!!t)).map((([t,e])=>({slug:t,name:e}))).sort(((t,e)=>(t.name||"").localeCompare(e.name||""))).map((t=>{const e=ft.filter((e=>e.primarySlug===t.slug||!!e.secondaryCategories.find((e=>e.slug===t.slug)))).sort(((e,n)=>(e.primaryCategory===t.name?Number(e.categoryOrder):Number(e.categoryOrder)+1e4)-(n.primaryCategory===t.name?Number(n.categoryOrder):Number(n.categoryOrder)+1e4)));return Object.assign(Object.assign({},t),{data:e})}));function gt(e){let n,r,s,a,c,d,m;return{c(){n=u("div"),r=u("div"),s=u("input"),a=f(),c=u("span"),c.innerHTML='<img src="https://assets.website-files.com/60188e265d13c5a7c8f7998b/6037ba867f12403823977c18_search-icon.svg" loading="lazy" alt=""/>',g(s,"type","text"),g(s,"class","sidebar__input w-input"),g(s,"maxlength","256"),g(s,"placeholder","Search"),g(c,"class","sidebar__submit w-inline-block"),g(r,"class","sidebar__form-wrap"),g(n,"class","sidebar__form w-form")},m(t,o){var u,f,g,p;l(t,n,o),i(n,r),i(r,s),i(r,a),i(r,c),d||(u=s,f="input",g=e[0],u.addEventListener(f,g,p),m=()=>u.removeEventListener(f,g,p),d=!0)},p:t,i:t,o:t,d(t){t&&o(n),d=!1,m()}}}function pt(t){W.subscribe((t=>{}));return[t=>{W.set(t.currentTarget.value)}]}class ht extends P{constructor(t){super(),z(this,t,pt,gt,a,{})}}function $t(t,e,n){const r=t.slice();return r[1]=e[n],r}function yt(t){let e,n,r,s,a,c=t[1].name+"";return{c(){e=u("div"),n=u("a"),r=d(c),a=f(),g(n,"href",s=`/category/${t[1].slug}`),g(n,"class","link-small category-dropdown-link"),g(e,"role","listitem"),g(e,"class","sidebar__item w-dyn-item")},m(t,s){l(t,e,s),i(e,n),i(n,r),i(e,a)},p(t,e){1&e&&c!==(c=t[1].name+"")&&p(r,c),1&e&&s!==(s=`/category/${t[1].slug}`)&&g(n,"href",s)},d(t){t&&o(e)}}}function bt(e){let n,r,s=e[0],a=[];for(let t=0;t<s.length;t+=1)a[t]=yt($t(e,s,t));return{c(){n=u("div"),r=u("div");for(let t=0;t<a.length;t+=1)a[t].c();g(r,"role","list"),g(r,"class","w-dyn-items"),g(n,"class","sidebar__categories w-dyn-list")},m(t,e){l(t,n,e),i(n,r);for(let t=0;t<a.length;t+=1)a[t].m(r,null)},p(t,[e]){if(1&e){let n;for(s=t[0],n=0;n<s.length;n+=1){const i=$t(t,s,n);a[n]?a[n].p(i,e):(a[n]=yt(i),a[n].c(),a[n].m(r,null))}for(;n<a.length;n+=1)a[n].d(1);a.length=s.length}},i:t,o:t,d(t){t&&o(n),c(a,t)}}}function _t(t,e,n){let{categories:r}=e;return t.$$set=t=>{"categories"in t&&n(0,r=t.categories)},[r]}class vt extends P{constructor(t){super(),z(this,t,_t,bt,a,{categories:0})}}const wt=(()=>{const t=window.location.pathname;return t.startsWith("/category/")?t.replace("/category/","").split("/")[0]:null})(),xt="/templates-featured"===window.location.pathname;if(document.getElementById("ss-content"))var Ot=new dt({target:document.getElementById("ss-content"),props:{items:ft,activeCategory:wt,isFeaturedList:xt,categories:mt}});const Ct=document.getElementById("ss-search");Ct&&new ht({target:Ct});const Et=document.getElementById("ss-category-list");return Et&&new vt({target:Et,props:{categories:mt}}),Ot}();
//# sourceMappingURL=bundle.js.map
