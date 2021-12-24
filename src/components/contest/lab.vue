<template>
  <el-row>
    <el-card shadow="always">
      <el-table :data="tableData"
                @cell-click="problemclick"
                size="small">
      <el-table-column prop="problem"
                       label="ID"
                       :width="100"></el-table-column>
        <el-table-column prop="status"
                         label="Status"
                         :width="150"
        ></el-table-column>
      <el-table-column prop="title"
                       label="Title"
                       :width="400"></el-table-column>
      <el-table-column prop="level"
                       label="Level"
                       :width="200">
        <template slot-scope="scope1">
          <el-tag id="leveltag"
                  size="medium"
                  :type="problemlevel(scope1.row.level)"
                  disable-transitions
                  hit>{{ scope1.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rate"
                       label="A/S"
                       :width="200"></el-table-column>
      <el-table-column prop="tag"
                       label="Tag">
        <template slot-scope="scope">
          <el-tag id="protag"
                  v-for="(name,index) in scope.row.tag"
                  :key="index"
                  size="medium"
                  disable-transitions
                  hit>{{ name }}</el-tag>
        </template>
      </el-table-column>

      </el-table>
    </el-card>
  </el-row>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      currentpage: 1,
      pagesize: 15,
      totalproblem: 10,
      tableData: [{problem:"id",status:"ok",title:"ss",level:"ss",tag:["aa","bb"],rate:"ss"}],
      tagnames: [],
      currenttag: "",
    };
  },
  methods: {
    tagclick (name) {
      if (this.currenttag.indexOf(name) >= 0) {
        this.$refs[name][0].type = "default";
        var li = this.currenttag.split("+");
        for (var i = 0; i < li.length; i++) {
          if (li[i] == name) {
            li.splice(i, 1);
            break;
          }
        }
        this.currenttag = li.join("+");
      } else {
        this.$refs[name][0].type = "primary";
        var li = this.currenttag.split("+");
        li.push(name);
        this.currenttag = li.join("+");
      }
      this.searchtext = this.currenttag;
      this.currentpage = 1;
      this.$axios
        .get(
          "/problemdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize +
          "&search=" +
          this.searchtext
        )
        .then(response => {
          this.tableData = response.data.results;
          this.totalproblem = response.data.count;
        });
    },
    handleSizeChange (val) {
      this.pagesize = val;
      this.$axios
        .get(
          "/problemdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize +
          "&auth=1&search=" +
          this.searchtext
        )
        .then(response => {
          this.tableData = response.data.results;
          this.totalproblem = response.data.count;
        });
    },
    handleCurrentChange (val) {
      this.currentpage = val;
      this.$axios
        .get(
          "/problemdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize +
          "&auth=1&search=" +
          this.searchtext
        )
        .then(response => {
          this.tableData = response.data.results;
          this.totalproblem = response.data.count;
        });
    },
    //改变标签颜色
    problemlevel: function (type) {
      if (type == "Easy") return "info";
      if (type == "Medium") return "success";
      if (type == "Hard") return "";
      if (type == "VeryHard") return "warning";
      if (type == "ExtremelyHard") return "danger";
    },
    problemclick: function (row, column, cell, event) {
      this.$router.push({
        name: "problemdetail",
        query: { problemID: row.problem }
      });
    }
  },
  mounted () {
    this.$axios
      .get("/problemdata/?limit=15&offset=0")
      .then(response => {
        this.tableData = response.data.results;
        this.totalproblem = response.data.count;
      });

    this.$axios.get("/problemtag/").then(response => {
      for (var i = 0; i < response.data.length; i++)
        this.tagnames.push(response.data[i]["tagname"]);
    });
  }
};
</script>


<style scope>
#leveltag {
  text-align: center;
  font-weight: bold;
}
#protag {
  text-align: center;
  font-weight: bold;
  margin-right: 7px;
  margin-bottom: 7px;
}
#tag {
  text-align: center;
  font-weight: bold;
  margin-left: 2px;
  margin-bottom: 5px;
}
.el-row {
  margin-bottom: 20px;
}
.el-table .acrow {
  background: #c7ffb8;
}
</style>

