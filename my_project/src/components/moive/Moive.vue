<template>
  <el-container  v-loading.fullscreen.lock="loading">
    <el-aside width='250px'>
      <h2 class="moive-list-title">电影榜单</h2>
      <div class="movie-billboard clearfix">
        <moive-item v-for="(value,index) in list" :key="index" :info='value' @toggle="toggleInfo"></moive-item>
      </div>
    </el-aside>
    <el-main>
        <moive-search :moiveName='activatedInfo.name'></moive-search>
        <div class="moive-list">
          <moive-info v-for="(value,index) in subjects" :key='index' :subject='value'></moive-info>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-size="pagination.pageSize"
            layout="prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import jsonp from "jsonp";
import MoiveItem from './MoiveItem'
import MoiveSearch from './MoiveSearch'
import MoiveInfo from './MoiveInfo'
export default {
  name: 'Moive',
  components:{
    MoiveItem,
    MoiveSearch,
    MoiveInfo
  },
  data () {
    return {
      list:[
        {
          name:'TOP250',
          api:'top250',
          cover:'',
          color:'#20A0FF'
        },
        {
          name:'正在热映',
          api:'in_theaters',
          cover:'',
          color:'#13CE66'
        },
        {
          name:'即将上映',
          api:'coming_soon',
          cover:'',
          color:'#F7BA2A'
        },
      ],
      activatedInfo:{},
      subjects:[],
      pagination:{
        currentPage:1,
        pageSize:10,
        total:0
      },
      loading:false,
    }
  },
  methods:{
    toggleInfo(info){
      this.activatedInfo = info;
      this.paginate(); 
    },
    paginate(){
      let count = this.pagination.pageSize
      let start = (this.pagination.currentPage-1)*count
      let api=this.activatedInfo.api;
      this.loading=true;
      jsonp('https://api.douban.com/v2/movie/'+api+'?start='+start+'&count='+count, null, (err,data) =>{
        if(err){
          this.loading =false;
          console.log(err.message)
        }else{
          this.loading=false;
          this.pagination.total=data.total;
          this.subjects=data.subjects;
        }
      })
    },
    handleCurrentChange(current){
      this.pagination.currentPage=current;
      this.paginate();
    }
  },
  beforeMount(){
    this.toggleInfo(this.list[0])
  },
  mounted(){
    this.list.forEach((info,index) => {
      jsonp('https://api.douban.com/v2/movie/'+info.api+'?start=0+&count=1', null, (err,data)=>{
        if(err){
          console.log(err.message)
        }else{
          this.list[index].cover = data.subjects[0].images.large;
        }
      })
    })
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
  padding:0 25px;
}
.el-aside {
  background: #f6f6f6;
}
.moive-list {
  padding: 20px;
}
</style>
