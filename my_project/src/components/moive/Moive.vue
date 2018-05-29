<template>
  <el-container>
    <el-aside width='250px'>
      <h2 class="moive-list-title">电影榜单</h2>
      <div class="movie-billboard clearfix">
        <moive-item v-for="(value,index) in colorList" :key="index" :background='value'></moive-item>
      </div>
    </el-aside>
    <el-main>
        <moive-search></moive-search>
    </el-main>
  </el-container>
</template>

<script>
import MoiveItem from './MoiveItem'
import MoiveSearch from './MoiveSearch'
export default {
  name: 'Moive',
  components:{
    MoiveItem,
    MoiveSearch
  },
  data () {
    return {
      colorList:['#20A0FF','#13CE66','#F7BA2A']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moive-list-title {
  font-size: 18px;
  color:#58B7FF;
  padding:15px 0; 
}
.movie-billboard {
  margin-bottom: 15px;
  padding: 25px;
  padding-top:0; 
}
.el-aside {
  background: #f6f6f6;
}
</style>
