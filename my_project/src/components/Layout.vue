<template>
  <el-container class="container">
    <el-header>
      <el-menu :default-active='activeIndex' class="el-menu-demo" mode='horizontal' :router=true active-text-color="#ffd04b">
        <el-menu-item index='/home'>
          <i class="el-icon-star-on"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index='/moive'>
          <template slot='title'>娱乐</template>
          <el-menu-item index='/moive'>电影</el-menu-item>
          <el-menu-item index='/music'>音乐</el-menu-item>
          <el-menu-item index='/tearcloth'>信仰之跃</el-menu-item>
          <el-menu-item index='/five'>五子棋</el-menu-item>
          <el-menu-item index='/live'>直播</el-menu-item>
        </el-submenu>
        <el-submenu index='/history'>
          <template slot="title">知识</template>
          <el-menu-item index='/history'>历史今天</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
        activeIndex:this.$route.path,
    }
  },
  methods:{
    handleSelect(key,path){
      // console.log(key,path)
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>
