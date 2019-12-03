<template>
  <div class="home-container">
     <el-container>
      <el-header>
         <div class="left">
            <div class="logo"><img src='../assets/img/house_logo_3.png'> </div>
            <span>今启房源后台管理</span>
         </div>
         

          <el-button type="info" @click='logout'  size="mini">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">

         <el-menu
            unique-opened
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">

            <el-submenu :index="item.id + ''" v-for = "item in menuList" :key="item.id">
              <template slot="title">
                <i :class="icons[item.id]"></i>
                <span>{{item.name}}</span>
              </template>
              
              <el-menu-item index="1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>选项1</span>
                </template>
              </el-menu-item>
                <el-menu-item index="1-2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>选项2</span>
                </template>
              </el-menu-item>
            </el-submenu> 

          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
     return {
        menuList:[],
        icons:{
           "101":"el-icon-user-solid",
           "108":"el-icon-s-home",
           "112":"el-icon-s-comment",
           "120":"el-icon-s-check"
        }
     }
  },

  created(){
     this.getMenuList();
  },

  methods: {
   
    logout(){
        window.sessionStorage.removeItem('token');
        this.$message.success('退出登录成功!');
        this.$router.push('/login');
    },

    async getMenuList(){

      let { data:res } = await this.$http.get('menus');
      this.menuList = res.data;
      console.log(res);

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

</style>
