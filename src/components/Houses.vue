<template>
    <div class="house-container">
           <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房源管理</el-breadcrumb-item>
            <el-breadcrumb-item>房源列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            
              <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" v-model="words" clearable @clear="clearInput">
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </el-col>
                     <el-col :span="4">
                        <el-button type="primary" @click="createHouse">创建房源</el-button>
                    </el-col>
                </el-row>
            
            <el-table
                border
                stripe
                :data="houseList"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="房源标题"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="100"
                    label="发布者">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    width="150"
                    label="手机">
                </el-table-column>
                 <el-table-column
                    prop="state"
                    width="100"
                    label="状态">
                   <template slot-scope="scope">
                     <el-switch v-model="scope.row.state" @change='updateHouseState(scope.row)'>
                   </el-switch>
                   </template>
                    

                </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button  type="primary" icon="el-icon-edit" size="mini" @click="editHouse(scope.row.id)"></el-button>
                        <el-button  type="danger" icon="el-icon-delete" size="mini" @click="delHouse(scope.row.id)"></el-button>
                        <el-button  type="warning"  icon="el-icon-setting" size="mini" @click="detail(scope.row.id)"></el-button>
                    </template>
                </el-table-column>

                </el-table>

                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2,3,4,5,6]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>

        </el-card>

    </div>
</template>

<script>
export default {
    data(){
        return {
            houseList:[],
            total:0,
            currentPage:1,
            pageSize:5,
            words:''
        }
    },
    created() {
       this.getHouseList();
    },
    methods: {

        // 编辑房源
        editHouse(id){

            this.$router.push({
               path:"/house_edit",
               query:{ id }
           })

        },

       // 房源详情
       detail(id){
           this.$router.push({
               path:"/house_detail",
               query:{ id }
           });
       }, 
       
       // 删除房源
       async delHouse(id){

            //确认删除
            const confirmResult = await this.$confirm("确认删除当前房源吗?",'提示',{
                                            confirmButtonText:'确认删除',
                                            cancelButtonText:'取消',
                                            type:'warning'
                                        }).catch(err=>err)
            
           
            if(confirmResult !== 'confirm') return this.$message.info('已取消删除');

           //删除请求
           let { data:res } = await this.$http.get('house/del/'+id);
           
           // 删除反馈
           if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
           this.$message.success(res.meta.msg);
           this.getHouseList();
         
       }, 

       // 更新房源状态
       async updateHouseState(house){

           // 修改状态api请求
           let { data:res } = await this.$http.get('house/sale',{
               params:house
           });
           
           // 交互反馈
           if(res.meta.status !==200) return this.$message.error(res.meta.msg);
           this.$message.success(res.meta.msg);
           
       }, 

       // 发布房源
       createHouse(){
           this.$router.push("add_house");
       }, 

       // 清除搜索内容
        clearInput(){
            this.words = "";
            this.getHouseList();
        },

        // 搜索房源
        search(){
            this.getHouseList();
        },

       //切换每页显示条数
        handleSizeChange(size){
           this.pageSize = size;
           this.getHouseList();
        },
        
        // 切换页码
        handleCurrentChange(page){
           this.currentPage = page;
           this.getHouseList();
        },
        
        // 获取房源
        async getHouseList(){

            let url = 'house/list?page='+this.currentPage;
            let { data:res } = await this.$http.get(url,{
               params:{ size:this.pageSize,words:this.words }
            });

            // state 1,0  转换为 true,false
            res.data.map(item=>{
                 item.state = item.state == 1 ?true:false
                 return item;
            })
          
           this.houseList =res.data;
           this.total = res.total;

        }

    },
}
</script>

<style lang="less" scoped>

</style>

