var Ce=Object.defineProperty,be=Object.defineProperties;var Pe=Object.getOwnPropertyDescriptors;var oe=Object.getOwnPropertySymbols;var ke=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable;var Y=(o,e,i)=>e in o?Ce(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i,j=(o,e)=>{for(var i in e||(e={}))ke.call(e,i)&&Y(o,i,e[i]);if(oe)for(var i of oe(e))xe.call(e,i)&&Y(o,i,e[i]);return o},re=(o,e)=>be(o,Pe(e));var le=(o,e,i)=>(Y(o,typeof e!="symbol"?e+"":e,i),i);import{b as Ae,o as m,c as w,a as l,m as $e,t as q,T as Le,r as ee,d as H,e as P,w as ae,f as N,g as ue,p as de,h as ce,i as K,j as F,v as G,u as x,k as Te,l as Ie,n as pe,q as Ee,s as Me,A as Ne,x as E,y as te,z as Z,B as Se,F as Oe,C as Ve,D as We,E as Be,G as qe}from"./vendor.e3939f1b.js";const Re=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}};Re();window.global===void 0&&(window.global=window,window.Buffer=Ae.Buffer);const R=document.createElement("link");R.setAttribute("rel","favicon icon");const ie=o=>{R.remove(),o.matches?R.setAttribute("href","plugLightTheme.svg"):R.setAttribute("href","plug.svg"),document.head.appendChild(R)};if(window.matchMedia){const o=window.matchMedia("(prefers-color-scheme: light)");o.addEventListener("change",ie),ie(o)}else ie({matches:!1});var S=(o,e)=>{for(const[i,t]of e)o[i]=t;return o};const ze={},Ue={width:"100%",height:"100%",viewBox:"0 0 2330 2330",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},De=l("path",{d:"M1164.58,0C1807.33,0 2329.16,521.832 2329.16,1164.58C2329.16,1807.33 1807.33,2329.16 1164.58,2329.16C521.829,2329.16 0,1807.33 0,1164.58C0,521.829 521.832,0 1164.58,0ZM1164.58,12.31C1800.54,12.31 2316.85,528.626 2316.85,1164.58C2316.85,1800.54 1800.53,2316.85 1164.58,2316.85C528.623,2316.85 12.31,1800.53 12.31,1164.58C12.31,528.623 528.626,12.31 1164.58,12.31ZM1164.58,169.088C615.151,169.088 169.085,615.154 169.085,1164.58C169.085,1714.01 615.151,2160.08 1164.58,2160.08C1714.01,2160.08 2160.08,1714.01 2160.08,1164.58C2160.08,615.154 1714.01,169.088 1164.58,169.088ZM1164.58,181.398C1707.22,181.398 2147.77,621.948 2147.77,1164.58C2147.77,1707.22 1707.22,2147.77 1164.58,2147.77C621.945,2147.77 181.395,1707.22 181.395,1164.58C181.395,621.948 621.945,181.398 1164.58,181.398Z",style:{fill:"white"}},null,-1),He=l("path",{d:"M1342.38,1536.38C1338.03,1525.56 1333.68,1514.74 1329.34,1501.75C1324.99,1488.76 1322.82,1473.61 1320.64,1460.63C1309.77,1473.61 1294.55,1484.43 1279.33,1497.42C1264.11,1508.24 1246.72,1519.06 1227.15,1527.72C1209.76,1536.38 1188.02,1542.88 1166.28,1547.2C1144.54,1551.53 1120.62,1555.86 1094.54,1555.86C1053.23,1555.86 1014.09,1549.37 977.132,1538.55C942.348,1525.56 911.913,1510.41 885.823,1486.6C859.734,1464.96 840.165,1438.98 827.124,1408.68C811.905,1378.38 805.38,1345.91 805.38,1309.12C805.38,1222.55 837.994,1155.45 903.214,1107.84C968.437,1060.22 1066.27,1036.41 1194.54,1036.41L1314.12,1036.41L1314.12,986.633C1314.12,947.673 1301.07,915.205 1274.98,893.563C1248.9,869.755 1211.94,858.934 1161.93,858.934C1118.45,858.934 1088.01,867.59 1066.27,887.072C1046.7,904.384 1035.84,930.357 1035.84,960.66L822.775,960.66C822.775,926.027 831.47,891.398 846.689,861.099C861.909,828.631 885.823,802.658 914.088,778.85C944.522,755.042 981.482,735.565 1022.79,722.578C1066.27,707.427 1116.27,700.936 1170.63,700.936C1220.63,700.936 1266.29,707.427 1309.77,718.248C1353.25,731.235 1390.21,748.551 1422.82,772.359C1455.43,796.167 1479.35,826.47 1496.74,863.264C1514.13,900.058 1522.83,941.178 1522.83,988.794L1522.83,1341.59C1522.83,1384.87 1525,1421.67 1531.53,1451.97C1538.05,1480.11 1544.57,1506.08 1555.44,1525.56L1563.77,1538.55L1343.33,1538.55L1342.38,1536.38ZM1541.9,1526.24L1351.58,1526.24C1348.05,1517.42 1344.53,1508.36 1341.01,1497.84C1336.86,1485.45 1334.86,1470.98 1332.78,1458.59C1331.99,1453.85 1328.51,1450.01 1323.87,1448.75C1319.23,1447.49 1314.29,1449.04 1311.2,1452.73C1300.83,1465.11 1286.28,1475.36 1271.76,1487.7C1257.27,1497.97 1240.75,1508.24 1222.17,1516.47C1222,1516.54 1221.83,1516.62 1221.67,1516.7C1205.16,1524.92 1184.51,1531.02 1163.88,1535.13C1163.88,1535.13 1163.87,1535.13 1163.87,1535.13C1142.86,1539.31 1119.75,1543.55 1094.54,1543.55C1054.6,1543.55 1016.76,1537.28 981.019,1526.86C947.957,1514.48 918.944,1500.16 894.121,1477.51C893.977,1477.38 893.831,1477.25 893.682,1477.12C869.132,1456.76 850.703,1432.33 838.431,1403.82C838.335,1403.59 838.233,1403.37 838.124,1403.16C823.753,1374.55 817.69,1343.86 817.69,1309.12C817.69,1226.86 848.502,1163.02 910.472,1117.78C974.04,1071.37 1069.53,1048.72 1194.54,1048.72C1194.54,1048.72 1314.12,1048.72 1314.12,1048.72C1320.91,1048.72 1326.43,1043.21 1326.43,1036.41L1326.43,986.633C1326.43,943.746 1311.71,908.154 1283.06,884.271C1255.04,858.813 1215.56,846.624 1161.93,846.624C1114.64,846.624 1081.74,856.701 1058.08,877.879C1038.75,894.998 1026.74,919.532 1024.08,948.35C1024.08,948.35 879.661,948.35 835.47,948.35C837.247,919.802 845.118,891.651 857.689,866.624C857.739,866.525 857.788,866.425 857.835,866.324C872.268,835.534 895.058,810.997 921.845,788.411C951.155,765.518 986.738,746.816 1026.48,734.321C1026.6,734.283 1026.72,734.244 1026.84,734.202C1069.12,719.468 1117.77,713.246 1170.63,713.246C1219.46,713.246 1264.05,719.576 1306.52,730.123C1348.44,742.67 1384.1,759.335 1415.57,782.301C1446.48,804.875 1469.12,833.638 1485.61,868.525C1502.27,903.772 1510.52,943.18 1510.52,988.794L1510.52,1341.59C1510.52,1385.89 1512.82,1423.55 1519.49,1454.56C1519.51,1454.62 1519.52,1454.69 1519.53,1454.75C1525.77,1481.65 1532.15,1506.6 1541.9,1526.24ZM1140.19,1399.35C1163.26,1399.35 1184.03,1396.94 1202.54,1390.16C1220.79,1385.56 1239.01,1378.69 1254.98,1369.6C1271.23,1360.36 1285.11,1351.04 1296.71,1339.49C1308.37,1327.89 1317.67,1316.26 1324.66,1304.65C1325.82,1302.73 1326.43,1300.54 1326.43,1298.3L1326.43,1157.62C1326.43,1150.82 1320.91,1145.31 1314.12,1145.31L1205.41,1145.31C1171.56,1145.31 1142.22,1149.82 1117.4,1156.56C1091.69,1163.54 1070.72,1173.05 1056.59,1184.65C1039.57,1196.84 1027.44,1211.52 1020.06,1230.93C1013,1247.43 1008.31,1266.29 1008.31,1287.48C1008.31,1318.92 1020.33,1345.58 1042.12,1367.38C1061.4,1388.75 1094.65,1399.35 1140.19,1399.35ZM1140.19,1387.04C1161.93,1387.04 1181.5,1384.87 1198.89,1378.38C1216.28,1374.05 1233.68,1367.56 1248.9,1358.9C1264.11,1350.24 1277.16,1341.59 1288.03,1330.77C1298.9,1319.94 1307.6,1309.12 1314.12,1298.3L1314.12,1157.62L1205.41,1157.62C1172.8,1157.62 1144.54,1161.94 1120.62,1168.44C1096.71,1174.93 1077.14,1183.59 1064.1,1194.41C1048.88,1205.23 1038.01,1218.22 1031.49,1235.53C1024.96,1250.68 1020.62,1268 1020.62,1287.48C1020.62,1315.62 1031.49,1339.42 1051.06,1358.9C1068.44,1378.38 1098.88,1387.04 1140.19,1387.04Z",style:{fill:"white"}},null,-1),Ke=[De,He];function Fe(o,e){return m(),w("svg",Ue,Ke)}var Ge=S(ze,[["render",Fe]]);class he{constructor(){this.mittInstance=$e()}emit(e,i){this.mittInstance.emit(e,i)}on(e,i){this.mittInstance.on(e,i)}off(e,i){this.mittInstance.off(e,i)}once(e,i){return new Promise(t=>{const n=s=>{this.off(e,n),t(s),i&&i(s)};this.on(e,n)})}}const fe="400",_e="600";class Ze extends he{constructor(e,i){super();this._iframe={},this._showIframe=!1,this._popup={},this._usePopup=!0,this._requirePopup=!1,this._keepPopup=!1,this._promiseController=[],this._pending=[],this.listener=n=>{var s,a,v,k,y,h;if(n.source!==this._popup.window&&n.source!==((s=this._iframe)===null||s===void 0?void 0:s.window)||n.origin!==((a=this._url)===null||a===void 0?void 0:a.origin)||typeof n.data!="object")return;const{method:f,params:C,id:$,result:M,error:d,session:r}=n.data;if(console.info(`WalletConnector:${n.source===this._popup.window?"popup":"iframe"}`,n.data),$!=null){if(typeof $!="number"&&typeof $!="string"||typeof $=="string"&&isNaN(parseInt($)))return;if(!this._promiseController[+$])throw"received result to nonexistent request";this._pending=this._pending.filter(b=>b!=$),d!=null&&this._promiseController[+$].reject(d),M!=null&&this._promiseController[+$].resolve(M);return}if(typeof f!="string")return;if(f==="ready"){n.source===this._popup.window&&((k=(v=this._popup).resolve)===null||k===void 0||k.call(v)),n.source===this._iframe.window&&((h=(y=this._iframe).resolve)===null||h===void 0||h.call(y));return}if(f==="change")return;if(f==="showIframe"){if(typeof C!="boolean")return;this.showIframe=C}if(f==="usePopup"){if(typeof C!="boolean")return;this.setUsePopup(C)}if(f==="keepPopup"){if(typeof C!="boolean")return;this.setRequirePopup(C)}const u={method:f,params:C,session:r};if(!q.is(u,b=>{function L(p){return typeof p!="string"?{}:null}function D(){return null}function Q(p){return p!==void 0?{}:null}function B(p){return typeof p!="number"?{}:null}function c(p){var I=[Q,L,B];for(const ye of I){var we=ye(p);if(!we)return null}return{}}function _(p){if(typeof p!="object"||p===null||Array.isArray(p))return{};if("method"in p){var I=L(p.method);if(I)return I}else return{};if("params"in p){var I=D(p.params);if(I)return I}else return{};if("session"in p){var I=c(p.session);if(I)return I}return null}return _(b)}))return console.warn("dropped");this.emit("message",u)},this._iframeParentNode=i==null?void 0:i.iframeParentNode,this._url=e;const t={origin:window.location.origin,session:Math.random().toString().slice(2)};(i==null?void 0:i.name)&&(t.name=i.name),(i==null?void 0:i.logo)&&(t.logo=i.logo),this._url.hash=new URLSearchParams(t).toString(),window.addEventListener("message",this.listener)}get url(){var e;return(e=this._url)===null||e===void 0?void 0:e.origin}get showIframe(){return this._showIframe}set showIframe(e){e!==this._showIframe&&(this._showIframe=e,this.deliverMessage({method:"showIframe",params:e}),this.emit("builtin",{showIframe:e}),!!this._iframeNode&&(this._iframeParentNode||(this._iframeNode.style.opacity=e?"1":"0",e?this._iframeNode.style.removeProperty("pointer-events"):this._iframeNode.style.pointerEvents="none")))}get usePopup(){return this._usePopup}setUsePopup(e){e!==this._usePopup&&(this._usePopup=e,this.emit("builtin",{usePopup:e}))}get requirePopup(){return this._requirePopup}setRequirePopup(e){e!==this._requirePopup&&(this._requirePopup=e,this.emit("builtin",{requirePopup:e}))}get keepPopup(){return this._keepPopup}set keepPopup(e){this._keepPopup=e,this.emit("builtin",{keepPopup:e}),e||this.closePopup(),e&&this.openPopup(!0)}destructor(e){this.closeIframe(),this.closePopup(!0),window.removeEventListener("message",this.listener)}postMessage(e,i){const t=this._promiseController.length,n=new Promise((s,a)=>this._promiseController.push({resolve:s,reject:a})).finally(()=>this.completeRequest());return this.deliverMessage(Object.assign(Object.assign({},e),{id:t})),(i==null?void 0:i.timeout)&&setTimeout(()=>this._promiseController[t].reject("timeout"),i.timeout),n}openIframe(){if(this._iframeEl)return;this._iframeNode=document.createElement("div"),this._iframeEl=document.createElement("iframe"),this._iframeEl.src=this._url.toString(),this._iframeEl.allow="usb",this._iframeEl.width=fe,this._iframeEl.height=_e,this._iframeEl.style.border="none",this._iframeParentNode||(this._iframeEl.style.borderRadius="8px",this._iframeEl.style.maxWidth="100%",this._iframeEl.style.maxHeight="100%",this._iframeNode.style.opacity="0",this._iframeNode.style.pointerEvents="none",this._iframeNode.style.position="fixed",this._iframeNode.style.inset="0",this._iframeNode.style.zIndex="1000000",this._iframeNode.style.display="flex",this._iframeNode.style.alignItems="center",this._iframeNode.style.justifyContent="center",this._iframeNode.style.transition="0.2s opacity ease",this._iframeNode.style.background="#00000088"),this._iframeNode.appendChild(this._iframeEl);const e=new Promise((t,n)=>this._iframe={resolve:t,reject:n});this._iframe.promise=e;const i=()=>{var t;this._iframeParentNode?this._iframeParentNode.appendChild(this._iframeNode):document.body.appendChild(this._iframeNode),this._iframe.window=(t=this._iframeEl)===null||t===void 0?void 0:t.contentWindow};document.readyState==="complete"||document.readyState==="interactive"?i():document.addEventListener("DOMContentLoaded",i)}closeIframe(){var e,i,t,n;(e=this._iframeEl)===null||e===void 0||e.setAttribute("src","about:blank"),(i=this._iframeNode)===null||i===void 0||i.remove(),this._iframeNode=void 0,this._iframeEl=void 0,(n=(t=this._iframe).reject)===null||n===void 0||n.call(t),this._iframe={}}openPopup(e){if(this._popup.window&&!this._popup.window.closed){this._popup.window.focus();return}if(!this.usePopup&&!e)return;window.name="parent";const i=window.open(this._url.toString(),"_blank",`location,resizable,scrollbars,width=${fe},height=${_e}`),t=new Promise((s,a)=>this._popup={window:i,resolve:s,reject:a});this._popup.promise=t;const n=setInterval(()=>{this._popup.window&&!this._popup.window.closed||(this.keepPopup&&(this.keepPopup=!1),clearInterval(n))},200)}closePopup(e){var i,t,n;!this._popup.window||((i=this._popup.window)===null||i===void 0?void 0:i.closed)||(this.keepPopup||this.requirePopup)&&!e||(this._popup.window.location.href="about:blank",this._popup.window.close(),(n=(t=this._popup).reject)===null||n===void 0||n.call(t),this._popup={})}completeRequest(){setTimeout(()=>{this._pending.length||(this.closePopup(),this.showIframe=!1)},100)}deliverMessage(e,i){var t,n;if(!this._url)throw"Missing URL";console.info("WalletConnector:post",e);const s=Object.assign(Object.assign({},e),{jsonrpc:"2.0"});s.id!=null&&this._pending.push(s.id),this.openIframe(),this._iframe.promise=(t=this._iframe.promise)===null||t===void 0?void 0:t.then(()=>{var a;return(a=this._iframe.window)===null||a===void 0?void 0:a.postMessage(s,this._url.origin,(i==null?void 0:i.transfer)?[s]:void 0)}).catch(()=>{}),this.openPopup(),this._popup.promise=(n=this._popup.promise)===null||n===void 0?void 0:n.then(()=>{var a;return(a=this._popup.window)===null||a===void 0?void 0:a.postMessage(s,this._url.origin,(i==null?void 0:i.transfer)?[s]:void 0)}).catch(()=>{})}}var ne=globalThis&&globalThis.__awaiter||function(o,e,i,t){function n(s){return s instanceof i?s:new i(function(a){a(s)})}return new(i||(i=Promise))(function(s,a){function v(h){try{y(t.next(h))}catch(f){a(f)}}function k(h){try{y(t.throw(h))}catch(f){a(f)}}function y(h){h.done?s(h.value):n(h.value).then(v,k)}y((t=t.apply(o,e||[])).next())})};class T extends he{constructor(e,i,t){super();this._session=0,this._listener=n=>{const{method:s,params:a,session:v}=n;if(!(v!=null&&this._session!=v)&&!(!v&&this._session)){if(s==="connect"){if(!q.is(a,k=>{function y(h){return typeof h!="string"?{}:null}return y(k)}))return;this.setAddress(a)}s==="disconnect"&&this.disconnectEvent(!1)}},this._protocolInfo=e,this._appInfo=i,this._emitterPassthrough=n=>{const s=Object.entries(n)[0];this.emit(s[0],s[1])},t&&this.setUrl(t)}get address(){return this._address}setAddress(e){e&&e===this.address||(this._address=e,e!=null?this.emit("connect",e):this.emit("disconnect",e),this.emit("change",e))}get connected(){return this._address!=null}get url(){var e;return(e=this._bridge)===null||e===void 0?void 0:e.url}get showIframe(){var e;return((e=this._bridge)===null||e===void 0?void 0:e.showIframe)||!1}get usePopup(){var e;return((e=this._bridge)===null||e===void 0?void 0:e.usePopup)||!1}get requirePopup(){var e;return((e=this._bridge)===null||e===void 0?void 0:e.requirePopup)||!1}get keepPopup(){var e;return((e=this._bridge)===null||e===void 0?void 0:e.keepPopup)||!1}set keepPopup(e){this._bridge&&(this._bridge.keepPopup=e)}setUrl(e){var i;const t=this._bridge,n=typeof e=="string"?new URL(e.includes("://")?e:"https://"+e):e;if(this._url=n,((i=this._bridge)===null||i===void 0?void 0:i.url)!==n.origin){if(this.disconnect(),!T._bridges[n.origin])this._bridge=new Ze(n,this._appInfo),T._bridges[n.origin]={bridge:this._bridge,sessions:[]};else{this._bridge=T._bridges[n.origin].bridge;const s=T._bridges[n.origin].sessions;for(let a=0;a<=s.length;a++)if(s.indexOf(a)<0){this._session=a;break}}T._bridges[n.origin].sessions.push(this._session),this._bridge.on("message",this._listener),this._bridge.on("builtin",this._emitterPassthrough),this._bridge.showIframe!==(t==null?void 0:t.showIframe)&&this.emit("showIframe",this._bridge.showIframe),this._bridge.usePopup!==(t==null?void 0:t.usePopup)&&this.emit("usePopup",this._bridge.usePopup),this._bridge.requirePopup!==(t==null?void 0:t.requirePopup)&&this.emit("requirePopup",this._bridge.requirePopup),this._bridge.keepPopup!==(t==null?void 0:t.keepPopup)&&this.emit("keepPopup",this._bridge.keepPopup)}}connect(e){return ne(this,void 0,void 0,function*(){this._bridge||this._url&&this.setUrl(this._url);const i=new Promise((t,n)=>{this.once("change",s=>s?t(s):n())}).finally(()=>{var t;return(t=this._bridge)===null||t===void 0?void 0:t.completeRequest()});return this._bridge.deliverMessage({method:"connect",params:e}),i})}disconnect(e){return ne(this,void 0,void 0,function*(){return this.disconnectEvent(!0,e)})}disconnectEvent(e,i){return ne(this,void 0,void 0,function*(){if(!this._bridge)return;const t=this._bridge,n=this._session,s=t.url;if(this.setAddress(void 0),this._bridge=void 0,this._session=0,e)try{yield t.postMessage(Object.assign(Object.assign({method:"disconnect",params:[i]},this._protocolInfo),{session:n}))}catch{console.warn("disconnect request failed")}t.off("message",this._listener),t.off("builtin",this._emitterPassthrough),T._bridges[s].sessions=T._bridges[s].sessions.filter(a=>a!=n),setTimeout(()=>{T._bridges[s].sessions.length||(T._bridges[s].bridge.destructor(),delete T._bridges[s])},100)})}postMessage(e,i,t){return new Promise((n,s)=>{if(!this._bridge)return s("URL missing");this.once("disconnect",s),this._bridge.postMessage(Object.assign(Object.assign({method:e,params:i},this._protocolInfo),{session:this._session}),t).then(n)})}}T._bridges={};let ve;const V=[],z={},se={};function Je(o){!o.namespaces||(V.find(e=>e===o)||V.push(o),J())}function Xe(o){if(!V.find(e=>e===o))return J();V.splice(V.indexOf(o),1);for(const e in o.namespaces)z[e]===o&&(window[e]=se[e],delete se[e],delete z[e]);J()}function J(){for(const o of V)for(const e in o.namespaces)z[e]&&z[e]!==o||window[e]!==o.namespaces[e]&&(se[e]=window[e],window[e]=o.namespaces[e],z[e]=o);window.clearInterval(ve),V.length&&(ve=setInterval(()=>J(),1e4))}var U=globalThis&&globalThis.__awaiter||function(o,e,i,t){function n(s){return s instanceof i?s:new i(function(a){a(s)})}return new(i||(i=Promise))(function(s,a){function v(h){try{y(t.next(h))}catch(f){a(f)}}function k(h){try{y(t.throw(h))}catch(f){a(f)}}function y(h){h.done?s(h.value):n(h.value).then(v,k)}y((t=t.apply(o,e||[])).next())})},Qe=globalThis&&globalThis.__rest||function(o,e){var i={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(i[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(o);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(o,t[n])&&(i[t[n]]=o[t[n]]);return i};class Ye extends T{constructor(e,i){super({protocol:"arweave",version:"1.0.0"},Object.assign({},e),i);this.namespaces={arweaveWallet:{connect:()=>this.address||this.connect(),disconnect:()=>this.disconnect(),getActiveAddress:()=>this.address,getActivePublicKey:()=>this.getPublicKey(),getAllAddresses:()=>{throw"not implemented"},getWalletNames:()=>{throw"not implemented"},sign:(t,n)=>this.signTransaction(t,n),encrypt:()=>{throw"not implemented"},decrypt:(t,n)=>this.decrypt(t,n),signature:(t,n)=>this.sign(t,n),getPermissions:()=>[],getArweaveConfig:()=>this.getArweaveConfig()}},this.on("connect",()=>Je(this)),this.on("disconnect",()=>Xe(this))}getPublicKey(){return U(this,void 0,void 0,function*(){const e=yield this.postMessage("getPublicKey");if(!q.is(e,i=>{function t(n){return typeof n!="string"?{}:null}return t(i)}))throw"TypeError";return e})}getArweaveConfig(){return U(this,void 0,void 0,function*(){const e=yield this.postMessage("getArweaveConfig");if(!q.is(e,i=>{function t(r){return r!==void 0?{}:null}function n(r){return typeof r!="number"?{}:null}function s(r){var u=[t,n];for(const L of u){var b=L(r);if(!b)return null}return{}}function a(r){return typeof r!="string"?{}:null}function v(r){var u=[t,a];for(const L of u){var b=L(r);if(!b)return null}return{}}function k(r){var u=[t,a,n];for(const L of u){var b=L(r);if(!b)return null}return{}}function y(r){return r!==!1?{}:null}function h(r){return r!==!0?{}:null}function f(r){var u=[t,y,h];for(const L of u){var b=L(r);if(!b)return null}return{}}function C(r){if(typeof r!="object"||r===null||Array.isArray(r))return{};if("timeout"in r){var u=s(r.timeout);if(u)return u}if("protocol"in r){var u=v(r.protocol);if(u)return u}if("host"in r){var u=v(r.host);if(u)return u}if("port"in r){var u=k(r.port);if(u)return u}if("logging"in r){var u=f(r.logging);if(u)return u}return null}function $(){return null}function M(r){if(typeof r!="object"||r===null||Array.isArray(r))return{};if("logger"in r){var u=$(r.logger);if(u)return u}return null}function d(r){var u=[C,M];for(const L of u){var b=L(r);if(b)return b}return null}return d(i)}))throw"TypeError";return delete e.logger,e})}signTransaction(e,i){var t;return U(this,void 0,void 0,function*(){const n=Qe(e,["data","chunks"]),s=yield this.postMessage("signTransaction",[n,i]);if(!q.is(s,a=>{function v(d){return typeof d!="string"?{}:null}function k(d){return d!==void 0?{}:null}function y(d){return d!==null?{}:null}function h(d){var r=[k,y,v];for(const b of r){var u=b(d);if(!u)return null}return{}}function f(d){if(typeof d!="object"||d===null||Array.isArray(d))return{};if("name"in d){var r=v(d.name);if(r)return r}else return{};if("value"in d){var r=v(d.value);if(r)return r}else return{};return null}function C(d){if(!Array.isArray(d))return{};for(let u=0;u<d.length;u++){var r=f(d[u]);if(r)return r}return null}function $(d){var r=[k,y,C];for(const b of r){var u=b(d);if(!u)return null}return{}}function M(d){if(typeof d!="object"||d===null||Array.isArray(d))return{};if("id"in d){var r=v(d.id);if(r)return r}else return{};if("owner"in d){var r=h(d.owner);if(r)return r}if("tags"in d){var r=$(d.tags);if(r)return r}if("signature"in d){var r=v(d.signature);if(r)return r}else return{};if("reward"in d){var r=h(d.reward);if(r)return r}return null}return M(a)}))throw"TypeError";return e.setSignature({id:s.id,owner:s.owner||e.owner,tags:(t=s.tags)===null||t===void 0?void 0:t.map(a=>new Le(a.name,a.value,!0)),signature:s.signature,reward:s.reward||void 0}),e})}sign(e,i){return U(this,void 0,void 0,function*(){const t=yield this.postMessage("sign",[e,i]);if(!ArrayBuffer.isView(t))throw"TypeError";const n=e.constructor;return new n(t.buffer)})}decrypt(e,i){return U(this,void 0,void 0,function*(){const t=yield this.postMessage("decrypt",[e,i]);if(!ArrayBuffer.isView(t))throw"TypeError";const n=e.constructor;return new n(t.buffer)})}}class je extends Ye{constructor(e,i){super(e,i);le(this,"state",ee({url:"arweave.app",address:void 0,keepPopup:!1,error:""}));this.on("connect",t=>{this.state.address=t,this.state.url=g.url}),this.on("disconnect",()=>this.state.address=void 0),this.on("keepPopup",t=>this.state.keepPopup=t)}get url(){return this.state.url}get address(){return this.state.address}get keepPopup(){return this.state.keepPopup}set keepPopup(e){super.keepPopup=e}get error(){return this.state.error}set error(e){this.state.error=e}}const g=new je({name:"Connector Example",logo:`${location.href}placeholder.svg`});const et=H({props:["icon"]}),O=o=>(de("data-v-75541e82"),o=o(),ce(),o),tt={class:"img-container"},it={key:0,xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 24 24",viewBox:"0 0 24 24",fill:"currentColor"},nt=O(()=>l("rect",{fill:"none",height:"24",width:"24"},null,-1)),st=O(()=>l("path",{d:"M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z"},null,-1)),ot=[nt,st],rt={key:1,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},lt=O(()=>l("path",{d:"M0 0h24v24H0z",fill:"none"},null,-1)),at=O(()=>l("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"},null,-1)),ut=[lt,at],dt={key:2,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},ct=O(()=>l("path",{d:"M0 0h24v24H0z",fill:"none"},null,-1)),pt=O(()=>l("path",{d:"M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z"},null,-1)),ht=[ct,pt],ft={key:3,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},_t=O(()=>l("path",{d:"M0 0h24v24H0V0z",fill:"none"},null,-1)),vt=O(()=>l("path",{d:"M18 14.49V9c0-1-1.01-2.01-2-2V3h-2v4h-4V3H8v2.48l9.51 9.5.49-.49zm-1.76 1.77L7.2 7.2l-.01.01L3.98 4 2.71 5.25l3.36 3.36C6.04 8.74 6 8.87 6 9v5.48L9.5 18v3h5v-3l.48-.48L19.45 22l1.26-1.28-4.47-4.46z"},null,-1)),gt=[_t,vt];function mt(o,e,i,t,n,s){return m(),w("button",null,[l("div",tt,[P(ue,{name:"fade"},{default:ae(()=>[o.icon==="close"?(m(),w("svg",it,ot)):o.icon==="launch"?(m(),w("svg",rt,ut)):o.icon==="plug"?(m(),w("svg",dt,ht)):o.icon==="unplug"?(m(),w("svg",ft,gt)):N("",!0)]),_:1})])])}var ge=S(et,[["render",mt],["__scopeId","data-v-75541e82"]]);const wt={class:"url-input"},yt=["placeholder","onKeydown"],Ct={class:"actions"},bt=H({props:["modelValue","icon","placeholder","actions","autocomplete","mask","disabled","id"],emits:["update:modelValue"],setup(o,{emit:e}){const i=o,t=K({get(){return i.modelValue},set(h){e("update:modelValue",h)}}),n=ee({loading:!1}),s=()=>{g.setUrl(t.value||g.url),g.connect(),n.loading=!0,g.once("change",()=>n.loading=!1)},a=()=>g.disconnect(),v=()=>g.keepPopup=!g.keepPopup,k=K(()=>g.keepPopup?"close":"launch"),y=K(()=>g.address?"unplug":"plug");return(h,f)=>(m(),w("div",wt,[F(l("input",{class:"url","onUpdate:modelValue":f[0]||(f[0]=C=>Te(t)?t.value=C:null),placeholder:x(g).url,onKeydown:Ie(s,["enter"])},null,40,yt),[[G,x(t)]]),l("div",Ct,[P(ue,{name:"fade"},{default:ae(()=>[x(g).address?(m(),Ee(ge,{key:0,class:pe(["action",{dim:!x(g).keepPopup}]),icon:x(k),onClick:v},null,8,["icon","class"])):N("",!0)]),_:1}),P(ge,{class:pe(["action",{dim:x(n).loading}]),icon:x(y),onClick:f[1]||(f[1]=C=>x(g).address?a():s())},null,8,["icon","class"])])]))}});var Pt=S(bt,[["__scopeId","data-v-a4af76b8"]]);const kt={class:"code-box"},xt=H({props:["code"],setup(o){return(e,i)=>{const t=Me("highlightjs");return m(),w("div",kt,[P(t,{class:"box",code:o.code},null,8,["code"])])}}});var W=S(xt,[["__scopeId","data-v-0b38042f"]]);const At={},$t={fill:"currentColor",height:"2em",width:"2em","aria-hidden":"true",viewBox:"0 0 16 16",version:"1.1","data-view-component":"true",class:"octicon octicon-mark-github v-align-middle"},Lt=l("path",{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"},null,-1),Tt=[Lt];function It(o,e){return m(),w("svg",$t,Tt)}var Et=S(At,[["render",It]]);const Mt={},Nt={xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 24 24",height:"2em",viewBox:"0 0 24 24",width:"2em",fill:"currentColor"},St=l("g",null,[l("rect",{fill:"none",height:"24",width:"24"}),l("path",{d:"M16.54,11L13,7.46l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L16.54,11z M11,7H2v2h9V7z M21,13.41L19.59,12L17,14.59 L14.41,12L13,13.41L15.59,16L13,18.59L14.41,20L17,17.41L19.59,20L21,18.59L18.41,16L21,13.41z M11,15H2v2h9V15z"})],-1),Ot=[St];function Vt(o,e){return m(),w("svg",Nt,Ot)}var X=S(Mt,[["render",Vt]]);const Wt={},Bt={xmlns:"http://www.w3.org/2000/svg",height:"2em",viewBox:"0 0 24 24",width:"2em",fill:"currentColor"},qt=l("path",{d:"M0 0h24v24H0z",fill:"none"},null,-1),Rt=l("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"},null,-1),zt=[qt,Rt];function Ut(o,e){return m(),w("svg",Bt,zt)}var Dt=S(Wt,[["render",Ut]]);const A=o=>(de("data-v-df84e52e"),o=o(),ce(),o),Ht={class:"app"},Kt=A(()=>l("div",{style:{"text-align":"justify","max-width":"800px"}},"The connector is a final link to permanent account managers. Users are not required to install anything and are not restricted to specific device types or operating systems. The system relies on no 3rd party and, once implemented, enables any web page to connect to any wallet provider respecting the standard. This module effectively and permanently provides a communication protocol between decentralized applications hosted on arweave or normal web pages. It leverages web technologies to setup a bridge working entirely on the user device, and even offline if the web apps support it. The connector module itself has no visual element included. This page is an example on how it can be integrated.",-1)),Ft={class:"button",href:"https://github.com/jfbeats/ArweaveWalletConnector"},Gt=A(()=>l("span",null,"View on Github",-1)),Zt=A(()=>l("div",null,null,-1)),Jt={key:0,id:"s1"},Xt={class:"ellipsis"},Qt={style:{display:"flex","align-items":"center"}},Yt=A(()=>l("span",null,"Address :",-1)),jt=A(()=>l("div",{style:{display:"inline-block",width:"0.5em"}},null,-1)),ei=A(()=>l("div",{style:{height:"0.5em"}},null,-1)),ti={style:{display:"flex","align-items":"center"}},ii={key:0},ni={key:1},si=A(()=>l("div",{style:{display:"inline-block",width:"0.5em"}},null,-1)),oi=A(()=>l("div",{style:{display:"inline-block",width:"0.5em"}},null,-1)),ri=A(()=>l("span",null,"AR",-1)),li=A(()=>l("div",{style:{height:"0.5em"}},null,-1)),ai={style:{display:"flex","align-items":"center"}},ui=A(()=>l("span",null,"Message :",-1)),di=A(()=>l("div",{style:{display:"inline-block",width:"0.5em"}},null,-1)),ci={class:"row"},pi=A(()=>l("span",null,"Sign Transaction",-1)),hi=A(()=>l("div",null,null,-1)),fi={key:1,id:"s2"},_i={class:"row"},vi={key:0},gi={key:1},mi={key:1},wi={class:"row"},yi=A(()=>l("span",null,"Try out other methods",-1)),Ci=A(()=>l("div",null,null,-1)),bi={key:2,id:"s3"},Pi={class:"row"},ki={class:"row"},xi=A(()=>l("span",null,"Get Arweave Config",-1)),Ai=H({setup(o){const e=Ne.init({host:"arweave.net",port:443,protocol:"https"});g.on("connect",()=>u.value=1),g.on("disconnect",()=>u.value=0);const i=E("0.1");e.transactions.getPrice(1024*1024*512).then(c=>i.value=L(e.ar.winstonToAr(c))),te(i,c=>n.quantity=e.ar.arToWinston(c));const t=E("hello world");te(t,c=>n.data=c);const n=ee({target:"TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE",quantity:e.ar.arToWinston(i.value),data:t.value}),s=E(null),a=E(null),v=E(null),k=async()=>{s.value=null,a.value=null,v.value=null,u.value=1;try{const c=await e.createTransaction(j({},n));c.addTag("App-Name",+n.quantity>0&&n.target==="TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE"?"Donating to the dev":"Trying out the connector"),c.addTag("Tag-1","transaction tags are all displayed here"),c.addTag("Tag-2","this is a real transaction"),c.addTag("Tag-3","you can sign it here and not send it on the next page"),await g.signTransaction(c),s.value=c,u.value=2}catch(c){console.error(c),g.error=c,a.value=c,u.value=2}},y=async()=>{if(!s.value)return;const c=await e.transactions.getUploader(s.value);for(;!c.isComplete;)try{await c.uploadChunk()}catch(_){console.error(_)}v.value=c.lastResponseStatus},h=E(!1),f=E("You also have access to decryption and signing functions for arbitrary data");let C=e.utils.stringToBuffer(f.value);const $=async()=>{const c={name:"RSA-OAEP"};if(h.value)C=await g.decrypt(new Uint8Array(C),c),f.value=Q(C),h.value=!1;else{const _={kty:"RSA",e:"AQAB",n:await g.getPublicKey(),alg:"RSA-OAEP-256",ext:!0},p=await window.crypto.subtle.importKey("jwk",_,re(j({},c),{hash:"SHA-256"}),!1,["encrypt"]);C=await window.crypto.subtle.encrypt(c,p,C),f.value=e.utils.bufferTob64(C),h.value=!0}},M=E(null),d=()=>g.getArweaveConfig().then(c=>M.value=JSON.stringify(c)),r=E(g.url),u=E(0);te(u,async c=>{for(;document.hidden;)await new Promise(_=>setTimeout(()=>_(),100));setTimeout(()=>b(c),300)});const b=async c=>{var _;u.value=c,(_=document.querySelector("#s"+c))==null||_.scrollIntoView({behavior:"smooth"})},L=c=>{const _=new Intl.NumberFormat(void 0,{maximumFractionDigits:3}).format(c),p=new Intl.NumberFormat(void 0,{maximumSignificantDigits:1}).format(c);return _.length>=p.length?_:p},D=c=>c&&Object.entries(c).reduce((_,p)=>_+`	${p[0]}: ${typeof p[1]=="object"?JSON.stringify(p[1]):"'"+p[1]+"'"}${p[0]=="quantity"||p[0]=="reward"?` // ${L(e.ar.winstonToAr(p[1]))} AR`:""}
`,"");function Q(c){return new TextDecoder().decode(c)}const B=K(()=>[`import { ArweaveWebWallet } from 'arweave-wallet-connector'

const wallet = new ArweaveWebWallet({
	name: 'Connector Example',
	logo: '${location.href}placeholder.svg'
})

wallet.setUrl('${r.value}')
await wallet.connect() // on user gesture to avoid blocked popup
`,`const transaction = await arweave.createTransaction({
${D(n)}})
await wallet.signTransaction(transaction)
`,`// Uploading data to the wallet directly is not yet available
// using arweave.js in the meantime
{
${D(s.value)}}
`,`let message = '${f.value}'
anyRsaEncryptFunction(message, await wallet.getPublicKey())
await wallet.decrypt(message, { name: 'RSA-OAEP' })
`]);return(c,_)=>(m(),w("div",Ht,[P(Ge,{class:"logo"}),P(Pt,{modelValue:r.value,"onUpdate:modelValue":_[0]||(_[0]=p=>r.value=p),class:"wallet-selector"},null,8,["modelValue"]),P(W,{code:"npm install arweave-wallet-connector"}),P(W,{code:x(B)[0]},null,8,["code"]),Kt,l("a",Ft,[P(Et),Gt]),Zt,u.value>=1?(m(),w("section",Jt,[l("div",Xt,[l("div",null,"This page is now linked to "+Z(x(g).url)+" and using the selected address :",1),Se(" "+Z(x(g).address),1)]),l("div",null,[l("div",Qt,[Yt,jt,F(l("input",{"onUpdate:modelValue":_[1]||(_[1]=p=>x(n).target=p),style:{flex:"1 1 0","text-align":"right"}},null,512),[[G,x(n).target]])]),ei,l("div",ti,[x(n).target==="TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE"?(m(),w("span",ii,"Donate? :")):(m(),w("span",ni,"Send :")),si,F(l("input",{"onUpdate:modelValue":_[2]||(_[2]=p=>i.value=p),style:{flex:"1 1 0","text-align":"right"}},null,512),[[G,i.value]]),oi,ri]),li,l("div",ai,[ui,di,F(l("input",{"onUpdate:modelValue":_[3]||(_[3]=p=>t.value=p),style:{flex:"1 1 0","text-align":"right"}},null,512),[[G,t.value]])])]),l("div",ci,[x(g).address?(m(),w("button",{key:0,class:"button",onClick:k},[P(X),pi])):N("",!0)]),P(W,{code:x(B)[1]},null,8,["code"]),hi])):N("",!0),u.value>=2?(m(),w("section",fi,[s.value?(m(),w(Oe,{key:0},[l("div",_i,[l("button",{class:"button",onClick:y},[P(Dt),v.value?(m(),w("span",gi,"Uploaded ("+Z(v.value)+")",1)):(m(),w("span",vi,"Upload Transaction"))])]),P(W,{code:x(B)[2]},null,8,["code"])],64)):N("",!0),a.value?(m(),w("div",mi,[P(W,{code:`// Received error message
${JSON.stringify(a.value)}`},null,8,["code"])])):N("",!0),l("div",wi,[l("button",{class:"button",onClick:_[4]||(_[4]=()=>b(3))},[P(X),yi])]),Ci])):N("",!0),u.value>=3?(m(),w("section",bi,[l("div",Pi,[l("button",{class:"button",onClick:$},[P(X),l("span",null,Z(h.value?"Decrypt":"Encrypt"),1)])]),P(W,{code:x(B)[3]},null,8,["code"]),l("div",ki,[l("button",{class:"button",onClick:d},[P(X),xi])]),P(W,{code:M.value||"Result"},null,8,["code"])])):N("",!0)]))}});var $i=S(Ai,[["__scopeId","data-v-df84e52e"]]);Ve.registerLanguage("javascript",We);const me=Be($i);me.use(qe);me.mount("#app");
