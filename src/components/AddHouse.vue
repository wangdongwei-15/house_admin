<template>
    <div class="add-house-container">

        

       <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房源管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建房源</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <el-row>
            <el-col :span="18">
                <el-form ref="addFormRef" :model="house" label-width="80px">
                <el-form-item label="房源标题">
                    <el-input v-model="house.title"></el-input>
                </el-form-item>
                 <el-form-item label="房源详情">
                    <el-input type="textarea" v-model="house.des"></el-input>
                </el-form-item>
                 <el-form-item label="姓名">
                    <el-input v-model="house.name"></el-input>
                </el-form-item>
                 <el-form-item label="手机号码">
                    <el-input v-model="house.tel"></el-input>
                </el-form-item>
                

                <el-form-item>
                    <el-upload
                        multiple
                        ref='upload'
                        :auto-upload="false"
                        :http-request="uploadFile"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveHouse">立即创建</el-button>
                    <el-button>取消</el-button>
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
            house:{
                title:'',
                des:'',
                name:'',
                tel:''
            },
            formData:{},
            dialogVisible:false,
            dialogImageUrl:''
        }

    },


    methods:{

        // 将上传图片的临时文件加入到formData
        uploadFile(img){

            this.formData.append("pic[]",img.file);

        },

        handlePictureCardPreview(img){
           this.dialogImageUrl = img.url;
           this.dialogVisible = true;
        },

        handleRemove(img){
            console.log(img);
        },
        
        // 创建房源
        async saveHouse(){

         // 1 创建空的表单对象;
         this.formData = new FormData();

         // 2 图片手动上传
         await this.$refs.upload.submit();

          // 3 将当前页面其他表单数据加入到formData;
          this.formData.append("form",JSON.stringify(this.house));

         let {data:res } = await this.$http.post('house/create',this.formData);

          if(res.meta.status !== 200) return this.$message.error("房源发布失败");

          this.$message.success(res.meta.msg);

          this.$router.push('/houses');
             
        }
    }
}
</script>

<style lang="less" scoped>

</style>