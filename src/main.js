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

// 路由拦截器 
axios.interceptors.request.use(config => {
   
  //console.log(config);
   config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
