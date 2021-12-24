<template>
  <el-row :gutter="15">
    <el-card>
      <el-col >
        <h3>提交情况</h3>
        <el-card>
          <el-alert
            title="Program Message:"
            :type="compilemsg=='编译成功！'?'success':'warning'"
            :description="compilemsg"
            :closable="false"
            show-icon
            :show-close="false"
          ></el-alert>
          <el-row :gutter="18">
            <div style="margin-right:50px;word-break:break-all;white-space:pre-line;"
                 v-html="more"></div>
          </el-row>
          <el-alert title="你的代码：" type="info" :closable="false">
            <el-button
              size="mini"
              v-clipboard:copy="code"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >Copy</el-button>
          </el-alert>

          <codemirror v-model="code" :options="cmOptions"></codemirror>

        </el-card>

      </el-col>

    </el-card>
  </el-row>
</template>

<script>
export default {
  name: "submit",
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        mode: "text/x-c++src",
        theme: "base16-light",
        lineNumbers: true,
        readOnly: true,
        viewportMargin:Infinity,
        lineWrapping:true,
      },
      compilemsg:"",
      code:"",
      more:"",
      timer:0
    }
  },
  created() {
  var lastname = sessionStorage.getItem("code");
  this.code=lastname
  console.log(lastname);
},
  methods: {
    onCopy(e) {
      this.$message.success("复制成功！");
    },
    // 复制失败
    onError(e) {
      this.$message.error("复制失败：" + e);
    },
    getdata() {
      if(this.compilemsg!=null){
        clearInterval(this.timer)
      }
      this.$axios
        .get("/resultdata?")
      .then(response => {
        this.compilemsg=response.data.result;
      });
      //this.compilemsg="sa";
    }
  },
  mounted(){
    if(this.timer){
      clearInterval(this.timer)
    }else{
      this.timer = setInterval(()=>{
        this.getdata(),
          //this.compilemsg="sa",
        console.log('hello')
      },1000)
    }
  },
  destroyed(){
    clearInterval(this.timer)
  },
}
</script>

<style scoped>

</style>
