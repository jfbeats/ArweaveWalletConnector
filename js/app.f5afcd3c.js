(function(e){function n(n){for(var r,i,u=n[0],a=n[1],s=n[2],d=0,f=[];d<u.length;d++)i=u[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);l&&l(n);while(f.length)f.shift()();return c.push.apply(c,s||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,u=1;u<t.length;u++){var a=t[u];0!==o[a]&&(r=!1)}r&&(c.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},c=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=n,u=u.slice();for(var s=0;s<u.length;s++)n(u[s]);var l=a;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},"1f90":function(e,n,t){"use strict";var r=t("c973").default,o=t("970b").default,c=t("5bc3").default,i=t("ed6d").default,u=t("2d0d").default;t("96cf"),t("d3b7"),t("3ca3"),t("ddb0"),t("2b3d"),t("9861"),t("caad"),t("2532"),t("25f0"),t("b0c0");var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.WebWallet=void 0;var s=a(t("fe27")),l=function(e){i(t,e);var n=u(t);function t(e){var r;return o(this,t),r=n.call(this),r._window=null,r._address=null,r._listening=!1,r._promiseController=[],r.listener=function(e){console.info(e),e.source===r._window&&e.origin===r._url.origin&&("connect"===e.data.method&&(r._address=e.data.params.address,r.emit("connect",r._address)),"disconnect"===e.data.method&&r.disconnect())},r._url=new URL(e.includes("://")?e:"https://"+e),r._url.hash=new URLSearchParams({origin:window.location.origin}).toString(),r}return c(t,[{key:"address",get:function(){return this._address}},{key:"connected",get:function(){return!!this._address}},{key:"connect",value:function(){var e=r(regeneratorRuntime.mark((function e(n){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this._listening||(window.addEventListener("message",this.listener),this._listening=!0),this._window||(window.name="parent",this._window=window.open(this._url.toString(),"_blank","location,resizable,scrollbars,width=360,height=600")),e.abrupt("return",new Promise((function(e,n){return t.once("connect",e)})));case 3:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"disconnect",value:function(){var e=r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this._window&&this._window.close(),window.removeEventListener("message",this.listener),this._listening=!1,this._address=null,this.emit("disconnect");case 5:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()},{key:"getPublicKey",value:function(){var e=r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"getArweaveConfig",value:function(){var e=r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"signTransaction",value:function(){var e=r(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"sign",value:function(){var e=r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"decrypt",value:function(){var e=r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()},{key:"postMessage",value:function(){var e=r(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:null===(t=this._window)||void 0===t||t.postMessage(Object.assign({jsonrpc:"2.0"},n),this._url.origin);case 1:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()}]),t}(s.default);n.WebWallet=l},2716:function(e,n,t){},"2f79":function(e,n,t){},"369b":function(e,n,t){"use strict";t("2716")},"45fd":function(e,n,t){},c8b9:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.WebWallet=void 0;var r=t("1f90");Object.defineProperty(n,"WebWallet",{enumerable:!0,get:function(){return r.WebWallet}})},cd49:function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("7a23"),o={class:"app"};function c(e,n,t,c,i,u){var a=Object(r["k"])("ArweaveOutlineLogo"),s=Object(r["k"])("WalletSelector");return Object(r["f"])(),Object(r["b"])("div",o,[Object(r["d"])(a,{class:"logo"}),Object(r["d"])(s,{onConnect:e.connect,onDisconnect:e.disconnect,loading:e.data.loading,connected:!!e.data.address},null,8,["onConnect","onDisconnect","loading","connected"]),Object(r["c"])("div",null,Object(r["l"])(e.data.address),1)])}var i=t("1da1"),u=(t("96cf"),{class:"url-input"}),a=["placeholder"];function s(e,n,t,o,c,i){return Object(r["f"])(),Object(r["b"])("div",u,[Object(r["n"])(Object(r["c"])("input",{class:"url","onUpdate:modelValue":n[0]||(n[0]=function(n){return e.url=n}),placeholder:e.defaultURL,onKeydown:n[1]||(n[1]=Object(r["o"])((function(){return e.connect&&e.connect.apply(e,arguments)}),["enter"]))},null,40,a),[[r["m"],e.url]]),Object(r["c"])("button",{class:"action",onClick:n[2]||(n[2]=function(n){return e.connected?e.disconnect():e.connect()})},Object(r["l"])(e.loading?"Unlock":e.connected?"Disconnect":"Connect"),1)])}var l=Object(r["e"])({props:{loading:Boolean,connected:Boolean},setup:function(e,n){var t=n.emit,o="http://localhost:8080",c=Object(r["j"])(o),i=function(){return t("connect",c.value||o)},u=function(){return t("disconnect")};return{defaultURL:o,url:c,connect:i,disconnect:u}}}),d=(t("fef3"),t("d959")),f=t.n(d);const p=f()(l,[["render",s],["__scopeId","data-v-6f89c430"]]);var C=p,h={width:"100%",height:"100%",viewBox:"0 0 2330 2330",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},v=Object(r["c"])("path",{d:"M1164.58,0C1807.33,0 2329.16,521.832 2329.16,1164.58C2329.16,1807.33 1807.33,2329.16 1164.58,2329.16C521.829,2329.16 0,1807.33 0,1164.58C0,521.829 521.832,0 1164.58,0ZM1164.58,12.31C1800.54,12.31 2316.85,528.626 2316.85,1164.58C2316.85,1800.54 1800.53,2316.85 1164.58,2316.85C528.623,2316.85 12.31,1800.53 12.31,1164.58C12.31,528.623 528.626,12.31 1164.58,12.31ZM1164.58,169.088C615.151,169.088 169.085,615.154 169.085,1164.58C169.085,1714.01 615.151,2160.08 1164.58,2160.08C1714.01,2160.08 2160.08,1714.01 2160.08,1164.58C2160.08,615.154 1714.01,169.088 1164.58,169.088ZM1164.58,181.398C1707.22,181.398 2147.77,621.948 2147.77,1164.58C2147.77,1707.22 1707.22,2147.77 1164.58,2147.77C621.945,2147.77 181.395,1707.22 181.395,1164.58C181.395,621.948 621.945,181.398 1164.58,181.398Z",style:{fill:"white"}},null,-1),w=Object(r["c"])("path",{d:"M1342.38,1536.38C1338.03,1525.56 1333.68,1514.74 1329.34,1501.75C1324.99,1488.76 1322.82,1473.61 1320.64,1460.63C1309.77,1473.61 1294.55,1484.43 1279.33,1497.42C1264.11,1508.24 1246.72,1519.06 1227.15,1527.72C1209.76,1536.38 1188.02,1542.88 1166.28,1547.2C1144.54,1551.53 1120.62,1555.86 1094.54,1555.86C1053.23,1555.86 1014.09,1549.37 977.132,1538.55C942.348,1525.56 911.913,1510.41 885.823,1486.6C859.734,1464.96 840.165,1438.98 827.124,1408.68C811.905,1378.38 805.38,1345.91 805.38,1309.12C805.38,1222.55 837.994,1155.45 903.214,1107.84C968.437,1060.22 1066.27,1036.41 1194.54,1036.41L1314.12,1036.41L1314.12,986.633C1314.12,947.673 1301.07,915.205 1274.98,893.563C1248.9,869.755 1211.94,858.934 1161.93,858.934C1118.45,858.934 1088.01,867.59 1066.27,887.072C1046.7,904.384 1035.84,930.357 1035.84,960.66L822.775,960.66C822.775,926.027 831.47,891.398 846.689,861.099C861.909,828.631 885.823,802.658 914.088,778.85C944.522,755.042 981.482,735.565 1022.79,722.578C1066.27,707.427 1116.27,700.936 1170.63,700.936C1220.63,700.936 1266.29,707.427 1309.77,718.248C1353.25,731.235 1390.21,748.551 1422.82,772.359C1455.43,796.167 1479.35,826.47 1496.74,863.264C1514.13,900.058 1522.83,941.178 1522.83,988.794L1522.83,1341.59C1522.83,1384.87 1525,1421.67 1531.53,1451.97C1538.05,1480.11 1544.57,1506.08 1555.44,1525.56L1563.77,1538.55L1343.33,1538.55L1342.38,1536.38ZM1541.9,1526.24L1351.58,1526.24C1348.05,1517.42 1344.53,1508.36 1341.01,1497.84C1336.86,1485.45 1334.86,1470.98 1332.78,1458.59C1331.99,1453.85 1328.51,1450.01 1323.87,1448.75C1319.23,1447.49 1314.29,1449.04 1311.2,1452.73C1300.83,1465.11 1286.28,1475.36 1271.76,1487.7C1257.27,1497.97 1240.75,1508.24 1222.17,1516.47C1222,1516.54 1221.83,1516.62 1221.67,1516.7C1205.16,1524.92 1184.51,1531.02 1163.88,1535.13C1163.88,1535.13 1163.87,1535.13 1163.87,1535.13C1142.86,1539.31 1119.75,1543.55 1094.54,1543.55C1054.6,1543.55 1016.76,1537.28 981.019,1526.86C947.957,1514.48 918.944,1500.16 894.121,1477.51C893.977,1477.38 893.831,1477.25 893.682,1477.12C869.132,1456.76 850.703,1432.33 838.431,1403.82C838.335,1403.59 838.233,1403.37 838.124,1403.16C823.753,1374.55 817.69,1343.86 817.69,1309.12C817.69,1226.86 848.502,1163.02 910.472,1117.78C974.04,1071.37 1069.53,1048.72 1194.54,1048.72C1194.54,1048.72 1314.12,1048.72 1314.12,1048.72C1320.91,1048.72 1326.43,1043.21 1326.43,1036.41L1326.43,986.633C1326.43,943.746 1311.71,908.154 1283.06,884.271C1255.04,858.813 1215.56,846.624 1161.93,846.624C1114.64,846.624 1081.74,856.701 1058.08,877.879C1038.75,894.998 1026.74,919.532 1024.08,948.35C1024.08,948.35 879.661,948.35 835.47,948.35C837.247,919.802 845.118,891.651 857.689,866.624C857.739,866.525 857.788,866.425 857.835,866.324C872.268,835.534 895.058,810.997 921.845,788.411C951.155,765.518 986.738,746.816 1026.48,734.321C1026.6,734.283 1026.72,734.244 1026.84,734.202C1069.12,719.468 1117.77,713.246 1170.63,713.246C1219.46,713.246 1264.05,719.576 1306.52,730.123C1348.44,742.67 1384.1,759.335 1415.57,782.301C1446.48,804.875 1469.12,833.638 1485.61,868.525C1502.27,903.772 1510.52,943.18 1510.52,988.794L1510.52,1341.59C1510.52,1385.89 1512.82,1423.55 1519.49,1454.56C1519.51,1454.62 1519.52,1454.69 1519.53,1454.75C1525.77,1481.65 1532.15,1506.6 1541.9,1526.24ZM1140.19,1399.35C1163.26,1399.35 1184.03,1396.94 1202.54,1390.16C1220.79,1385.56 1239.01,1378.69 1254.98,1369.6C1271.23,1360.36 1285.11,1351.04 1296.71,1339.49C1308.37,1327.89 1317.67,1316.26 1324.66,1304.65C1325.82,1302.73 1326.43,1300.54 1326.43,1298.3L1326.43,1157.62C1326.43,1150.82 1320.91,1145.31 1314.12,1145.31L1205.41,1145.31C1171.56,1145.31 1142.22,1149.82 1117.4,1156.56C1091.69,1163.54 1070.72,1173.05 1056.59,1184.65C1039.57,1196.84 1027.44,1211.52 1020.06,1230.93C1013,1247.43 1008.31,1266.29 1008.31,1287.48C1008.31,1318.92 1020.33,1345.58 1042.12,1367.38C1061.4,1388.75 1094.65,1399.35 1140.19,1399.35ZM1140.19,1387.04C1161.93,1387.04 1181.5,1384.87 1198.89,1378.38C1216.28,1374.05 1233.68,1367.56 1248.9,1358.9C1264.11,1350.24 1277.16,1341.59 1288.03,1330.77C1298.9,1319.94 1307.6,1309.12 1314.12,1298.3L1314.12,1157.62L1205.41,1157.62C1172.8,1157.62 1144.54,1161.94 1120.62,1168.44C1096.71,1174.93 1077.14,1183.59 1064.1,1194.41C1048.88,1205.23 1038.01,1218.22 1031.49,1235.53C1024.96,1250.68 1020.62,1268 1020.62,1287.48C1020.62,1315.62 1031.49,1339.42 1051.06,1358.9C1068.44,1378.38 1098.88,1387.04 1140.19,1387.04Z",style:{fill:"white"}},null,-1),b=[v,w];function g(e,n){return Object(r["f"])(),Object(r["b"])("svg",h,b)}const m={},y=f()(m,[["render",g]]);var O=y,_=t("c8b9"),j=Object(r["e"])({name:"App",components:{WalletSelector:C,ArweaveOutlineLogo:O},setup:function(){var e=Object(r["i"])({address:null,loading:!1,error:""}),n=null,t=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=2;break}return t.abrupt("return");case 2:return n=new _["WebWallet"](r),n.on("connect",(function(n){return e.address=n})),n.on("disconnect",(function(){return e.address=null})),e.loading=!0,t.next=8,n.connect();case 8:e.loading=!1;case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var e;null===(e=n)||void 0===e||e.disconnect()};return{data:e,connect:t,disconnect:o}}});t("e926"),t("369b");const k=f()(j,[["render",c],["__scopeId","data-v-48d566a2"]]);var x=k;Object(r["a"])(x).mount("#app")},e926:function(e,n,t){"use strict";t("45fd")},fef3:function(e,n,t){"use strict";t("2f79")}});
//# sourceMappingURL=app.f5afcd3c.js.map