<template>
  <el-row>
    <el-row :gutter="15">
        <div class="scard">
        <el-input placeholder="输入学号查找"
                  v-model="searchtext"
                  @keyup.native.enter="searchtitle">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchtitle"></el-button>
        </el-input>
        </div>
    </el-row>
  <el-card shadow="always">
      <el-table :data="tableData" @cell-click="userclick" size="small" >
        <el-table-column prop="username" label="User"></el-table-column>
        <el-table-column prop="ranking" label="Ranking"></el-table-column>
        <el-table-column prop="ac" label="AC"></el-table-column>
        <el-table-column prop="submit" label="Submit"></el-table-column>
        <el-table-column prop="rate" label="AC/Submit"></el-table-column>
      </el-table>
    <center>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totaluser"
      ></el-pagination>
    </center>
  </el-card>
  </el-row>
</template>

<script>
export default {
  name: "rank",
  data() {
    return {
      currentpage: 1,
      pagesize: 50,
      totaluser: 10,
      tableData: [],

      searchtext: "",
    };
  },
  methods: {
    userclick(row, column, cell, event) {
      this.$router.push({
        name: "user",
        query: { username: row.username }
      })
    },
    getData(limit, offset) {
      this.$axios
        .get("/userdata/?limit=" + limit + "&offset=" + offset)
        .then(response => {
          this.tableData = response.data.results;
          this.totaluser = response.data.count;
        })
        .catch(error => {
          this.$message.error(
            "服务器错误！" + "(" + JSON.stringify(error.response.data) + ")"
          );
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData(this.pagesize, (this.currentpage - 1) * this.pagesize);
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.getData(this.pagesize, (this.currentpage - 1) * this.pagesize);
    },
    searchtitle () {
      this.currentpage = 1;
      this.$axios
        .get("/userdata/?limit=" + this.pagesize + "&offset=" + (this.currentpage - 1) * this.pagesize +
          "&search=" +
          this.searchtext)
        .then(response => {
          //console.log(response.data.results[0])
          this.tableData = response.data.results;
          this.totaluser = response.data.count;
        })
        .catch(error => {
          this.$message.error(
            "服务器错误！" + "(" + JSON.stringify(error.response.data) + ")"
          );
        });
    },
  },
  mounted() {
    this.$axios
      .get("/userdata/?limit=15&offset=0")
      .then(response => {
        this.tableData = response.data.results;
        this.totalproblem = response.data.count;
      });
  }
}
</script>

<style scoped>

.scard{
  width: 20%;
  margin-left: 75%;
}
</style>
