<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active='activeIndex' class="el-menu-demo" mode='horizontal' :router=true active-text-color="#ffd04b">
          <el-menu-item index='/'>
            <i class="el-icon-star-on"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index='moive'>
            <template slot='title'>娱乐</template>
            <el-menu-item index='moive'>电影</el-menu-item>
          </el-submenu>
          <el-submenu index='history'>
            <template slot="title">知识</template>
            <el-menu-item index='history'>历史</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
         <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
        activeIndex:'/'
    }
  },
  methods:{
    handleSelect(key,paht){
      console.log(key,path)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6 {
  font-size: 12px;
  margin: 0;
  padding: 0;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 64%;
  margin: 0 auto;
  background: #fff;
}
</style>
