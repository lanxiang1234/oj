<template >
<el-row>
  <el-row>

<el-col :span="12" >
      <h2 >Name:{{username}}</h2>
      <h4 >Ac: {{ ac }}</h4>
      <h4 >Submit: {{ submit }}</h4>
</el-col>
    <el-col :span="12">
      <center>
      <div id="main1" style="float:left;margin-left:10%;width:100%;height: 300px"></div>
      </center>

    </el-col>
  </el-row>

  <el-row :gutter="15" >
  <el-table :data="tableData" @cell-click="problemclick" size="small" >
    <el-table-column prop="problem" label="Problem ID"></el-table-column>
    <el-table-column prop="problemtitle" label="Problem Title"></el-table-column>
    <el-table-column prop="status" label="Status"></el-table-column>
    <el-table-column prop="subtime" label="Submit time"></el-table-column>
  </el-table>
    <center>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentpage"
    :page-sizes="[10, 20, 30, 50]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalproblem"
  ></el-pagination>
    </center>
  </el-row>
</el-row>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "userhomepage"  ,
  data () {
    return {
      username: "",
      name: "",
      currentpage: 1,
      pagesize: 15,
      totalproblem: 10,
      tableData: [],
      submit:100,
      ac:10,
      wa:0,
      tle:5,
      mle:0,
      re:0,
      pe:0,
      ce:0
    };
  },
  created() {

    // console.log("sagfw")
    if(sessionStorage.getItem("username") == 1){
      this.$message.error('您没有权限访问本页面，请登录！');
      console.log(this.$router);
      this.$router.push({
        path: '/'
      });
    }
    this.ac=ac;
    this.username = this.$route.query.username;
    if (this.username) {
      this.$axios.get("/user/?username=" + this.username).then(response => {
        this.name = response.data[0].name;
      });

      this.$axios.get("/stautsdata/?username=" + this.username).then(response => {
        this.tableData = response.data[0].tableData;
        this.submit=response.data[0].submit;
        this.ac=response.data[0].ac;
        this.wa=response.data[0].wa;
        this.tle=response.data[0].tle;
        this.mle=response.data[0].mle;
        this.re=response.data[0].re;
        this.pe=response.data[0].pe;
        this.ce=response.data[0].ce;
      });
    }
  },
  methods: {


    problemclick: function (row, column, cell, event) {
      this.$router.push({
        name: "problemdetail",
        query: {problemID: row.problem}
      });
    },
    drawLine() {
      var myChart = echarts.init(document.getElementById('main1'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '提交情况',//主标题
          x: 'center',//x轴方向对齐方式

        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['ac', 'wa', 'tle', 'mle', 're', 'pe', 'ce']
        },
        series: [
          {
            name: '提交统计',
            type: 'pie',
            radius: 100,
            center: ['50%', '50%'],
            data: [
              {value: this.ac, name: 'ac'},
              {value: this.wa, name: 'wa'},
              {value: this.tle, name: 'tle'},
              {value: this.mle, name: 'mle'},
              {value: this.re, name: 're'},
              {value: this.pe, name: 'pe'},
              {value: this.ce, name: 'ce'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    getData(limit, offset) {
      this.$axios
        .get("/userdata/?limit=" + limit + "&offset=" + offset)
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData(this.pagesize, (this.currentpage - 1) * this.pagesize);
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.getData(this.pagesize, (this.currentpage - 1) * this.pagesize);
    },
  },
  mounted: function () {
    this.drawLine()
  },
}
</script>
.chart-container {
width: 100%;
float: left;
}
.el-col {
padding: 30px 20px;
}
<style scoped>

</style>
