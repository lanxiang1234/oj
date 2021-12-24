<template>
  <el-row>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="problem">
        <el-col :span="4">
          <el-input v-model="form.problemid" placeholder="problem_id"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="4">
          <el-input v-model="form.submissionid" placeholder="submission_id"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="language">
        <el-select v-model="form.language" placeholder="select language">
          <el-option label="Java" value="java"></el-option>
          <el-option label="Python" value="python"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="time">
        <el-col :span="5">
          <el-date-picker type="date" placeholder="select_date" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="5">
          <el-time-picker type="fixed-time" placeholder="select_time" v-model="form.time" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="mine code">
        <el-switch v-model="form.mine"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">search</el-button>
        <el-button>cancel</el-button>
      </el-form-item>
    </el-form>


    <div class="clearFix"></div>

    <el-card shadow="always">

      <el-table :data="tableData"
                @cell-click="userclick"
                size="small">

        <el-table-column prop="id"
                         label="ID"
                         :width="150"
                         :align="center"></el-table-column>
        <el-table-column prop="problem"
                         label="Problem"
                         :width="250"
                         :align="center"></el-table-column>
        <el-table-column prop="level"
                         label="Level"
                         :width="150"
                         :align="center"></el-table-column>
        <el-table-column prop="status"
                         label="Status"
                         :width="150"
                         :align="center">
          <template slot-scope="scope1">
            <el-tag id="statustag"
                    size="medium"
                    :type="statuslevel(scope1.row.level)"
                    disable-transitions
                    hit>{{ scope1.row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score"
                         label="Score"
                         :width="150"
                         :align="center"></el-table-column>
        <el-table-column prop="timeuse"
                         label="time Usage"
                         :width="200"
                         :align="center"></el-table-column>
        <el-table-column prop="memoryuse"
                         label="Memory Usage"
                         :width="200"
                         :align="center"></el-table-column>
        <el-table-column prop="code"
                         label="Code"
                         :width="100"
                         :align="center"></el-table-column>
        <el-table-column prop="user"
                         label="User"
                         :width="150"
                         :align="center"></el-table-column>
        <el-table-column prop="time"
                         label="Time"
                         :width="300"
                         :align="center"></el-table-column>
      </el-table>
      <center>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentpage"
                       :page-sizes="[15, 20, 30, 50]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalproblem"></el-pagination>
      </center>
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
      tableData: [],
      searchoj: "SustechOJ",
      form: {
        problemid: '',
        submissionid: '',
        date: '',
        time: '',
        mine: false,
        language: ''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    statuslevel: function (type) {
      if (type == "Easy") return "info";
      if (type == "Medium") return "success";
      if (type == "Hard") return "";
      if (type == "VeryHard") return "warning";
      if (type == "ExtremelyHard") return "danger";
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.$axios
        .get(
          "/problemdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize +
          "&search=" +
          this.form
        )
        .then(response => {
          this.tableData = response.data.results;
          this.totalproblem = response.data.count;
        });
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.$axios
        .get(
          "/problemdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize +
          "&search=" +
          this.form
        )
        .then(response => {
          this.tableData = response.data.results;
          this.totalproblem = response.data.count;
        });
    },

    userclick: function (row, column, cell, event) {
      this.$router.push({
        name: "userhomepage",
        query: {userID: row.user}
      });
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
