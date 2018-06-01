<template>
  <el-container>
    <el-main>
      <el-row style="color:#EE6342">
        <el-col :span="1"><i class="el-icon-location"></i></el-col>
        <el-col :span="2">{{this.cityName}}</el-col>
        <el-col :span="12" :offset="6">
          <el-input placeholder="请输入城市名" v-model="cityName" size="small">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>            
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col>
          <div class="hotCitys">
            <el-radio-group size="small" v-model="cityName" fill="#409EFF">
              <el-radio-button v-for="(value,index) in hotCitys" :key="index" :label="value.location"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <div class="wea_weather">
        <em>{{this.nowWeather.tmp}}</em>
        <span><img :src="'static/images/cond_icon_heweather/'+this.nowWeather.cond_code+'.png'" alt=""></span>
        <b>{{this.nowWeather.cond_txt}}</b>
      </div>
      <div class="wea_about">
        <span>湿度 {{this.nowWeather.hum}}</span>
        <em>{{this.nowWeather.wind_dir+"&nbsp;"+this.nowWeather.wind_sc+" 级"}}</em>
        <em>风速 {{this.nowWeather.wind_spd}}</em>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import jsonp from 'jsonp'
export default {
  name: 'Index',
  components:{    
    
  },
  data () {
    return {
      key:'8e90ad937cc44c14a9964cd9d570e887',
      hotCitys:[],
      nowWeather:{},
      cityName:'广州'
    }
  },
  methods:{
    searchCity(){
      this.axios.get('https://search.heweather.com/top?key=8e90ad937cc44c14a9964cd9d570e887&group=cn').then((res) => {
        this.hotCitys = res.data.HeWeather6[0].basic
      })
    },
    searchNowWeather(){
      this.axios.get('https://free-api.heweather.com/s6/weather/now?key=8e90ad937cc44c14a9964cd9d570e887&location='+this.cityName).then((res)=>{
        console.log(res.data)
        this.nowWeather = res.data.HeWeather6[0].now
      })
    }
  },
  beforeMount(){
    this.searchCity();
    this.searchNowWeather();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  background: rgba(0, 0, 0, .3)
}
  .el-row {
    margin-bottom: 10px;
    }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .wea_weather {
    display: flex;
    color: #fff;
    height: 150px;
    align-items: flex-end;
  }
  .wea_weather em {
    font-size: 120px;
  }
  .wea_weather b {
    color: #fff;
    font-size: 30px;
    margin-bottom: 15px;
  }
  .wea_about {
    display: flex;
    color:#fff;
  }
    .wea_about span,
    .wea_about em  {
    height: 28px;
    padding: 0 0 0 35px;
    font-weight: normal;
    font-style: normal;
    line-height: 28px;
  }
  .wea_about span {
    background: url('/static/images/i_water.png') no-repeat left top;
  }
  .wea_about em:last-child {
    margin: 0 0 0 40px;
    background: url('/static/images/i_speed.png') no-repeat left top;
  }
  .wea_about em {
    margin: 0 0 0 40px;
    background: url('/static/images/i_wind.png') no-repeat left top;
  }
</style>
