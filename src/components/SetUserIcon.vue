<template>
    <div class="container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>头像设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <el-form>

                <el-form-item>

                    <el-upload
                    
                        ref = "upload"
                        :auto-upload="false"
                        :http-request='uploadIcon'
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change="change"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </el-form-item>
        
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">上传头像</el-button>
                    <el-button>重置</el-button>
                </el-form-item>

            </el-form>   
           
        </el-card>

    </div>
</template>

<script>
export default {
    data(){

        return {
           imageUrl:'',
           formData:new FormData()
        }

    },
    methods:{

        // 把上传图片临时文件保存到formData
        uploadIcon(img){
            this.formData.append('pic',img.file);
        },

        async onSubmit(){

            // 2 模拟上传
            this.$refs.upload.submit();

            let token = window.sessionStorage.getItem('token');

            this.formData.append('token',token);

            // 请求上传api接口
            let { data:res } = await this.$http.post('admin/set_usericon',this.formData);

           // console.log(res);
           if(res.meta.status !== 200) return this.$message.error(res.meta.msg);

           this.$message.success(res.meta.msg);

           this.$refs.upload.clearFiles();
              
         
        },

        beforeAvatarUpload(file){
            
        },

        change(file) {

           // 容许上传的图片格式
           const IMG_ALLOWD = ['jpeg', 'jpg', 'gif'];

           let imgType = file.raw.type.split('/')[1];

            // 判断图片格式
            if (IMG_ALLOWD.indexOf(imgType) === -1) {
                this.$message.warning('上传图片格式错误')
                this.imageUrl = null
            }else{
                this.imageUrl = URL.createObjectURL(file.raw);
            }
            
        }


    }
}
</script>

<style lang="less">

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px ;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>