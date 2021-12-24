<template>
  <div>
    <el-col :span="20">
      <el-card>
    <el-button type="primary" size="small" @click="addstudent()">添加学生</el-button>
        <el-button type="primary" size="small" @click="searchstudent()">查询成绩</el-button>
  <el-table :data="studentdata"
            size="small">
    <el-table-column prop="id" label="学号" width="200"></el-table-column>
    <el-table-column prop="name" label="姓名" width="200"></el-table-column>
    <el-table-column prop="major" label="专业" width="200"></el-table-column>
    <el-table-column prop="class" label="班级" width="150"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="studentEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="studentDelete(scope.row)">删除</el-button>
        <el-button type="primary" size="small" @click="studentview(scope.$index, scope.row)">查询</el-button>
        <el-button type="primary" size="small" @click="studenthome(scope.$index, scope.row)">主页</el-button>
      </template>
    </el-table-column>
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
    </el-col>

    <el-dialog title="新增学生信息" :visible="addstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
        <el-form-item label="学号" prop="id">
          <el-input  v-model="addsForm.id" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="addsForm.major"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="addsForm.class"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="studentAdd()">确定</el-button>
          <el-button @click="addstudentForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="查询学生信息" :visible="searchstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-form-item label="学号" prop="id">
          <el-input  v-model="searchForm.id" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="searchForm.major"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="searchForm.class"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="studentsearch()">确定</el-button>
          <el-button @click="searchstudentForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑学生信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form ref="editsForm" :model="editsForm" label-width="80px">
        <el-form-item label="学号" prop="id">
          <el-input  v-model="editsForm.id" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="editsForm.major"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="editsForm.class"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="studentedit">确定</el-button>
          <el-button @click="editstudentForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "tstudent",
  data () {
    return {
      addstudentForm:false,
      editstudentForm:false,
      searchstudentForm:false,
      currentpage: 1,
      pagesize: 15,
      totalproblem: 10,
      studentdata:[{id:'1',name:'1',major:'1',class:'1',ac:'1'}],
      addsForm:{
        id:'',
        name:'',
        major:'',
        class:'',
      },
      searchForm:{
        id:'',
        name:'',
        major:'',
        class:'',
      },
      editsForm:{
        id:'',
        name:'',
        major:'',
        class:'',
      },
    };
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val;
      this.$axios
        .get(
          "/studentdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize
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
          "/studentdata/?limit=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize
        )
        .then(response => {
          this.tableData = response.data.results;
          this.totalproblem = response.data.count;
        });
    },
    closeDialog(){
      this.addstudentForm = false;
      this.editstudentForm = false;
      this.searchstudentForm = false;
    },
    addstudent(){
      this.addstudentForm = true;   //原来隐藏的新增信息模态框显示
    },
    searchstudent(){
      this.searchstudentForm = true;   //原来隐藏的新增信息模态框显示
    },
    studentEdit(index,row){
      this.editstudentForm = true; //编辑信息模态框显示
      this.editsForm = Object.assign({}, row);  获得所有数据显示在编辑信息模态框里面
    },
    studentview(index,row){
      this.$router.push({
        name: "status",
        // query: {name: row.name}
      });
    },

    studenthome(index,row){
      this.$router.push({
        name: "userhome",
        query: {name: row.name}
      });
    },
    studentAdd(){
      let studentList=this.addsForm;
      let {id,name,major,classs} = studentList;
      if(id==''||name==''||major==''||classs==''){
        this.$message.error('新增内容每一项都不准为空')
      }else{
        this.$axios.post("/studentadd", this.addsForm).then(response => {
          this.$message({
            message: "提交成功！",
            type: "success"
          });
          this.submitid = response.data.id;
        })
          .catch(error => {
            this.$message.error("服务器错误!");
          });
      }
    },
    studentsearch(){
      let studentList=this.searchForm;
      let {id,name,major,classs} = studentList;
      this.currentpage = 1;
      this.$axios
        .get(
          "/studentsearch/?id=" +
          this.pagesize +
          "&offset=" +
          (this.currentpage - 1) * this.pagesize +
          "&auth=2&id=" +
          id+"&name="+name+"&major="+major+"&class="+classs
        )
        .then(response => {
          for (var i = 0; i < response.data.results.length; i++) {
            // response.data.results[i]["rate"] =
            //   response.data.results[i]["ac"] +
            //   "/" +
            //   response.data.results[i]["submission"];
            //
            // if (response.data.results[i]["tag"] == null)
            //   response.data.results[i]["tag"] = ["无"];
            // else
            //   response.data.results[i]["tag"] = response.data.results[i][
            //     "tag"
            //     ].split("|");
          }
          this.studentdata = response.data.results;
          this.totalproblem = response.data.count;
        });
    },
    studentedit(){
      let studentList=this.editsForm;

      let {id,name,major,classs} = studentList;
      if(id==''||name==''||major==''||classs==''){
        this.$message.error('新增内容每一项都不准为空')
      }else{
        this.$axios.post("/studentedit", this.addsForm).then(response => {
          this.$message({
            message: "提交成功！",
            type: "success"
          });
          this.submitid = response.data.id;
        })
          .catch(error => {
            this.$message.error("服务器错误!");
          });
      }
    },
    studentDelete(user){
      this.$confirm('此操作将永久删除学生 ' + user.name + ', 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          this.$axios.delete("/studentedit", this.addsForm).then(response => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.submitid = response.data.id;
          })
            .catch(error => {
              this.$message.error("服务器错误!");
            });
        });
    },
  },
  mounted() {
    this.$axios
      .get("/studentdata/?limit=15&offset=0")
      .then(response => {
        this.tableData = response.data.results;
        this.totalproblem = response.data.count;
      });
  }
}
</script>

<style scoped>

</style>
