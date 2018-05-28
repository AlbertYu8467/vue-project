<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active='activeIndex' class="el-menu-demo" mode='horizontal' :router=true>
          <el-menu-item index='/'>首页</el-menu-item>
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
body {
  background: #f6f6f6;  
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
