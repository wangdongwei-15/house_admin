<template>
    <div class="container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>重置密码</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col :span="6">
                    <el-form ref="form" :model="user" label-width="80px">
                            <el-form-item label="原密码">
                                <el-input v-model="user.oldPassword"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input v-model="user.password"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input v-model="user.confirmPassword"></el-input>
                            </el-form-item>
                            <el-form-item>
                                    <el-button type="primary" @click="onSubmit">保存密码</el-button>
                                    <el-button>重置</el-button>
                                </el-form-item>
                        </el-form>
                </el-col>
            </el-row>
           
        </el-card>

    </div>
</template>

<script>
export default {
    data(){

        return {
            user:{
                oldPassword:'',
                password:'',
                confirmPassword:'',
                token:''
            }
        }

    },
    methods:{

        onSubmit(){
            
            let token = window.sessionStorage.getItem('token');
            this.user.token = token;
            console.log(this.user);

            this.$http.post('admin/reset_password',this.user).then(res=>{
                console.log(res);
            })

        }
    }
}
</script>

<style lang="less" scoped>

</style>