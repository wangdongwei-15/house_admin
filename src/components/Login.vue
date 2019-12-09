<template>
  <div class="login_container">
    <div class="login_box">

     <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/house_logo_1.png" alt />
      </div>
  
      <!-- 登录表单区域 -->
      <el-form
        ref = "loginFormRef"
        :model="form"
       :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click='login'>登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      form: {
        username: '',
        password: ''
      },
      rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入用密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
      }
     
  }

  },
  methods:{

     login(){

      // 登录预验证
      this.$refs.loginFormRef.validate(async (bool,obj)=>{
          
          // 验证不通过
          if(!bool) return console.log('用户名或密码错误');
          
          // 验证通过
         // console.log(this.form);
         let { data:res } = await this.$http.post('admin/login',this.form);

        
         // 验证不通过
         if(res.meta.status !== 200) return this.$message.error("账号密码错误!");

        // 验证通过

         this.$message.success("登录成功!");
         window.sessionStorage.setItem('token',res.data.token);
         window.sessionStorage.setItem('icon',res.data.icon);
         
         this.$router.push('/');
         
      });
      
     
    }
  }

}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display:flex;
    justify-content:center;
    align-items:center;
    img {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
