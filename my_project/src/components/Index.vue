<template>
  <el-container>
    <el-main>
      <el-row style="color:#EE6342" type="flex" align="middle">
        <el-col :span="1"><i class="el-icon-location"></i></el-col>
        <el-col :span="2" v-if='cityName'>{{this.cityName}}</el-col>
        <el-col :span='3'>{{new Date().format('yyyy-MM-dd')}}</el-col>
        <el-col :span="6" :offset="12">
          <el-input placeholder="请输入城市名" v-model="cityName" size="small" @keyup.enter.native='searchWeather'>
            <i slot="suffix" class="el-input__icon el-icon-search"></i>            
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col>
          <div class="hotCitys">
            <el-radio-group size="small" v-model="cityName" fill="#409EFF" @change='searchWeather'>
              <el-radio-button v-for="(value,index) in hotCitys" :key="index" :label="value.location"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <div class="wea_tips clearfix">
        <span>今日天气提示</span>
        <em v-if='lifestyle[0]'>{{lifestyle[0].txt}}</em>
      </div>
      <div class="wea_weather clearfix">
        <em>{{this.nowWeather.tmp}}</em>
        <span><img :src="'static/images/cond_icon_heweather/'+this.nowWeather.cond_code+'.png'" alt=""></span>
        <b>{{this.nowWeather.cond_txt}}</b>
        <i>今天 {{nowTime}} 更新</i>
      </div>
      <div class="wea_about">
        <span class="hum">湿度 {{this.nowWeather.hum}} %</span>
        <em class="dir">{{this.nowWeather.wind_dir+"&nbsp;"+this.nowWeather.wind_sc+" 级"}}</em>
        <em class="spd">风速 {{this.nowWeather.wind_spd}} km/h</em>
      </div>
      <div class="wea_about">
        <span class='fl'>体感温度 {{this.nowWeather.fl}}</span>
        <em class="pres">大气压 {{this.nowWeather.pres}} hpa</em>
        <em class="vis">能见度 {{this.nowWeather.vis}} km</em>
        <em class="pcpn">降水量 {{this.nowWeather.pcpn}} mm</em>
      </div>
      <div class="hours">
        <div class="hours-title">
            <span>24小时预报</span>
        </div>
        <div class="charts" id='hours_chart'>

        </div>
      </div>
      <div class="forecast clearfix">
        <div class="g-title">天气预报</div>
        <ul class="days clearfix" v-for="(value,index) in daily_forecast" :key="index">
          <li><span class="today">{{index == 0 ?'今天' :'星期'+getWeek(value.date)}}</span></li>
          <li>
            <span><img src="static/images/cond_icon_heweather/300.png" alt=""></span>
            {{value.cond_txt_d}}
          </li>
          <li>{{value.tmp_min+'° / '+ value.tmp_max+'°'}} </li>
          <li>
            <em>{{value.wind_dir}}</em>
            <b>{{value.wind_sc}}</b>
          </li>
          <li>
            <strong :class="'level_'+airQualitylevel">{{air_now_city.aqi +' ' + air_now_city.qlty}}</strong>
          </li>
        </ul>
      </div>
      <div class="live_index">
        <div class="live_index_title">
          <h2>生活指数</h2>
        </div>
        <div class="live_index_grid">
          <ul class="clearfix">
            <li v-for="(value,index) in lifestyle" :key="index">
              <div class="clearfix">
              <el-tooltip class="item" effect="light" :content="value.txt" placement="top-end">
                <span><img :src="'static/images/lifestyle/'+value.type+'.png'" alt=""></span>
              </el-tooltip>
                <dl>
                  <dd>{{value.brf}}</dd>
                  <dt>{{getLifestyleName(value.type)}}</dt>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/line")
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Index',
  components:{    
    
  },
  data () {
    return {
      key:'8e90ad937cc44c14a9964cd9d570e887',
      hotCitys:[],
      nowWeather:{},
      cityName:'荆州',
      nowTime:'',
      daily_forecast:[],
      lifestyle:[],
      air_now_city:{},
      airQualitylevel:1,
      hourlys:[],
      temperatureArr:[],
      timesArr:[],
    }
  },
  methods:{
    drawHourTemp(){
      this.hours_chart= echarts.init(document.getElementById('hours_chart'))
      console.log(hours_chart)
      this.hours_chart.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {
         trigger: 'axis',
         padding:10,
         backgroundColor:"transparent",
         formatter:"",
        },
        xAxis: {
          type: 'category',
          name : '时 / h',
          data: this.timesArr,
          axisLine:{  
              lineStyle:{  
                  color:'#fff',  
                  width:2,//这里是为了突出显示加上的  
              }  
          },
          axisTick:{
            inside:true
          }, 
        },
        yAxis: {
            type: 'value',
            name:'摄氏度 / °C',
            axisLine:{  
              lineStyle:{  
                  color:'#fff',  
                  width:2,//这里是为了突出显示加上的  
              }  
            },
            min:'dataMin',
            max:'dataMax',
            axisTick:{
              inside:true
            },
            axisLabel:{
              color:'#fff'
            },
            splitLine:{  
              show:false  
        　　}
        },
        series: [{
            name:'温度',
            data: this.temperatureArr,
            type: 'line',
            smooth: true,
            color:['#84D945'],
        }],
      });
    }
    ,
    getWeek(date) {
      var weeks = ["日", "一", "二", "三", "四", "五", "六"]
      var week = new Date(date).getDay();
      return weeks[week]
    },
    getLifestyleName(type){
      var lifestyles = {
        comf:'舒适度',
        cw:"洗车",
        drsg:"穿衣",
        flu:"感冒",
        sport:"运动",
        trav:"旅游",
        uv:"紫外线",
        air:"空气污染",
        ac:"空调开启",
        ag:"过敏",
        gl:"太阳镜",
        mu:"化妆",
        airc:"晾晒",
        ptfc:"交通",
        fisin:"钓鱼",
        spi:"防晒",
      }
      return lifestyles[type]
    },
    searchCity(){
      this.axios.get('https://search.heweather.com/top?key=8e90ad937cc44c14a9964cd9d570e887&group=cn').then((res) => {
        this.hotCitys = res.data.HeWeather6[0].basic
      })
    },
    searchWeather(){
      this.searchNowWeather();
      this.searchAirQuality();
    },
    searchNowWeather(){
      this.axios.get('https://free-api.heweather.com/s6/weather?key=8e90ad937cc44c14a9964cd9d570e887&location='+this.cityName).then((res)=>{
       if(res.data.HeWeather6[0].status !== 'ok') return;
        //获取接口数据
        this.nowWeather = res.data.HeWeather6[0].now
        this.nowTime = res.data.HeWeather6[0].update.loc.slice(-5)
        this.daily_forecast = res.data.HeWeather6[0].daily_forecast
        this.lifestyle = res.data.HeWeather6[0].lifestyle
        this.hourlys = res.data.HeWeather6[0].hourly

        //清空每小时温度数据数组,重新渲染
        this.temperatureArr =[],
        this.timesArr = [],
        this.hourlys.map((value,index) => {
          this.temperatureArr.push(+value.tmp)
          this.timesArr.push(value.time.slice(-5))
        })
        this.drawHourTemp()
      })
    },
    searchAirQuality(){
      this.axios.get('https://free-api.heweather.com/s6/air?key=8e90ad937cc44c14a9964cd9d570e887&location='+this.cityName).then((res)=>{
        if(res.data.HeWeather6[0].status !== 'ok') return;
        this.air_now_city = res.data.HeWeather6[0].air_now_city
        this.airQualitylevel = this.air_now_city && airQuality(this.air_now_city.aqi)
      })
    }
  },
  beforeMount(){
    $('body').addClass('bg')
  },
  mounted(){
    $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",() =>{ 
        this.cityName = remote_ip_info["city"]  
        this.searchCity();
        this.searchWeather();
        //console.log(this.cityName) 
    });
    $(".el-input__inner").on('keyup',(e)=>{
        if(e.keyCode ==13){
            this.searchWeather()
        }
    })
  },
  beforeDestroy(){
        $(".el-input__inner").off('keyup')
        $('body').removeClass('bg')
    }
}
function airQuality(qlty){
  if(qlty >= 300) return 6;
  return Math.ceil(+qlty/50)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  background: rgba(0, 0, 0, .5)
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
    position: relative;
    font-size: 120px;
  }
  .wea_weather em::before {
    content: "°";
    position: absolute;
    top: 18px;
    right: -20px;
    font-size: 48px;
}
  .wea_weather b {
    font-size: 30px;
    margin-bottom: 15px;
    margin-right: 15px;
  }
  .wea_weather i {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .wea_about {
    display: flex;
    color:#fff;
    margin-bottom: 20px;
  }
    .wea_about span,
    .wea_about em  {
    height: 28px;
    margin-right: 20px;
    padding: 0 0 0 35px;
    font-weight: normal;
    font-style: normal;
    line-height: 28px;
  }
  .hum {
    background: url('/static/images/weather_icon/i_water.png') no-repeat left top;
  }
  .spd {
    margin: 0 0 0 40px;
    background: url('/static/images/weather_icon/i_speed.png') no-repeat left top;
  }
  .spd {
    margin: 0 0 0 40px;
    background: url('/static/images/weather_icon/i_wind.png') no-repeat left top;
  }
  .fl {
     background: url('/static/images/weather_icon/i_fl.png') no-repeat left top;
     position: relative
  }
  .fl::before {
    content: "°";
    position: absolute;
    top: -2px;
    right: -8px;
    font-size: 12px;
  }
  .vis {
     background: url('/static/images/weather_icon/i_vis.png') no-repeat left top;
  }
  .pres {
     background: url('/static/images/weather_icon/i_pres.png') no-repeat left top;
  }
  .pcpn {
     background: url('/static/images/weather_icon/i_pcpn.png') no-repeat left top;
  }
  .wea_tips {
    margin: 20px 0 0;
}
.wea_tips span {
    float: left;
    height: 30px;
    color: #fff;
    font-size: 16px;
    line-height: 30px;
    padding: 0 14px;
    background: rgba(0, 0, 0, .3);
    border-radius: 14px;
}
.wea_tips em {
    float: left;
    height: 30px;
    color: #fff;
    font-size: 16px;
    font-style: normal;
    padding: 0 10px;
    line-height: 30px;
}
.forecast {
  background: rgba(0, 0 , 0, .3)
}
  .g-title {
    font-size: 20px;
    color: #fff;
    text-align: left;
    padding: 10px 0 0 20px;
}
.forecast .days {
    float: left;
    width: 715px;
    height: 58px;
    padding: 0 20px;
    font-size: 0;
    line-height: 58px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
}
.forecast .days li {
      float: left;
    color: #fff;
    font-size: 16px;
    line-height: 58px;
    text-align: left;
}
.forecast .days li:nth-child(1) {
    width: 112px;
}
.forecast .days li:nth-child(2) {
    width: 164px;
}
.forecast .days li:nth-child(3) {
    width: 142px;
}
.forecast .days li:nth-child(4) {
    width: 130px;
}
.forecast .days li:nth-child(5) {
    float: right;
}
.forecast .days li em {
    font-style: normal;
}
.forecast .days li b {
  float: right;
    font-weight: normal;
}
.forecast .days li strong {
    display: inline-block;
    vertical-align: middle;
    height: 26px;
    padding: 0 10px;
    line-height: 26px;
    font-weight: normal;
    border-radius: 13px;
}
.level_1 {
    background-color: #04E101;
}
.level_2 {
    background-color: #D7AF0E;
}
.level_3 {
    background-color: #FF7F02;
}
.level_4 {
    background-color: #FD0002;
}
.level_5 {
    background-color: #990048;
}
.level_6 {
    background-color: #7F0126;
}
.forecast .days li span {
  float: left;
    height: 58px;
    padding: 0 10px 0 0;
    line-height: 58px;
}
.forecast .days li img {
    display: inline-block;
    vertical-align: middle;
    max-width: 28px;
    max-height: 28px;
}
.forecast .days li span .today {
    height: 24px;
    padding: 0 4px;
    display: inline-block;
    vertical-align: center;
    color: rgba(255, 255, 255, .7);
    text-align: left;
    line-height: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, .7);
}
.live_index {
    width: 756px;
    margin: 20px 0 0 0;
    background: rgba(0, 0 , 0, .3);
}
.live_index_title {
    width: 100%;
    height: 44px;
    border: 1px solid rgba(255, 255, 255, .2);
    border-width: 0 0 1px 0;
}
.live_index_title h2 {
    line-height: 44px;
    padding: 0 10px 0 20px;
    color: #fff;
    font-weight: normal;
    float: left;
    font-size: 20px;
}
.live_index_grid {
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, .2);
    border-width: 0 0 1px 0;
}
.live_index_grid ul {
    margin: -1px -1px -1px 1px;
}
.live_index_grid li a {
    display: block;
}
.live_index_grid li {
    float: left;
    display: block;
    width: 188px;
    height: 76px;
    border: 1px solid rgba(255, 255, 255, .2);
    border-width: 0 1px 1px 0;
}
.live_index_grid span {
    float: left;
    width: 50px;
    height: 44px;
    margin: 17px 0 0 15px;
}
.live_index_grid span img {
    margin: 0 auto;
    display: block;
    cursor: pointer;
}
.live_index_grid dl {
    float: right;
    margin: 17px 10px 0 0;
}
.live_index_grid dt {
    font-size: 16px;
    color: #fff;
    opacity: .5;
    line-height: 20px;
    text-align: right;
}
.live_index_grid dd {
    text-align: right;
    font-size: 16px;
    color: #fff;
    line-height: 28px;
    margin-left: 10px; 
}
.hours {
  margin: 20px 0 0;
  background: rgba(0, 0 , 0, .3);
}
.hours-title {
  display: flex;
}
.hours span {
    margin: 10px 0 0 20px;
    color: #fff;
    font-size: 20px;
}
.charts {
  color: #fff;
  width: 750px;
  height: 300px;
}
</style>
