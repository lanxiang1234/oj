<template>
  <el-card shadow="always">
    <h3>{{title}}</h3>
    <el-row :gutter="10">
      <el-col :span="3">
        <b>in progress:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="inpro" status="inpro"></el-progress>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3">
        <b>end:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="end" status="end"></el-progress>
      </el-col>
    </el-row>


  </el-card>
</template>

<script>
export default {
  name: "contestprogres",
  data() {
    return {
      inpro: 100,
      end: 100,
      title: "progress",
    };
  },
  created() {
  },
  methods: {
    setdata(d){
      this.inpro=d.inpro
      this.end=d.en
      this.title=d.title
    }
  }
}
</script>

<style scoped>
#leveltag {
  text-align: center;
  font-weight: bold;
}
.el-row {
  margin-bottom: 20px;
}
</style>
