<template>
  <div id="app"
       style="top:0px;left:0px;">
    <el-menu :default-active="$route.path"
             mode="horizontal"
             v-bind:router="true"
             id="nav">
      <el-menu-item index="/"
                    id="title">{{school}}</el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-star-off"></i>Home
      </el-menu-item>
      <el-menu-item index="/problem">
        <i class="el-icon-menu"></i>Problem
      </el-menu-item>
      <el-menu-item index="/status">
        <i class="el-icon-tickets"></i>Status
      </el-menu-item>
      <el-menu-item index="/contest">
        <i class="el-icon-bell"></i>Contest
      </el-menu-item>
      <el-menu-item index="/rank">
        <i class="el-icon-star-on"></i>Rank
      </el-menu-item>

      <el-button round
                 id="button"
                 @click="registeropen"
                 v-show="!loginshow">Register</el-button>
      <el-button round
                 id="button"
                 @click="loginopen"
                 v-show="!loginshow">Login</el-button>

      <el-dropdown id="user"
                   v-show="loginshow"
                   @command="handleCommand"
                   :show-timeout="100"
                   :split-button="true">
        <span class="el-dropdown-link">Welcome {{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">Home</el-dropdown-item>
          <el-dropdown-item command="submittion">Submittion</el-dropdown-item>
          <el-dropdown-item command="setting">Setting</el-dropdown-item>
          <el-dropdown-item command="admin"
                            divided
                            v-show="isadmin">Admin</el-dropdown-item>
          <el-dropdown-item command="logout"
                            divided>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>

    <register ref="registerdialog"></register>

    <login ref="logindialog"></login>

    <el-backtop :bottom="50">
      <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">UP</div>
    </el-backtop>

    <transition name="el-fade-in-linear"
                mode="out-in">
      <router-view id="route"></router-view>
    </transition>

    <div class="footer">
      <p>

        ooad project

      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    "login":resolve=>require(['@/login'],resolve),
    "register":resolve=>require(['@/register'],resolve)
  },
  data () {
    return {
      school: "SustechOJ",
      loginshow: 0,
      username: sessionStorage.username,
      isadmin: true
    };
  },
  mounted () {


  },
  methods: {
    loginopen () {
      this.$refs.logindialog.open();
    },
    registeropen () {
      this.$refs.registerdialog.open();
    },

    handleCommand (command) {
      if (command == "logout") {
        this.$axios
          .get("/logout/")
          .then(response => {
            this.$message({
              message: "登出成功！",
              type: "success"
            });
            sessionStorage.setItem("username", "");
            sessionStorage.setItem("rating", "");
            sessionStorage.setItem("type", "");
            this.loginshow = 0;
            this.username = "";
            this.$router.go(0);
          })
          .catch(error => {
            this.$message.error(
              "服务器错误！" + "(" + JSON.stringify(error.response.data) + ")"
            );
          });
      }
      if (command == "home") {
        this.$router.push({
          name: "userhome",
          query: { username: sessionStorage.username }
        });
      }
      if (command == "setting") {
        this.$router.push({
          name: "setting",
          params: { username: sessionStorage.username }
        });
      }
      if (command == "submittion") {
        this.$router.push({
          name: "status",
          query: { username: sessionStorage.username }
        });
      }
      if (command == "admin") {
        this.$router.push({
          name: "teacherhome"
        });
      }
    }
  }
};
</script>

<style scope>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
#button {
  float: right;
  margin: 10px;
}
#user {
  float: right;
  margin: 10px;
}
#nav {
  background-color: #ffffff;
  position: relative;
  left: 0px;
  top: 0px;
  z-index: 5;
  width: 100%;
  /* box-shadow: 00px 0px 00px rgb(255, 255, 255),
    0px 0px 10px rgb(255, 255, 255),
     0px 0px 0px rgb(255, 255, 255),
     1px 1px 0px rgb(218, 218, 218);  */
}
#route {
  position: relative;
  top: 10px;
}
#title {
  font-size: 20px;
  font-weight: bold;
}
.el-row {
  margin-bottom: 20px;
}
.footer {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: small;
}
</style>
