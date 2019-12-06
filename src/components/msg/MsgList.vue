<template>
    <div class="msg-container">
       <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>消息管理</el-breadcrumb-item>
            <el-breadcrumb-item>消息列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <el-table
            border
            stripe
            :data="MsgList"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="50">
            </el-table-column>
            <el-table-column
                prop="question"
                label="问题"
                width="180">
            </el-table-column>

            <el-table-column
                prop="answer"
                label="回复"
                width="180">
            </el-table-column>

            <el-table-column
                prop="created_at"
                label="时间">
            </el-table-column>

             <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="answer(scope.row)">回复</el-button>
                </template>
            </el-table-column>

            </el-table>
        </el-card>

        <el-dialog
            title="提示"
            :visible.sync="answerDialogVisible"
            width="50%"
            >

            <el-form ref="form"  label-width="80px">
                <el-form-item label="问题">
                   <p class="question">{{msg.question}}</p> 
                </el-form-item>
                 <el-form-item label="回复">
                    <el-input v-model="msg.answer" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="answerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAnswer">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>

export default {
    
    data(){
        return {
            MsgList:[],
            answerDialogVisible:false,
            msg:{}
        }
    },

    created() {
        this.getMsgList();
    },

    methods:{
       
       // 保存回复
        async saveAnswer(){
            
            let { data:res } = await this.$http.post('msg/answer',this.msg);
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.$message.success(res.meta.msg);
            this.answerDialogVisible = false;
            this.getMsgList();

        },

        // 回复消息
        answer(msg){
            this.msg = msg;
            this.answerDialogVisible = true;

        },

        // 获取消息列表
        async getMsgList(){
            let {data:res} = await this.$http.get('msg_list');
            this.MsgList = res.data.data;
        }
        
    }
}
</script>

<style lang="less" scoped>
.question{
    border:1px #dcdfe6 solid;
    padding:0;
    padding-left:15px;
    background: #e8eaee;
}
</style>