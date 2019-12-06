<template>
    <div class="house-container">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房源管理</el-breadcrumb-item>
            <el-breadcrumb-item>房源详情</el-breadcrumb-item>
        </el-breadcrumb>

          <el-card>

                <div class="house-body">

                    <h3>{{house.title}}</h3>
                    <el-carousel indicator-position="outside">
                        <el-carousel-item v-for="imgUrl in house.imgs" :key="imgUrl">
                        <img :src="imgUrl"/>
                        </el-carousel-item>
                    </el-carousel>
                
                    <p class="sub_title">
                        <span>发布人：{{house.name}}</span> 
                        <span class="created_at">发布时间：{{house.created_at}}</span>
                    </p>

                    <p class="detail">{{house.des}}</p>
                </div>
            </el-card>
    </div>
</template>

<script>
export default {

    data(){
       return {
           house:{}
       }
    },
    created() {

        let id = this.$route.query.id;
        this.getHouseDetail(id);

    },

    methods:{

        // 获取房源详情
        async getHouseDetail(id){

            let {data:res} = await this.$http.get('house/detail/'+id);
            this.house = res;
            console.log(res);

        }


    }
}
</script>

<style lang="less" scoped>
.house-body{
    width:750px;
}

.sub_title{
    font-size: 16px;
    border-bottom:1px #ddd solid;
    line-height: 40px;
}

.created_at{
    padding-left:50px;
}

.detail{
    line-height: 30px;
    font-size: 16px;
}
</style>