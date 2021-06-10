var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function a(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function o(t){t.parentNode.removeChild(t)}function c(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function m(){return d(" ")}function f(){return d("")}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let h;function $(t){h=t}const y=[],b=[],_=[],v=[],w=Promise.resolve();let x=!1;function O(t){_.push(t)}let C=!1;const L=new Set;function k(){if(!C){C=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];$(e),E(e.$$)}for($(null),y.length=0;b.length;)b.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];L.has(e)||(L.add(e),e())}_.length=0}while(y.length);for(;v.length;)v.pop()();x=!1,C=!1,L.clear()}}function E(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}const N=new Set;let j;function A(){j={r:0,c:[],p:j}}function T(){j.r||r(j.c),j=j.p}function S(t,e){t&&t.i&&(N.delete(t),t.i(e))}function F(t,e,n,r){if(t&&t.o){if(N.has(t))return;N.add(t),j.c.push((()=>{N.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function M(t){t&&t.c()}function B(t,n,s,l){const{fragment:i,on_mount:o,on_destroy:c,after_update:u}=t.$$;i&&i.m(n,s),l||O((()=>{const n=o.map(e).filter(a);c?c.push(...n):r(n),t.$$.on_mount=[]})),u.forEach(O)}function H(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function I(t,e){-1===t.$$.dirty[0]&&(y.push(t),x||(x=!0,w.then(k)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function U(e,a,s,l,i,c,u=[-1]){const d=h;$(e);const m=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:a.context||[]),callbacks:n(),dirty:u,skip_bound:!1};let f=!1;if(m.ctx=s?s(e,a.props||{},((t,n,...r)=>{const a=r.length?r[0]:n;return m.ctx&&i(m.ctx[t],m.ctx[t]=a)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](a),f&&I(e,t)),n})):[],m.update(),f=!0,r(m.before_update),m.fragment=!!l&&l(m.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);m.fragment&&m.fragment.l(t),t.forEach(o)}else m.fragment&&m.fragment.c();a.intro&&S(e.$$.fragment),B(e,a.target,a.anchor,a.customElement),k()}$(d)}class q{$destroy(){H(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const z=[];const P=function(e,n=t){let r;const a=[];function l(t){if(s(e,t)&&(e=t,r)){const t=!z.length;for(let t=0;t<a.length;t+=1){const n=a[t];n[1](),z.push(n,e)}if(t){for(let t=0;t<z.length;t+=2)z[t][0](z[t+1]);z.length=0}}}return{set:l,update:function(t){l(t(e))},subscribe:function(s,i=t){const o=[s,i];return a.push(o),1===a.length&&(r=n(l)||t),s(e),()=>{const t=a.indexOf(o);-1!==t&&a.splice(t,1),0===a.length&&(r(),r=null)}}}}("");function R(e){let n,r,a,s,c,f,h,$,y,b,_,v,w,x,O,C,L=e[0].description+"",k=e[0].name+"";return{c(){var t,l,i;n=u("div"),r=u("a"),a=u("img"),f=m(),h=u("div"),$=u("div"),y=d(L),_=m(),v=u("a"),w=d(k),O=m(),C=u("div"),C.innerHTML='<div class="template-desc">Use this spreadsheet to create an amortization schedule for a fixed-rate\n      loan. Edit the cells within the blue cell borders (Loan Amount, Term,\n      Interest Rate, etc.). You can also enter optional extra payments within\n      the table to estimate the interest savings.</div>',a.src!==(s=e[0].imgUrl)&&g(a,"src",s),g(a,"loading","lazy"),g(a,"alt",c=e[0].name),g(a,"class","template-image"),g($,"class","template-desc"),t="opacity",l="0",h.style.setProperty(t,l,i?"important":""),g(h,"class","temp__desc"),g(r,"data-w-id","a9327e93-7efd-87e0-0692-2dfef0ff007b"),g(r,"href",b=`/template/${e[0].slug}`),g(r,"class","temp__thumbnail w-inline-block"),g(v,"href",x=`/template/${e[0].slug}`),g(v,"class","template__label"),g(C,"class","temp__desc mobile"),g(n,"role","listitem"),g(n,"class","home__template w-dyn-item")},m(t,e){i(t,n,e),l(n,r),l(r,a),l(r,f),l(r,h),l(h,$),l($,y),l(n,_),l(n,v),l(v,w),l(n,O),l(n,C)},p(t,[e]){1&e&&a.src!==(s=t[0].imgUrl)&&g(a,"src",s),1&e&&c!==(c=t[0].name)&&g(a,"alt",c),1&e&&L!==(L=t[0].description+"")&&p(y,L),1&e&&b!==(b=`/template/${t[0].slug}`)&&g(r,"href",b),1&e&&k!==(k=t[0].name+"")&&p(w,k),1&e&&x!==(x=`/template/${t[0].slug}`)&&g(v,"href",x)},i:t,o:t,d(t){t&&o(n)}}}function W(t,e,n){let{data:r}=e;return t.$$set=t=>{"data"in t&&n(0,r=t.data)},[r]}class Y extends q{constructor(t){super(),U(this,t,W,R,s,{data:0})}}function D(e){let n;return{c(){n=u("div"),n.innerHTML="<div>No items found.</div>",g(n,"class","w-dyn-empty")},m(t,e){i(t,n,e)},p:t,i:t,o:t,d(t){t&&o(n)}}}class G extends q{constructor(t){super(),U(this,t,null,D,s,{})}}function J(t,e,n){const r=t.slice();return r[3]=e[n],r}function K(e){let n,r;return n=new G({}),{c(){M(n.$$.fragment)},m(t,e){B(n,t,e),r=!0},p:t,i(t){r||(S(n.$$.fragment,t),r=!0)},o(t){F(n.$$.fragment,t),r=!1},d(t){H(n,t)}}}function Q(t){let e,n,r=t[0],a=[];for(let e=0;e<r.length;e+=1)a[e]=V(J(t,r,e));const s=t=>F(a[t],1,1,(()=>{a[t]=null}));return{c(){e=u("div");for(let t=0;t<a.length;t+=1)a[t].c();g(e,"role","list"),g(e,"class","templates__grid w-dyn-items")},m(t,r){i(t,e,r);for(let t=0;t<a.length;t+=1)a[t].m(e,null);n=!0},p(t,n){if(1&n){let l;for(r=t[0],l=0;l<r.length;l+=1){const s=J(t,r,l);a[l]?(a[l].p(s,n),S(a[l],1)):(a[l]=V(s),a[l].c(),S(a[l],1),a[l].m(e,null))}for(A(),l=r.length;l<a.length;l+=1)s(l);T()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)S(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)F(a[t]);n=!1},d(t){t&&o(e),c(a,t)}}}function V(t){let e,n;return e=new Y({props:{data:t[3]}}),{c(){M(e.$$.fragment)},m(t,r){B(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.data=t[3]),e.$set(r)},i(t){n||(S(e.$$.fragment,t),n=!0)},o(t){F(e.$$.fragment,t),n=!1},d(t){H(e,t)}}}function X(t){let e,n,r,a;const s=[Q,K],l=[];function c(t,e){return t[0].length>0?0:1}return e=c(t),n=l[e]=s[e](t),{c(){n.c(),r=f()},m(t,n){l[e].m(t,n),i(t,r,n),a=!0},p(t,[a]){let i=e;e=c(t),e===i?l[e].p(t,a):(A(),F(l[i],1,1,(()=>{l[i]=null})),T(),n=l[e],n?n.p(t,a):(n=l[e]=s[e](t),n.c()),S(n,1),n.m(r.parentNode,r))},i(t){a||(S(n),a=!0)},o(t){F(n),a=!1},d(t){l[e].d(t),t&&o(r)}}}function Z(t,e,n){let r,{data:a}=e,{limit:s}=e;return t.$$set=t=>{"data"in t&&n(1,a=t.data),"limit"in t&&n(2,s=t.limit)},t.$$.update=()=>{6&t.$$.dirty&&n(0,r=s?a.slice(0,s):a)},[r,a,s]}class tt extends q{constructor(t){super(),U(this,t,Z,X,s,{data:1,limit:2})}}function et(t,e,n){const r=t.slice();return r[9]=e[n],r}function nt(t){let e,n,r=t[1],a=[];for(let e=0;e<r.length;e+=1)a[e]=it(et(t,r,e));const s=t=>F(a[t],1,1,(()=>{a[t]=null}));return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=f()},m(t,r){for(let e=0;e<a.length;e+=1)a[e].m(t,r);i(t,e,r),n=!0},p(t,n){if(2&n){let l;for(r=t[1],l=0;l<r.length;l+=1){const s=et(t,r,l);a[l]?(a[l].p(s,n),S(a[l],1)):(a[l]=it(s),a[l].c(),S(a[l],1),a[l].m(e.parentNode,e))}for(A(),l=r.length;l<a.length;l+=1)s(l);T()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)S(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)F(a[t]);n=!1},d(t){c(a,t),t&&o(e)}}}function rt(t){let e,n,r,a,s,c,f=t[4].name+"";return s=new tt({props:{limit:null,data:t[4].data}}),{c(){e=u("div"),n=u("div"),r=d(f),a=m(),M(s.$$.fragment),g(n,"class","h6"),g(e,"class","templates__headline-wrap")},m(t,o){i(t,e,o),l(e,n),l(n,r),i(t,a,o),B(s,t,o),c=!0},p(t,e){(!c||16&e)&&f!==(f=t[4].name+"")&&p(r,f);const n={};16&e&&(n.data=t[4].data),s.$set(n)},i(t){c||(S(s.$$.fragment,t),c=!0)},o(t){F(s.$$.fragment,t),c=!1},d(t){t&&o(e),t&&o(a),H(s,t)}}}function at(e){let n,r,a,s;return a=new tt({props:{limit:null,data:e[5]}}),{c(){n=u("div"),n.innerHTML='<div class="h6">Featured templates</div>',r=m(),M(a.$$.fragment),g(n,"class","templates__headline-wrap")},m(t,e){i(t,n,e),i(t,r,e),B(a,t,e),s=!0},p:t,i(t){s||(S(a.$$.fragment,t),s=!0)},o(t){F(a.$$.fragment,t),s=!1},d(t){t&&o(n),t&&o(r),H(a,t)}}}function st(t){let e,n,r,a;return r=new tt({props:{limit:null,data:t[2]}}),{c(){e=u("div"),e.innerHTML='<div class="h6">Search result</div>',n=m(),M(r.$$.fragment),g(e,"class","templates__headline-wrap")},m(t,s){i(t,e,s),i(t,n,s),B(r,t,s),a=!0},p(t,e){const n={};4&e&&(n.data=t[2]),r.$set(n)},i(t){a||(S(r.$$.fragment,t),a=!0)},o(t){F(r.$$.fragment,t),a=!1},d(t){t&&o(e),t&&o(n),H(r,t)}}}function lt(t){let e,n,r;return{c(){e=u("a"),n=u("div"),n.textContent="Explore all →",g(e,"href",r=`/category/${t[9].slug}`),g(e,"class","explore-link w-inline-block")},m(t,r){i(t,e,r),l(e,n)},p(t,n){2&n&&r!==(r=`/category/${t[9].slug}`)&&g(e,"href",r)},d(t){t&&o(e)}}}function it(t){let e,n,r,a,s,c,f,h=t[9].name+"",$=t[9].data.length>3&&lt(t);return c=new tt({props:{limit:3,data:t[9].data}}),{c(){e=u("div"),n=u("div"),r=d(h),a=m(),$&&$.c(),s=m(),M(c.$$.fragment),g(n,"class","h6"),g(e,"class","templates__headline-wrap")},m(t,o){i(t,e,o),l(e,n),l(n,r),l(e,a),$&&$.m(e,null),i(t,s,o),B(c,t,o),f=!0},p(t,n){(!f||2&n)&&h!==(h=t[9].name+"")&&p(r,h),t[9].data.length>3?$?$.p(t,n):($=lt(t),$.c(),$.m(e,null)):$&&($.d(1),$=null);const a={};2&n&&(a.data=t[9].data),c.$set(a)},i(t){f||(S(c.$$.fragment,t),f=!0)},o(t){F(c.$$.fragment,t),f=!1},d(t){t&&o(e),$&&$.d(),t&&o(s),H(c,t)}}}function ot(t){let e,n,r,a;const s=[st,at,rt,nt],l=[];function c(t,e){return t[3]?0:t[0]?1:t[4]?2:3}return e=c(t),n=l[e]=s[e](t),{c(){n.c(),r=f()},m(t,n){l[e].m(t,n),i(t,r,n),a=!0},p(t,[a]){let i=e;e=c(t),e===i?l[e].p(t,a):(A(),F(l[i],1,1,(()=>{l[i]=null})),T(),n=l[e],n?n.p(t,a):(n=l[e]=s[e](t),n.c()),S(n,1),n.m(r.parentNode,r))},i(t){a||(S(n),a=!0)},o(t){F(n),a=!1},d(t){l[e].d(t),t&&o(r)}}}function ct(t,e,n){let r,a,s,l,{items:i}=e,{isFeaturedList:o}=e,{activeCategory:c}=e,{categories:u}=e;P.subscribe((t=>{n(8,l=t)}));const d=i.filter((t=>!!t.featuredOrder)).sort(((t,e)=>Number(t.featuredOrder)-Number(e.featuredOrder)));return console.log(d),t.$$set=t=>{"items"in t&&n(6,i=t.items),"isFeaturedList"in t&&n(0,o=t.isFeaturedList),"activeCategory"in t&&n(7,c=t.activeCategory),"categories"in t&&n(1,u=t.categories)},t.$$.update=()=>{320&t.$$.dirty&&n(2,r=i.filter((t=>t.name.toLowerCase().includes(l.toLowerCase())||t.description.toLowerCase().includes(l.toLowerCase())))),256&t.$$.dirty&&n(3,a=l.length>0),130&t.$$.dirty&&n(4,s=c?u.find((t=>(console.log(t.slug,c,t.slug===c),t.slug===c))):null)},[o,u,r,a,s,d,i,c,l]}const ut=Array.from(document.getElementsByClassName("embed_collection_item")).map((t=>{const e=Array.from(t.children).map((t=>t.getAttribute("data-property").split(/:(.+)/))),n=t.nextElementSibling;let r=[];if(n){r=Array.from(n.querySelectorAll("em")).map((t=>({slug:t.getAttribute("data-slug"),name:t.getAttribute("data-name")})))}return e.reduce(((t,e)=>Object.assign(Object.assign({},t),{[e[0]]:e[1]})),{secondaryCategories:r})})),dt=Object.entries(ut.reduce(((t,e)=>{const n=e.secondaryCategories.reduce(((t,e)=>Object.assign(Object.assign({},t),{[e.slug]:e.name})),{});return Object.assign(Object.assign(Object.assign({},t),{[e.primarySlug]:e.primaryCategory}),n)}),{})).map((([t,e])=>({slug:t,name:e}))).sort(((t,e)=>t.name.localeCompare(e.name))).map((t=>{const e=ut.filter((e=>e.primarySlug===t.slug||!!e.secondaryCategories.find((e=>e.slug===t.slug)))).sort(((e,n)=>(e.primaryCategory===t.name?Number(e.categoryOrder):Number(e.categoryOrder)+1e4)-(n.primaryCategory===t.name?Number(n.categoryOrder):Number(n.categoryOrder)+1e4)));return Object.assign(Object.assign({},t),{data:e})}));function mt(t,e,n){const r=t.slice();return r[3]=e[n],r}function ft(t){let e,n,r,a,s,c=t[3].name+"";return{c(){e=u("div"),n=u("a"),r=d(c),s=m(),g(n,"href",a=`/category/${t[3].slug}`),g(n,"class","link-small category-dropdown-link"),g(e,"role","listitem"),g(e,"class","sidebar__item w-dyn-item")},m(t,a){i(t,e,a),l(e,n),l(n,r),l(e,s)},p(t,e){1&e&&c!==(c=t[3].name+"")&&p(r,c),1&e&&a!==(a=`/category/${t[3].slug}`)&&g(n,"href",a)},d(t){t&&o(e)}}}function gt(e){let n,r,a,s,d,f,p,h,$,y,b,_,v,w,x,O=e[0],C=[];for(let t=0;t<O.length;t+=1)C[t]=ft(mt(e,O,t));return{c(){n=u("div"),r=u("input"),a=m(),s=u("br"),d=m(),f=u("div"),p=u("div"),h=u("div"),h.innerHTML='<a href="/templates" class="link-small category-dropdown-link">All Templates</a>',$=m(),y=u("div"),y.innerHTML='<a href="/templates-featured" class="link-small category-dropdown-link">Featured Tempaltes</a>',b=m(),_=u("div"),v=m();for(let t=0;t<C.length;t+=1)C[t].c();g(r,"type","input"),g(r,"class","sidebar__input w-input"),g(r,"placeholder","Search"),g(h,"role","listitem"),g(h,"class","sidebar__item w-dyn-item"),g(y,"role","listitem"),g(y,"class","sidebar__item w-dyn-item"),g(_,"class","sidebar__divider"),g(p,"role","list"),g(p,"class","w-dyn-items"),g(f,"class","sidebar__categories w-dyn-list")},m(t,o){i(t,n,o),l(n,r),i(t,a,o),i(t,s,o),i(t,d,o),i(t,f,o),l(f,p),l(p,h),l(p,$),l(p,y),l(p,b),l(p,_),l(p,v);for(let t=0;t<C.length;t+=1)C[t].m(p,null);var c,u,m,g;w||(c=r,u="input",m=e[1],c.addEventListener(u,m,g),x=()=>c.removeEventListener(u,m,g),w=!0)},p(t,[e]){if(1&e){let n;for(O=t[0],n=0;n<O.length;n+=1){const r=mt(t,O,n);C[n]?C[n].p(r,e):(C[n]=ft(r),C[n].c(),C[n].m(p,null))}for(;n<C.length;n+=1)C[n].d(1);C.length=O.length}},i:t,o:t,d(t){t&&o(n),t&&o(a),t&&o(s),t&&o(d),t&&o(f),c(C,t),w=!1,x()}}}function pt(t,e,n){let{categories:r}=e;P.subscribe((t=>{}));return t.$$set=t=>{"categories"in t&&n(0,r=t.categories)},[r,t=>{P.set(t.currentTarget.value)}]}const ht=(()=>{const t=window.location.pathname;return t.startsWith("/category/")?t.replace("/category/","").split("/")[0]:null})(),$t="/templates-featured"===window.location.pathname;var yt=new class extends q{constructor(t){super(),U(this,t,ct,ot,s,{items:6,isFeaturedList:0,activeCategory:7,categories:1})}}({target:document.getElementById("ss-content"),props:{items:ut,activeCategory:ht,isFeaturedList:$t,categories:dt}});return new class extends q{constructor(t){super(),U(this,t,pt,gt,s,{categories:0})}}({target:document.getElementById("ss-search"),props:{categories:dt}}),yt}();
//# sourceMappingURL=bundle.js.map
