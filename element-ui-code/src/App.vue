<template>
  <div id="app">

    <!-- button -->
    <!-- <el-button type="success"
     @click="upload"
     loading
     round plain  icon="el-icon-edit">
     编辑按钮
  </el-button>
  <el-button type="text">文本</el-button>
  <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button> -->

  <!-- 容器式组件 -->
  <!-- <el-button-group>
    <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
    <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>   -->

  <!-- <el-button-group>
    <el-button type="primary" icon="el-icon-edit"></el-button>
    <el-button type="primary" icon="el-icon-share"></el-button>
    <el-button type="primary" icon="el-icon-delete"></el-button>
  </el-button-group> -->

  <!-- badge -->
  <el-badge :value="12"  class="item">
    <el-button size="small">评论</el-button>
  </el-badge>
  <el-badge :value="12" :max="9" class="item">
    <el-button size="small">评论</el-button>
  </el-badge>
  <el-badge value="new" type="primary"   class="item">
    <el-button size="small">评论</el-button>
  </el-badge>

  <el-badge is-dot class="item" :hidden="isHideDot">
    数据
  </el-badge>

  </div>
</template>

<script>

import ElButton from './components/ElButton'
import ElButtonGroup from './components/ElButtonGroup'
import ElBadge from './components/ElBadge'

export default {
  name: 'App',
  data() {
    return {
      isHideDot: false
    }
  },
  components: {
    ElButton,
    ElButtonGroup,
    ElBadge
  },
  methods: {
    upload(e) {
      console.log(e)
      // console.log(a)
    }
  },
  mounted() {
    setTimeout(() => {
      this.isHideDot = true
    },3000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  margin-right: 20px;
}
</style>
