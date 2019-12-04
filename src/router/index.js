import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
import Login from "../components/Login.vue"
import Users from "../components/Users.vue"
import CreateUser from "../components/CreateUser.vue"

Vue.use(VueRouter)

const routes = [

  {
    path:'/',
    name:'home',
    component:Home,
    children:[
       {path:'/',component:Users},
       {path:'/users',component:Users},
       {path:'/add_user',component:CreateUser},
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
  
]


const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{

    // 如果访问的是login,可以直接访问
    // 如果访问其他路由,token是否存在, 不存在,跳转到登录页;
   
    if(to.path == "/login")  return  next();

    let tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr){
        return next("/login");
    }
    
    next();
  
})


export default router

