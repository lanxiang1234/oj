<template>
  <el-container>


    <el-dialog :visible.sync="dialogVisible" width="30%" style=" text-align: center;" :before-close="handleClose">
      <!-- <repassword></repassword> -->
      <span>Congratulation!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">查看详情</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>

export default {
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
  components:{
    // repassword
  }
};
</script>
<style>

</style>
