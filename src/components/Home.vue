<template>
  <div class="home-container">
     <el-container>

      <el-header>
         <div class="left">
            <div class="logo"><img src='../assets/img/house_logo_3.png'> </div>
            <span>今启房源后台管理</span>
         </div>
         <div class="logout">
             <el-avatar size="medium" :src="user_icon"></el-avatar>
             <el-button type="info" @click='logout' size="mini" >退出</el-button>
         </div>
        
      </el-header>

      <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
          <div class="toggle-btn" @click="toggleCollapse">|||</div>
         <el-menu
            router
            unique-opened
            :collapse="isCollapse"
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse-transition="false"
            >

            <el-submenu :index="item.id + ''" v-for = "item in menuList" :key="item.id"   
            
            
            unique-opened>
              <template slot="title">
                <i :class="icons[item.id]"></i>
                <span>{{item.name}}</span>
              </template>
              
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
              :key="subItem.id" 
              @click ="saveActivPath('/'+subItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.name}}</span>
                </template>
              </el-menu-item>
               
            </el-submenu> 

          </el-menu>
        </el-aside>
        <el-main>
           <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
     return {
        activePath:'/users',
        menuList:[],
        isCollapse:false,
        icons:{
           "101":"el-icon-user-solid",
           "108":"el-icon-s-home",
           "112":"el-icon-s-comment",
           "120":"el-icon-s-check"
        },
        user_icon:''
     }
  },

  created(){
     this.getMenuList();
     this.activePath = sessionStorage.getItem('activePath') ? sessionStorage.getItem('activePath'):'/users';
     this.user_icon = sessionStorage.getItem('icon');

  },

  methods: {

    toggleCollapse(){
       this.isCollapse = !this.isCollapse;
    },
   
    logout(){
        window.sessionStorage.removeItem('token');
        this.$message.success('退出登录成功!');
        this.$router.push('/login');
    },

    async getMenuList(){

      let { data:res } = await this.$http.get('menus');
      this.menuList = res.data;

    },

    saveActivPath(activePath){
       sessionStorage.setItem("activePath",activePath);
       this.activePath = activePath;
    }
  
    
  }
}
</script>

<style lang="less" scoped>
.home-container,.el-container{
   height:100%;
}

.el-header{
  background-color:#383d41;
  display:flex;
  justify-content:space-between;
  align-items:center;
  .logout{
      height: 60px;
      align-items: center;
      display: flex;
  }
  .el-avatar {
    margin-right: 10px;
  }
  .left{
     display:flex;
     color:#ddd;
     align-items:center;
     width:200px;
     span{
       padding-left:10px;
       letter-spacing:1px;
     }
  }
  .logo{
    width:35px;
    height:35px;
    border:1px #ddd solid;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .logo img{
     width:26px;
    
  }
}

.el-aside{
  background:#343743;
  .el-menu{
    border-right:none;
  }
}

.el-main{
   background:#ebedf1;
}

.toggle-btn{
  height: 40px;
  background: #4b5063;
  justify-content: center;
  display: flex;
  color: #ddd;
  align-items: center;
  cursor: pointer;
}

</style>
