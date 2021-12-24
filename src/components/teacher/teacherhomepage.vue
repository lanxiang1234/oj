<template>
  <el-row class="tac">
    <el-col :span="4">
      <h5>管理员界面</h5>
      <el-menu
        default-active=""
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/demo" @click="goTo('/teacherhome/student')">
          <i class="el-icon-menu"></i>
          <span slot="title">管理学生</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>管理比赛</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="1-1"  @click="goTo('/teacherhome/createcontest')">创建比赛</el-menu-item>
            <el-menu-item index="1-2"  @click="goTo('/teacherhome/admincontest')">比赛列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>管理题目</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="2-1" @click="goTo('/teacherhome/createproblem')" >创建题目</el-menu-item>
            <el-menu-item index="2-2"  @click="goTo('/teacherhome/adminproblem')">题目列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
    <router-view></router-view>
  </el-row>
</template>


<script>
export default {
  name: "teacherhomepage",
  data() {
    return {};
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    }
  },
  created() {
    //权限
    // if(sessionStorage.getItem("type") != "teacher"||sessionStorage.getItem("type") != "ta"){
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
