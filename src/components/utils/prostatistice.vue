<template>
  <el-card shadow="always">
    <h3>{{title}}</h3>
    <el-row :gutter="10">
      <el-col :span="3">
        <b>AC:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="ac" status="success"></el-progress>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3">
        <b>WA:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="wa" status="exception"></el-progress>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3">
        <b>TLE:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="tle" color="#FF9800"></el-progress>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3">
        <b>MLE:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="mle" color="#FF9800"></el-progress>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3">
        <b>RE:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="re" color="#FF9800"></el-progress>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3">
        <b>PE:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="pe" color="#795548"></el-progress>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3">
        <b>CE:</b>
      </el-col>
      <el-col :span="21">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="ce" color="#FFC107"></el-progress>
      </el-col>
    </el-row>

  </el-card>
</template>
<script>
export default {
  name: "prostatistice",
  data() {
    return {
      ac: 100,
      wa: 100,
      tle: 100,
      mle: 100,
      re: 100,
      pe: 100,
      ce: 100,
      title: "Statistics",
    };
  },
  created() {
  },
  methods: {
    setdata(d){
        this.ac=d.ac
        this.wa=d.wa
        this.tle=d.tle
        this.mle=d.mle
        this.re=d.re
        this.pe=d.pe
        this.ce=d.ce
        this.title=d.title
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#leveltag {
  text-align: center;
  font-weight: bold;
}
.el-row {
  margin-bottom: 20px;
}
</style>
