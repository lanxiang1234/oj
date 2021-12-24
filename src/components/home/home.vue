<template>
  <el-card>
    <el-col :span="10">
  <el-card>
    <div slot="header">
      <b>Welcome to Sustech OJ</b>
    </div>
    <h3>Our OJ system is designed to assist students' learning and the teaching work of teachers and teaching assistants.</h3>
    <h3>Now, start your OJ journey!</h3>
  </el-card>

  <el-card shadow="always">
    <el-table :data="tableData" size="small" >
      <el-table-column prop="rank" label="#"></el-table-column>
      <el-table-column prop="username" label="User"></el-table-column>
      <el-table-column prop="ac" label="AC"></el-table-column>
    </el-table>
  </el-card>
  </el-col>
    <el-col :span="2">
      <br>
    </el-col>
    <el-col :span="12">
    <el-card>

      <center>
        <h2 style="color:#409EFF;">欢迎来到本OJ</h2>

      </center>
      <el-divider></el-divider>
      <h2>FAQ：</h2>
      <h4>Python: Python不提供编译过程, 所以一切因为Python代码编写错误引发的错误, 均判为Runtime Error</h4>
      <h4>C++：支持__int128</h4>
      <h4>判题机会自动的去掉行末空格（不会去掉换行）</h4>
      <el-divider></el-divider>
      <h3>编译参数:</h3>
      <h4>C++: g++ -O2 -std=c++14</h4>
      <br>

    </el-card>
  </el-col>
  </el-card>

</template>

<script>
export default {
  name: "home",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.$axios.get("/userdata/?limit=" + 20 + "&offset=" + 0).then(response => {
      this.tableData = response.data.results;
    });

  },
    methods: {
  },
}
</script>

<style scoped>

</style>
