(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-dynamicManage-auditIng-auditDetails"],{"213b":function(t,i,n){var e=n("f5cf");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("3ce97786",e,!0,{sourceMap:!1,shadowMode:!1})},"34a8":function(t,i,n){"use strict";n.r(i);var e=n("880c"),a=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(i,t,(function(){return e[t]}))}(r);i["default"]=a.a},"45e0":function(t,i,n){"use strict";var e=n("213b"),a=n.n(e);a.a},"6fe4":function(t,i,n){"use strict";n.r(i);var e=n("94cf"),a=n("34a8");for(var r in a)"default"!==r&&function(t){n.d(i,t,(function(){return a[t]}))}(r);n("45e0");var o,d=n("f0c5"),s=Object(d["a"])(a["default"],e["b"],e["c"],!1,null,"0822ad2c",null,!1,e["a"],o);i["default"]=s.exports},"880c":function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{dynamicContent:"",id:""}},onLoad:function(t){this.id=t.id,this.getDetails()},methods:{getDetails:function(){var i=this;this.$request.post("dynamic/dynamic/details",{id:this.id}).then((function(n){t.log(n),i.dynamicContent=n.result}))}}};i.default=n}).call(this,n("5a52")["default"])},"94cf":function(t,i,n){"use strict";var e,a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"audit"},[n("v-uni-view",{staticClass:"audit-item"},[n("v-uni-view",{staticClass:"img"},[n("v-uni-video",{attrs:{src:t.dynamicContent.video_url,poster:t.dynamicContent.cover,"show-center-play-btn":!1,controls:!0}})],1),n("v-uni-view",{staticClass:"describe"},[t._v(t._s(t.dynamicContent.content))]),n("v-uni-view",{staticClass:"send-time"},[t._v("创建时间："+t._s(t._f("times")(t.dynamicContent.created_at)))])],1)],1)},r=[];n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return r})),n.d(i,"a",(function(){return e}))},f5cf:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.audit .audit-item ~ .audit-item[data-v-0822ad2c]{margin-top:%?48?%}.audit .audit-item[data-v-0822ad2c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.audit .audit-item .img[data-v-0822ad2c]{width:%?750?%;height:%?400?%}.audit .audit-item .img uni-video[data-v-0822ad2c]{width:100%;height:100%}.audit .audit-item .describe[data-v-0822ad2c]{margin:%?20?% 0 %?12?% 0;font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#999;line-height:%?40?%;padding:0 %?38?%;-webkit-box-sizing:border-box;box-sizing:border-box}.audit .audit-item .send-time[data-v-0822ad2c]{padding:0 %?38?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?24?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#999;line-height:%?34?%}',""]),t.exports=i}}]);