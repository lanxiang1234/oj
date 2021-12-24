<template>
  <el-card shadow="always" id="card" >
    <el-form :model="form">
      <el-row :gutter="10">
        <el-col :span="3">
          <div style="text-align:center;margin:5px;">姓名</div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="3">
          <div style="text-align:center;margin:5px;">新密码（不更改，请输入上次密码）</div>
        </el-col>
        <el-col :span="12">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="3">
          <div style="text-align:center;margin:5px;">确认密码</div>
        </el-col>
        <el-col :span="12">
          <el-input type="password" v-model="form.comfirm" autocomplete="off"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="3">
          <div style="text-align:center;margin:5px;">班级</div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.classes" autocomplete="off"></el-input>
        </el-col>
      </el-row>

    </el-form>

    <el-button type="primary" @click="updateClick">更新</el-button>
  </el-card>
</template>

<script>
export default {
  name: "setting",
  data() {
    return {
      username: "",
      name: "",
      form: {
        username: "",
        password: "",
        comfirm: "",
        classes: "",
        number: "",
      },
      userid: -1
    };
  },
  methods: {
    updateClick() {
      // if (!this.username) {
      //   this.$message.error("非法访问！");
      //   return;
      // }
      if (
        !this.form.classes
      ) {
        this.$message.error("字段不能为空！");
        return;
      }
      if (this.form.password != this.form.comfirm) {
        this.$message.error("两次密码不一致！");
        return;
      }

      if (this.form.name.length < 2) {
        this.$message.error("姓名太短！");
        return;
      }

      if (!this.form.password) {
        this.$message.error("请输入密码");
        return;
      }

      if (this.form.password.length < 6) {
        this.$message.error("密码太短！");
        return;
      }


 this.$confirm(
        "确定更新吗?",
        "如果你在参与一场比赛，请勿更新你的【昵称】，会影响排行榜计算，后果自负！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {


      this.$axios
        .put(
          "/changeone/",
          this.form
        )
            .then(
              response => {
                this.$message({
                  message: "更新成功！",
                  type: "success"
                });
                sessionStorage.setItem("name", this.form.name);
                this.$router.push({
                  name: "user",
                  query: { username: this.form.username }
                });
              },
              response => {
                this.$message.error("更新失败（" + response + "）");
              }
            );

      })
    }
  },
  created() {
    this.username = this.$route.params.username;
    this.form.username = this.username;
    if (this.username) {
      this.$axios
        .get(
          "/user/?username=" +
            this.username
        )
        .then(response => {
          this.form.name = response.data[0].name;
          this.form.classes = response.data[0].classes;
          this.userid = this.username;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
