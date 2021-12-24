<template>
  <div>
    <el-col :span="20">
      <el-card>
      <el-table :data="problemdata"
                size="small">
        <el-table-column prop="name" label="题目名字"></el-table-column>
        <el-table-column prop="level" label="题目难度"></el-table-column>
        <el-table-column prop="detail" label="简述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="contestEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="contestDelete(scope.row)">删除</el-button>
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


    <el-dialog title="编辑题目信息" :visible="editcontestForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form ref="editsForm" :model="editsForm" label-width="80px">
        <el-form-item label="题目名字" prop="name">
          <el-input  v-model="editsForm.name" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="题目难度" prop="level">
          <el-input v-model="editsForm.level"></el-input>
        </el-form-item>
        <el-form-item label="简述" prop="detail">
          <el-input v-model="editsForm.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="contestedit">确定</el-button>
          <el-button @click="editcontestForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "adminproblem",
  data () {
    return {
      editcontestForm:false,
      currentpage: 1,
      pagesize: 15,
      totalproblem: 10,
      problemdata:[{name:'1',level:'1',detail:'ss'}],
      editsForm:{
        name:'',
        level:'',
        detail:'',
      },
    };
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val;
      this.$axios
        .get(
          "/contestdata/?limit=" +
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
          "/contestdata/?limit=" +
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
      this.editcontestForm = false;
    },
    contestEdit(index,row){
      this.editcontestForm = true; //编辑信息模态框显示
      this.editsForm = Object.assign({}, row);  获得所有数据显示在编辑信息模态框里面
    },

    contestedit(){
      let studentList=this.editsForm;

      let {id,name,major,classs} = studentList;
      if(id==''||name==''||major==''||classs==''){
        this.$message.error('新增内容每一项都不准为空')
      }else{
        this.$axios.post("/contestedit", this.addsForm).then(response => {
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
    contestDelete(user){
      this.$confirm('此操作将永久删除题目 ' + user.name + ', 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          this.$axios.delete("/contestdelete", this.addsForm).then(response => {
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
      .get("/contestdata/?limit=15&offset=0")
      .then(response => {
        this.tableData = response.data.results;
        this.totalproblem = response.data.count;
      });
  }
}
</script>

<style scoped>

</style>
