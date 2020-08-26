import Vue from 'vue'
import App from './App'
import queue from './common/queue'
import request from './common/request.js'
Vue.config.productionTip = false
//时间过滤器
Vue.filter('times',function(value){
	if(value==null){
		return value=''
	}else{
		return value.replace(/-/g,'.')
	}
	
})
// 转化时分秒
Vue.filter('liveTimes',function(value){
	 var hours = parseInt((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	 var h = hours>=9? hours:'0'+hours
	 var minutes = parseInt((value % (1000 * 60 * 60)) / (1000 * 60));
	 var m = minutes>=9? minutes:'0'+minutes
	 var seconds = (value % (1000 * 60)) / 1000;
	 var s = seconds>=9? seconds:'0'+seconds
	 return h+':'+ m +':'+ s
})

App.mpType = 'app'
Vue.prototype.$queue = queue;
Vue.prototype.$request = request;
const app = new Vue({
    ...App
})
app.$mount()
