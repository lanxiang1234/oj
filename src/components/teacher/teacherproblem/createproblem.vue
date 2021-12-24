<template>
  <div>
    <el-col :span="18">
      <el-card>
        <el-form ref="form2" :model="form" label-width="150px">
          <el-form-item label="problemid">
            <el-col :span="5">
              <el-input v-model="problemid" placeholder="problemid" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="problemname">
            <el-col :span="5">
              <el-input v-model="problemname" placeholder="problemname" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="input">
            <el-col :span="5">
              <el-input v-model="input" placeholder="input"  clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="output">
            <el-col :span="5">
              <el-input v-model="output" placeholder="output" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="output">
            <el-col :span="5">
              <el-input v-model="output" placeholder="output" clearable></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addinandout">add test input and output</el-button>
          </el-form-item>

          <el-dialog title="添加测试样例" :visible="addtest" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
            <el-form ref="editsForm" :model="editsForm" label-width="80px">
              <el-form-item label="测试数量" prop="number">
                <el-input  v-model="editsForm.number" max-length="10"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="contestedit">确定</el-button>
                <el-button @click="editcontestForm = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

<!--          <el-form-item label="sampleinput">-->
<!--            <el-col :span="5">-->
<!--              <el-input v-model="sampleinput1" placeholder="sample1"></el-input>-->
<!--            </el-col>-->
<!--            <el-col class="line" :span="1">-</el-col>-->
<!--            <el-col :span="5">-->
<!--              <el-input v-model="sampleinput2" placeholder="sample2"></el-input>-->
<!--            </el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="sampleoutput">-->
<!--            <el-col :span="5">-->
<!--              <el-input v-model="sampleoutput1" placeholder="sample1"></el-input>-->
<!--            </el-col>-->
<!--            <el-col class="line" :span="1">-</el-col>-->
<!--            <el-col :span="5">-->
<!--              <el-input v-model="sampleoutput2" placeholder="sample2"></el-input>-->
<!--            </el-col>-->
<!--          </el-form-item>-->
          <el-form-item label="Description:">
            <el-input type="textarea" :rows="10" placeholder="description" v-model="description" clearable></el-input>
            <el-divider></el-divider>
          </el-form-item>
          <el-form-item label="Hints:">
            <el-input type="textarea" :rows="5" placeholder="hints" v-model="hints" clearable></el-input>

            <el-divider></el-divider>
          </el-form-item>

             <el-col class="line" :span="7">-</el-col>
            <el-button type="primary" @click="onSubmit">add</el-button>

            <el-button>cancel</el-button>



        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>

export default {
  name: "createproblem",
  data() {
    return {
      addtest:false,
      form2: {
        problemid: '',
        problemname: '',
        input: '',
        output: '',
        sampleinput1: '',
        sampleinput2: '',
        sampleoutput1: '',
        sampleoutput2: '',
        description:'',
        hints:''
      }
    }

  },
  methods: {
    addproblem() {

    },
    closeDialog(){
      this.editsForm = false;
    },

    onSubmit(){
      let addproblem=this.form2;
      let {problemid,problemname,input,output,sampleinput1,sampleinput2,sampleoutput1,sampleoutput2,description,hints} = addproblem;
      if(problemid==''||problemname==''||input==''||output==''){
        this.$message.error('新增内容缺失信息')
      }else{
        this.$axios.post("/problemadd", this.form2).then(response => {
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


  },

}
</script>

<style scoped>
.el-textarea {
  width: 400px;
}
</style>
