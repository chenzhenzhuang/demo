(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myProfile-fansManage-batchDelete"],{"2cfb":function(t,e,i){"use strict";i.r(e);var n=i("5b76"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"5b76":function(t,e,i){"use strict";(function(t){i("99af"),i("4160"),i("a434"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{pages:0,pageSize:"",count:"",dataList:[],selectStudentList:[],allChecked:!1}},onReachBottom:function(){this.pages*this.pageSize<this.count?this.getFansList():this.$queue.showToast("没有更多了")},onShow:function(){this.getFansList()},methods:{handleback:function(){this.dataList.forEach((function(t){t.isActive=!1})),this.selectStudentList=[]},deleteFans:function(t){var e=this;uni.showModal({content:"删除选中学生？",confirmColor:"#333333",success:function(t){t.confirm?e.$request.post("attention/index/batch_del",{ids:e.selectStudentList}).then((function(t){e.dataList=[],e.getFansList(),e.$queue.showToast(t.msg)})):t.cancel&&e.$queue.showToast("已取消")}})},selectStudent:function(e){var i=this;this.dataList.forEach((function(n){n.id==e&&(n.isActive?(n.isActive=!1,i.allChecked=!1,i.selectStudentList.forEach((function(n,a){t.log(n==e),n==e&&i.selectStudentList.splice(a,1)}))):(n.isActive=!0,i.selectStudentList.push(n.id),i.selectStudentList.length>0&&i.selectStudentList.length==i.dataList.length&&(i.allChecked=!0)))}))},getFansList:function(){var e=this;this.$request.post("attention/index/list",{pages:this.pages}).then((function(i){t.log(i),i.result.list.forEach((function(t){t.isActive=!1})),e.count=i.result.count,e.pageSize=i.result.PageSize,e.dataList=e.dataList.concat(i.result.list),e.pages++}))},finish:function(e){uni.showModal({content:"删除此学生？",confirmColor:"#333333",success:function(e){e.confirm?uni.showToast({title:"删除成功"}):e.cancel&&t.log("用户点击取消")}})}}};e.default=n}).call(this,i("5a52")["default"])},8426:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"batch-all"},[i("v-uni-view",{staticClass:"select-student"},t._l(t.dataList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"student-info",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.selectStudent(e.id)}}},[i("v-uni-radio",{attrs:{color:"#00B7F4",checked:e.isActive}}),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"right-box"},[i("v-uni-view",{staticClass:"head-img"},[i("v-uni-image",{attrs:{src:e.member.avatar,mode:"aspectFill"}}),1==e.member.profile.sex?i("v-uni-image",{staticClass:"sex",attrs:{src:"/static/boy.png",mode:"aspectFill"}}):t._e(),0==e.member.profile.sex?i("v-uni-image",{staticClass:"sex",attrs:{src:"/static/gril.png",mode:"aspectFill"}}):t._e()],1),i("v-uni-view",{staticClass:"infos"},[i("v-uni-view",{staticClass:"name"},[t._v(t._s(e.member.nickname))]),i("v-uni-view",{staticClass:"age"},[t._v("学生年龄："+t._s(e.member.profile.age)+"岁")])],1)],1)],1)],1)})),1),i("v-uni-view",{staticClass:"bot-fixed-wrap"},[0==t.selectStudentList.length?i("v-uni-view",{staticClass:"no-back"},[t._v("取消")]):t._e(),t.selectStudentList.length>0?i("v-uni-view",{staticClass:"back",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleback.apply(void 0,arguments)}}},[t._v("取消")]):t._e(),i("v-uni-view",{staticClass:"but",class:{danger:t.selectStudentList.length>0,un:t.selectStudentList.length<=0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.deleteFans.apply(void 0,arguments)}}},[t._v(t._s(t.selectStudentList.length>0?"删除("+t.selectStudentList.length+")":"删除"))])],1)],1)},s=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}))},9110:function(t,e,i){"use strict";var n=i("ade8"),a=i.n(n);a.a},ade8:function(t,e,i){var n=i("c8d8");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("4c3df0f2",n,!0,{sourceMap:!1,shadowMode:!1})},c8d8:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.batch-all .select-student[data-v-cce57486]{height:calc(100vh - %?100?%);padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.batch-all .select-student .student-info[data-v-cce57486]{width:%?688?%;height:%?130?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.batch-all .select-student .student-info uni-radio[data-v-cce57486]{-webkit-transform:scale(.7);transform:scale(.7)}.batch-all .select-student .student-info .right[data-v-cce57486]{margin-left:%?12?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;width:%?632?%}.batch-all .select-student .student-info .right .right-box[data-v-cce57486]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.batch-all .select-student .student-info .right .right-box .head-img[data-v-cce57486]{width:%?88?%;height:%?88?%;position:relative}.batch-all .select-student .student-info .right .right-box .head-img uni-image[data-v-cce57486]{width:100%;height:100%;-webkit-border-radius:50%;border-radius:50%}.batch-all .select-student .student-info .right .right-box .head-img .sex[data-v-cce57486]{width:%?21?%;height:%?21?%;position:absolute;right:%?10?%;bottom:%?2?%}.batch-all .select-student .student-info .right .right-box .infos[data-v-cce57486]{margin-left:%?20?%}.batch-all .select-student .student-info .right .right-box .infos .name[data-v-cce57486]{height:%?40?%;font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(0,0,0,.85);line-height:%?40?%}.batch-all .select-student .student-info .right .right-box .infos .age[data-v-cce57486]{margin-top:%?6?%;height:%?34?%;font-size:%?24?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(0,0,0,.25);line-height:%?34?%}.batch-all .bot-fixed-wrap[data-v-cce57486]{position:fixed;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;bottom:0;left:0;background:#fff;-webkit-box-shadow:%?0?% %?-2?% %?18?% %?0?% rgba(0,0,0,.14);box-shadow:%?0?% %?-2?% %?18?% %?0?% rgba(0,0,0,.14);width:100%;height:%?100?%;z-index:99}.batch-all .bot-fixed-wrap .back[data-v-cce57486]{line-height:%?100?%;text-align:center;height:%?100?%;width:50%;font-size:%?32?%;-webkit-box-shadow:%?0?% %?2?% %?18?% %?0?% rgba(0,0,0,.14);box-shadow:%?0?% %?2?% %?18?% %?0?% rgba(0,0,0,.14)}.batch-all .bot-fixed-wrap .no-back[data-v-cce57486]{line-height:%?100?%;text-align:center;height:%?100?%;width:50%;font-size:%?32?%;-webkit-box-shadow:%?0?% %?2?% %?18?% %?0?% rgba(0,0,0,.14);box-shadow:%?0?% %?2?% %?18?% %?0?% rgba(0,0,0,.14);color:#666}.batch-all .bot-fixed-wrap .but[data-v-cce57486]{line-height:%?100?%;text-align:center;height:%?100?%;width:50%;font-size:%?32?%}.batch-all .bot-fixed-wrap .but .un[data-v-cce57486]{color:#999}.batch-all .bot-fixed-wrap .but .danger[data-v-cce57486]{color:red}',""]),t.exports=e},ca18:function(t,e,i){"use strict";i.r(e);var n=i("8426"),a=i("2cfb");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("9110");var c,l=i("f0c5"),o=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"cce57486",null,!1,n["a"],c);e["default"]=o.exports}}]);