<template>
<div class="users-container">
    
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">

        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="words" clearable @clear="clearInput">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addUser">添加用户</el-button>
            </el-col>
        </el-row>

        <el-table
            :data="userList"
            border
            stripe
            style="width: 100%">

             <el-table-column
            prop="id"
            label="ID"
            width="50">
            </el-table-column>

            <el-table-column
            prop="username"
            label="用户名"
            width="180">
            </el-table-column>

            <el-table-column
            prop="email"
            label="email"
            width="180">
            </el-table-column>

            <el-table-column
            prop="state"
            label="状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.state">
               </el-switch>
            </template>
            </el-table-column>

           <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button  type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button  type="danger" icon="el-icon-delete" size="mini"></el-button>
                <el-button  type="warning"  icon="el-icon-setting" size="mini"></el-button>
            </template>
            </el-table-column>            
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[2, 3, 4, 5]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <el-dialog
            title="添加用户"
            :visible.sync="addUserDialog"
            width="30%"
            >
            
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </span>
        </el-dialog>

    </el-card>
</div>
</template>

<<script>
export default {

    data(){
        return {
            page:1,
            total:0,
            pageSize:2,
            userList:[],
            words:'',
            addUserDialog:false,
            form:{
                username:'',
                email:'',
                password:''
            }
        }
    },

    created() {
        this.getUserList();
    },
    
    methods: {

        async saveUser(){
           
            // 请求数据
            let {data:res} = await this.$http.post("admin/adduser",this.form)
            
            // 判断是否成功
            if(res.meta.status!==201)  return this.$message.error(res.meta.msg);

            this.$message.success(res.meta.msg);

            this.getUserList();

            this.addUserDialog = false;
            
           
        },

        addUser(){
            this.addUserDialog = true;
        },

        clearInput(){
            this.page = 1;
            this.getUserList();
        },

        search(){
            this.page = 1;
            this.getUserList();
        },

        // 每页显示条数变化 
        handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.getUserList();
        },

        // 页码变化时触发
        handleCurrentChange(page){
            this.page = page;
            this.getUserList();
        },

        async getUserList(){

            // 请求的url地址
            let url = 'admin/users?page='+this.page;

            let {data:res} = await this.$http.get(url,{
                params:{pagesize:this.pageSize,words:this.words}
            })
            
           // console.log(res);

            this.total = res.data.total;
            this.page = res.data.current_page

            let users  = res.data.data;
            let newUsers = users.map(item=>{
                 item.state = item.state == 1 ?true:false
                 return item;
            })

            this.userList = newUsers;

        }


    },
}
</script>

<style lang="less" scoped>

</style>