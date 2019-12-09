<template>
    <div class="add-house-container">

       <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房源管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑房源</el-breadcrumb-item>
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
                        :file-list = "fileList"
                        :on-preview="handlePictureCardPreview"
                        :before-remove="beforeRemove"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveHouse">保存房源</el-button>
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
                id:0,
                title:'',
                des:'',
                name:'',
                tel:''
            },
            formData:{},
            dialogVisible:false,
            dialogImageUrl:'',
            fileList:[]
        }

    },

    async created() {

        let id = this.$route.query.id;

        let {data:res} = await this.$http.get('house/detail/'+id);

        this.house = res;
        
        res.imgs.map(item=>{
            let obj = {};
            obj.url = item;
            this.fileList.push(obj);
        })
    
        
    },


    methods:{

        // 删除后台图片
         beforeRemove(file){
          
           let img = file.url.split('upload/')[1];

           // 请求删除后台图片的api接口
           this.$http.post('house/del_img',{
               img:img,id:this.house.id
           }).then(res=>{

               console.log(res);
             
               // 后台删除失败,终止删除当前图片
               if(res.data.meta.status !== 200){
                   this.$message.error("图片删除失败!");
                   return false;
               }
                 
           })
        
        },
        
        handleRemove(img){
            this.$message.success("图片删除成功!");
        },

        // 将上传图片的临时文件加入到formData
        uploadFile(img){

            this.formData.append("pic[]",img.file);

        },

        handlePictureCardPreview(img){
           this.dialogImageUrl = img.url;
           this.dialogVisible = true;
        },

    
        
        // 创建房源
        async saveHouse(){

         // 1 创建空的表单对象;
         this.formData = new FormData();

         // 2 图片手动上传
         await this.$refs.upload.submit();

          // 3 将当前页面其他表单数据加入到formData;
          this.formData.append("form",JSON.stringify(this.house));

         let {data:res } = await this.$http.post('house/save_edit',this.formData);

          if(res.meta.status !== 200) return this.$message.error("房源修改失败");

          this.$message.success(res.meta.msg);

          this.$router.push('/houses');
             
        }
    }
}
</script>

<style lang="less" scoped>

</style>