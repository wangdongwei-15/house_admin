import Vue from 'vue'
import App from './App.vue'
import router from './router'

import  "./assets/css/global.css"
import  "./assets/fonts/iconfont.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$http = axios;

//axios.defaults.baseURL = 'http://www.xyz.com/api';

//导入进度条插件
import NProgress from 'nprogress';
//导入进度条样式
import 'nprogress/nprogress.css';

// 路由拦截器 
axios.interceptors.request.use(config => {
  NProgress.start()
  //console.log(config);
   config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config =>{
  //当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


console.log('prod######');