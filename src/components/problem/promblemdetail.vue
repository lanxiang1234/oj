<template>

  <el-card >
      <el-row>
        <el-card shadow="always">
          <el-row :gutter="18"
                  id="title">{{this.proid+'. '}}{{title}}</el-row>
          <br>
          <el-row :gutter="18">Description</el-row>
          <el-row :gutter="18">
            <div style="margin-right:100px;word-break:break-all;white-space:pre-line;"
                 v-html="description"></div>

          </el-row>

          <el-row :gutter="18">Input</el-row>
          <el-row :gutter="18">
            <div style="margin-right:50px;word-break:break-all;white-space:pre-line;"
                 v-html="input"></div>
          </el-row>
          <el-row :gutter="18">Output</el-row>
          <el-row :gutter="18">
            <div style="margin-right:50px;word-break:break-all;white-space:pre-line;"
                 v-html="output"></div>
          </el-row>

          <el-row :gutter="18"
                  style="left:10px">
            <el-row :gutter="18"
                    v-for="(item,index) in sinput.length"
                    :key="index">
              <el-col :span="11">
                <el-row :gutter="18"
                        id="des"
                        style="margin-bottom: 0px;">Sample Input {{item}}
                  <el-button size="mini"
                                                                                    v-clipboard:copy="sinput[index]"
                                                                                    v-clipboard:success="onCopy"
                                                                                    v-clipboard:error="onError"
                                                                                    style="margin-left:8px;float:top;">Copy</el-button>
                </el-row>
                <el-row :gutter="18" style="margin-bottom: 0px;">{{sinput[index]}}</el-row>
              </el-col>
              <el-col :span="11"
                      id="text">
                <el-row :gutter="18"
                        style="margin-bottom: 0px;">Sample Output {{item}}</el-row>
                <el-row :gutter="18"
                        id="data"
                        style="margin-bottom: 0px;">{{soutput[index]}}</el-row>
              </el-col>
            </el-row>
          </el-row>

          <el-row :gutter="18">Hint</el-row>
          <el-row :gutter="18">
            <div style="margin-right:50px;word-break:break-all;white-space:pre-line;"
                 v-html="hint"></div>
          </el-row>
        </el-card>
      </el-row>

      <el-row>
        <el-card shadow="always">
          <el-row :gutter="15">
            <el-col :span="3">
              <div style="padding: 5px 10px;">Language:</div>
            </el-col>
            <el-col :span="2">
            <el-select v-model="language"
                       placeholder="请选择"
                       @change="">
              <el-option label="Java" value="java" ></el-option>
              <el-option label="Python" value="python"></el-option>
            </el-select>
          </el-col>


            <el-col :span="2">
              <el-button type="primary"
                         @click="submit"
                         style="font-weight:bold;margin-left:10px;">Submit</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary"
                         @click="code = ''"
                         style="font-weight:bold;margin-left:10px;">Reset</el-button>
            </el-col>

          </el-row>
          <el-row>
            <codemirror v-model="code"
                        :options="cmOptions"></codemirror>
          </el-row>
        </el-card>
      </el-row>

  </el-card>

</template>

<script>
export default {
  name: "promblemdetail",
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        mode: "text/x-c++src",
        theme: "base16-light",
        lineNumbers: true
      },
      title: "",
      description:"this ",
      input: "",
      output: "",
      sinput: ["124",""],
      soutput: ["", ""],
      proid: "",
      hint: "",
      code: "",
      language:"",
      submitid:-1,
    };
  },
  created () {

    this.ID = this.$route.query.problemID;
    if (!this.ID) {
      this.$message.error("参数错误" + "(" + this.ID + ")");
      return;
    }
    var auth = 1;
    this.$axios
      .get("/problem/" + this.ID + "/")
      .then(response => {
        auth = response.data.auth;
        if ((auth == 2 || auth == 3) && (sessionStorage.type == 1 || sessionStorage.type == "")) {
          this.title = "非法访问！请在比赛中访问题目！";
          this.$message.error("服务器错误！" + "(" + "无权限" + ")");
          return;
        }
        this.proid = this.ID
        this.description=response.data[0].description;
        this.input = response.data[0].input;
        this.output = response.data[0].output;
        this.sinput = response.data[0].sinput.split("|#)"); //分隔符
        this.soutput = response.data[0].soutput.split("|#)");
        this.hint = response.data[0].hint;
        this.$axios
          .get("/problemdata/" + this.ID + "/")
          .then(response => {
            this.title = response.data[0].title;

          })
      })
      .catch(error => {
        this.title = "非法访问！请在比赛中访问题目！";
        this.$message.error("服务器错误！" + "(" + JSON.stringify(error.response.data) + ")");
      });
  },
  methods: {

    onCopy (e) {
      this.$message.success("复制成功！");
    },
    // 复制失败
    onError (e) {
      this.$message.error("复制失败：" + e);
    },
    submit: function () {
      /*if (!sessionStorage.username) {
        this.$message.error("请先登录！");
        return;
      }
      if (!this.code) {
        this.$message.error("请输入代码！");
        return;
      }
      if (!this.language) {
        this.$message.error("请选择语言！");
        return;
      }

      if (this.code.length < 20) {
        this.$message.error("代码过短！");
        return;
      }*/
      this.$confirm("确定提交吗？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push('/submit');
        sessionStorage.setItem("code",this.code)
        this.$message({
          type: "success",
          message: "提交中..."
        });
        this.$axios.get("/currenttime/").then(response2 => {
          // console.log(this.userip);
          var curtime = response2.data;
          //this.$axios.get("/")
          this.$axios
            .post("/judgestatusput/", {
              user: sessionStorage.username,
              problem: this.ID,
              result: -1,
              time: 0,
              memory: 0,
              length: this.code.length,
              language: this.language,
              submittime: curtime,
              judger: "waiting for judger",
              contest: 0,
              code: this.code,
              testcase: 0,
              message:  (this.proid + ""),
              problemtitle: this.title,
            })
            .then(response => {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.submitid = response.data.id;
            })
            .catch(error => {
              this.$message.error("服务器错误！" + "(请检查编码（代码需要utf-8编码）或联系管理员)");
            });
        });
      });
    },
  },

}
</script>

<style scoped>

</style>
