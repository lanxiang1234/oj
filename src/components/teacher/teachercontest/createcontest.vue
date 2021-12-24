<template>
  <div>
    <el-col :span="18">
      <el-card>
        <el-form ref="form1" :model="form" label-width="150px">
          <el-form-item label="contest_name">
            <el-col :span="5">
            <el-input v-model="contestname" placeholder="contest_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="start_time">
            <el-col :span="5">
            <el-date-picker type="date" placeholder="select_date" v-model="startdata" ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="5">
              <el-time-picker type="fixed-time" placeholder="select_time" v-model="starttimee" ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="end_time">
            <el-col :span="5">
              <el-date-picker type="date" placeholder="select_date" v-model="enddata" ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="5">
              <el-time-picker type="fixed-time" placeholder="select_time" v-model="endtimee" ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="add contest">
            <el-button type="primary" @click="add">add problem</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">create contest</el-button>
            <el-button>cancel</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>

<!--    <el-dialog title="添加题目" :visible="addproblemForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>-->
<!--      <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">-->
<!--        <el-form-item label="学号" prop="id">-->
<!--          <el-input  v-model="addsForm.id" max-length="10"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="姓名" prop="name">-->
<!--          <el-input v-model="addsForm.name"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="专业" prop="major">-->
<!--          <el-input v-model="addsForm.major"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="班级" prop="class">-->
<!--          <el-input v-model="addsForm.class"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="studentAdd()">确定</el-button>-->
<!--          <el-button @click="addstudentForm = false">取消</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "createcontest",
  data () {
    return {
      form1: {
        contestname: '',
        startdata: '',
        enddata: '',
        starttimee: '',
        endtimee:'',
        problem:[],
      }
    }
  },
  methods: {
    add(){

    },

    onSubmit(){
      let addcontest=this.form1;
      let {contestname,startdata,starttimee,enddata,endtimee} = addcontest;
      if(contestname==''){
        this.$message.error('新增内容缺失信息')
      }else{
        this.$axios.post("/contestadd", this.form1).then(response => {
          this.$message({
            message: "提交成功！",
            type: "success"
          });
        })
          .catch(error => {
            this.$message.error("服务器错误!");
          });
      }
    },


  },
  created() {
    //权限
    // if(sessionStorage.getItem("type") != "teacher"){
    //   this.$message.error('您没有权限访问本页面，请登录！');
    //   console.log(this.$router);
    //   this.$router.push({
    //     path: '/'
    //   });
    // }
  }
}
</script>

<style scoped>

</style>
