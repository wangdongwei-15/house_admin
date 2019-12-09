import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
import Login from "../components/Login.vue"
import Users from "../components/Users.vue"
import CreateUser from "../components/CreateUser.vue"
import Houses from "../components/Houses.vue"
import AddHouse from "../components/AddHouse.vue"
import HouseDetail from "../components/HouseDetail.vue"
import houseEdit from "../components/HouseEdit.vue"
import ResetPassword from "../components/ResetPassword.vue"
import SetUserIcon from "../components/SetUserIcon.vue"
import MsgList from "../components/msg/MsgList.vue"

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
       {path:'/houses',component:Houses},
       {path:'/add_house',component:AddHouse},
       {path:'/house_detail',name:"house_detail",component:HouseDetail},
       {path:'/house_edit',name:"house_edit",component:houseEdit},
       {path:'/msg_list',name:"msg_list",component:MsgList},
       {path:'/set_usericon',component:SetUserIcon},
       {path:'/reset_password',name:"reset_password",component:ResetPassword }
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

