
<template>
  <el-row>
    <el-card shadow="always">


      <el-table
                 :data="tableData"
                @cell-click="titleclick"
                size="small">
        <el-table-column prop="title"
                         label="Title"

                         :width="250"></el-table-column>
        <el-table-column prop="progress"
                         label="Progress"

                         :width="200"></el-table-column>
        <el-table-column prop="start"
                         label="Start"

                         :width="330"></el-table-column>
        <el-table-column prop="end"
                         label="End"

                         :width="330"></el-table-column>
        <el-table-column prop="description"
                         label="Description"

                         :width="350"></el-table-column>
      </el-table>
    </el-card>
  </el-row>


</template>

<script>
contestprogres;
import contestprogres from "@/components/utils/contestprogres";
export default {
  components: {
    contestprogres
  },
  data () {
    return {
      tableData: [{title:'1',start:'1',end:'1',description:'1',progress:'1'}],

      PermissionData:{1:false},
      tagnames: [],
      in: 100,
      end: 100,
    };
  },
  methods: {
    titleclick: function (row, column, cell, event) {
      console.log(this.PermissionData[row.title]);
      if(this.PermissionData[row.title]==true) {
        this.$router.push({
          name: "lab",
          query: {labid: row.title}
        });
      }
      else {
        this.$message.error("时间已过，没有权限访问");
      }
    },
  },
  created() {
    this.$axios
      .get("/contestdata")
      .then(response => {
        this.tableData = response.data.results;
      });
    this.$axios
      .get("/contestPermission")
      .then(response => {
        this.PermissionData = response.data.results;
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

