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
                <el-switch v-model="scope.row.state" @change='updateUserState(scope.row)'>
               </el-switch>
            </template>
            </el-table-column>

           <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button  type="primary" icon="el-icon-edit" size="mini" @click='showEditDialog(scope.row)'></el-button>
                <el-button  type="danger" icon="el-icon-delete" size="mini" @click='delUser(scope.row.id)'></el-button>
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
        
        <!-- 添加用户 -->
        <el-dialog
            @closed = "closeDialog"
            title="添加用户"
            :visible.sync="addUserDialog"
            width="30%"
            >
            
            <el-form ref="addUserRef" :rules="addUserRules" :model="form" label-width="80px">
                <el-form-item label="用户名" prop='username'>
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                 <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑用户 -->
        <el-dialog
            title="编辑用户"
            :visible.sync="editUserDialog"
            width="30%"
            >
            
            <el-form ref="editUserRef"  :model="editForm" label-width="80px">
                <el-form-item label="用户名" prop='username'>
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                 <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                 <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password" type="password"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEditUser">确 定</el-button>
            </span>
        </el-dialog>

    </el-card>
</div>
</template>

<<script>
export default {

    data(){

        // email的合法性校验
        var checkEmail = (rule,value,cb)=>{

            const regEmail = /^\w+@\w+(\.\w+)+$/;
            if(regEmail.test(value)){
                return cb();
            }

            return cb(new Error('请输入合法的邮箱!'))
            
        }

        return {
            page:1,
            total:0,
            pageSize:2,
            userList:[],
            words:'',
            addUserDialog:false,
            editUserDialog:false,
            form:{
                username:'',
                email:'',
                password:''
            },
            editForm:{
                username:'',
                email:'',
                password:''
            },
            addUserRules:{
                username:[
                    {required:true,message:'请输入用户名',triger:'blur'},
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:'请输入密码',triger:'blur'},
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                email:[
                    {required:true,message:'请输入邮箱',triger:'blur'},
                    {validator:checkEmail,triger:'blur'}
                ]
            }
        }
    },

    created() {
        this.getUserList();
        console.log('hello');
        console.log('world');
        console.log('hello');
    },
    
    methods: {

        // 删除用户
        async delUser(id){

            //console.log(id);
            const confirmResult = await this.$confirm("确认删除当前用户吗?",'提示',{
                                            confirmButtonText:'确认删除',
                                            cancelButtonText:'取消',
                                            type:'warning'
                                        }).catch(err=>err)
            
            //console.log(confirmResult);
            if(confirmResult !== 'confirm') return this.$message.info('已取消删除');
            
            //console.log('执行删除');
            let { data:res } = await this.$http.post('admin/del/'+id);

            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);

            this.getUserList();

            this.$message.success(res.meta.msg);
            
        },
       
        async saveEditUser(){
            
            // 校验
           
            // 向后台api接口提交数据
            let { data:res } = await this.$http.post('admin/edit',this.editForm);

            // 用户反馈
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.$message.success(res.meta.msg);

            // 更新页面,关闭对话框
            this.getUserList();
            this.editUserDialog = false;
            
        },
        
        showEditDialog(user){

            this.editForm = user;
            this.editUserDialog = true;

        },

        async updateUserState(user){
           
           let { data:res } = await this.$http.post('admin/update',user)
           if(res.meta.status !== 200) return  this.$message.error(res.meta.msg);
           this.$message.success(res.meta.msg);
           
        },

        closeDialog(){
            // 重置表单
            this.$refs.addUserRef.resetFields();
        },
        
        saveUser(){

            // 表单预校验
            this.$refs.addUserRef.validate(async bool=>{

                 if(!bool)  return this.$message.error("请输入完整的用户信息!");
                 
                 // 请求数据
                let {data:res} = await this.$http.post("admin/adduser",this.form)
                
                // 判断是否成功
                if(res.meta.status!==201)  return this.$message.error(res.meta.msg);

                this.$message.success(res.meta.msg);

                this.getUserList();

                this.addUserDialog = false;
                 

            })
           
                    
           
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

            console.log('hello');
            console.log('world');
            console.log('hello');

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