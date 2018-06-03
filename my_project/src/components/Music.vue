<template>
<div class="content">
  <div class="song-container">
    <div class="el-body">
      <audio :src="cSong.src" id="player"></audio>
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="song-cover-box">
            <div class="song-cover" data-rotate="0">
              <img :src="cSong.cover" class="cover-img">
              <span class="cover-bg"></span>
            </div>
            <div class="round-top" v-bind:class='{paused:player.paused}'></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <h3 class="song-title">{{cSong.name}}</h3>
            <div class="song-info">歌手：{{cSong.singer}}&emsp;&emsp;专辑：{{cSong.album}}</div>
            <div class="lrc-wrap">
              <p class="lrc-p" v-for="(lrc,index) in player.cLrc" :data-lrc="lrc.time" :key='index'>{{lrc.word}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="n-songtb">
      <div class="u-title">
        <h3><span class="f-ff2">歌曲列表</span></h3>
        <span class="sub">{{songList.length}}首歌</span>
      </div>
      <div class="j-flag">
        <table class="m-table">
          <thead>
          <tr>
            <th class="w1"><div class="wp">#</div></th>
            <th><div class="wp">歌曲标题</div></th>
            <th class="w2"><div class="wp">时长</div></th>
            <th class="w3"><div class="wp">歌手</div></th>
            <th class="w4"><div class="wp">专辑</div></th>
          </tr>
          </thead>
          <tbody>
          <tr class="" v-for="(song,index) in songList" :key="index">
            <td class="left"><div class="hd ">
              <span class="ply" @click="toggleSong(index)">播放</span>
              <span class="num">{{'0'+(index+1)}}</span>
            </div></td>
            <td class=""><div class="text">{{song.name}}</div></td>
            <td class=""><div class="text">{{song.duration}}</div></td>
            <td class=""><div class="text">{{song.singer}}</div></td>
            <td class=""><div class="text">{{song.album}}</div></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="song-control">
    <div class="control-play">
      <span class="control-icon" @click="togglePrev">
        <i class="iconfont icon-bofangqishangyiqu"></i>
      </span>
      <span class="control-icon" @click="togglePlayer">
        <i class="iconfont icon-bofangqibofang" v-if="player.paused"></i>
        <i class="iconfont icon-bofangqizanting" v-else></i>
      </span>
      <span class="control-icon" @click="toggleNext">
        <i class="iconfont icon-bofangqishangyiqu1"></i>
      </span>
    </div>
    <div class="control-progress">
      <span class="time-start">{{player.cTime}}</span>
      <span class="time-end">{{cSong.duration}}</span>
      <div class="bar-bg" @click="toggleProgress">
        <div class="bar-current" v-bind:style="{width:player.cProcess}"></div>
      </div>
    </div>
    <div class="control-volumn">
      <span class="volumn-icon" @click="toggleMuted">
        <i class="iconfont icon-bofangqi_shengyin" v-if="!player.muted"></i>
        <i class="iconfont icon-yinliangjingyin" v-else></i>
      </span>
      <div class="bar-bg" @click="toggleVolumn">
        <div class="bar-current" v-bind:style="{width:player.cVolumn}"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
let Player,progressTimer=0,rotateTimer=0;
export default {
  data: function(){
    return {
      songList:[
        {
          id:'1',
          name:'病变',
          singer:'鞠文娴',
          album:'病变',
          cover:'static/images/music/bingbian.jpg',
          src:'static/images/music/鞠文娴 - BINGBIAN病变 (女声版).mp3',
          lrc:'static/images/music/病变.lrc',
          duration:'04:07'
        },
        {
          id:'2',
          name:'不仅仅是喜欢',
          singer:'萧全 / 孙语赛',
          album:'不仅仅是喜欢',
          cover:'static/images/music/bujinjin.jpg',
          src:'static/images/music/萧全 - 不仅仅是喜欢.mp3',
          lrc:'static/images/music/不仅仅是喜欢.lrc',
          duration:'3:48'
        },
        {
          id:'3',
          name:'佛系少女',
          singer:'贺子玲',
          album:'佛系少女',
          cover:'static/images/music/foxi.jpg',
          src:'static/images/music/贺子玲 - 佛系少女.mp3',
          lrc:'static/images/music/佛系少女.lrc',
          duration:'3:13'
        },
          {
          id:'4',
          name:'带你去旅行',
          singer:'程子康',
          album:'带你去旅行',
          cover:'static/images/music/travel.jpg',
          src:'static/images/music/程子康 - 带你去旅行.mp3',
          lrc:'static/images/music/带你去旅行.lrc',
          duration:'3:45'
        },
         {
          id:'5',
          name:'123我爱你',
          singer:'程嘉敏',
          album:'123我爱你',
          cover:'static/images/music/123.jpg',
          src:'static/images/music/程嘉敏 - 123我爱你.mp3',
          lrc:'static/images/music/123.lrc',
          duration:'3:19'
        },
         {
          id:'6',
          name:'纸短情长',
          singer:'花粥',
          album:'纸短情长',
          cover:'static/images/music/zhiduan.jpg',
          src:'static/images/music/纸短情长.mp3',
          lrc:'static/images/music/纸短情长.lrc',
          duration:'3:06'
        },
        {
          id:'7',
          name:'planet',
          singer:'ラムジ',
          album:'planet',
          cover:'static/images/music/planet.jpg',
          src:'static/images/music/planet.mp3',
          lrc:'static/images/music/planet.lrc',
          duration:'4:03'
        },
        {
          id:'8',
          name:'起风了',
          singer:'高优桥',
          album:'起风了',
          cover:'static/images/music/wind.jpg',
          src:'static/images/music/起风了.mp3',
          lrc:'static/images/music/起风了.lrc',
          duration:'3:13'
        },
      ],
      player:{
        paused:true,
        muted:false,
        cTime:'00:00',
        cProcess:'0%',
        cVolumn:'100%',
        cLrc:[]
      },
      index:0,
      cSong:{}
    }
  },
  computed:{
  },
  methods: {
    getLrc:function(){
      this.axios.get(this.cSong.lrc).then( (res) => {
        console.log(res.data)
        let lrcArr=[];
        let arr=res.data.split('[');
        arr.splice(0,1);
        arr.forEach(function(v){
          let s=v.split(']');
          lrcArr.push({
            time:s[0],
            word:s[1]
          });
        });
        this.player.cLrc=lrcArr;
      });
    },
    togglePlayer:function(){
      if(Player.paused){
        Player.play();
        this.player.paused=false;
        this.updateState();
      }else{
        Player.pause();
        this.player.paused=true;
      }
    },
    togglePrev:function(){
      let index=this.index-1;
      if(index>-1){
        this.toggleSong(index);
      }else{
        this.toggleSong(this.songList.length-1);
      }
    },
    toggleNext:function(){
      let index=this.index+1;
      if(index<this.songList.length){
        this.toggleSong(index);
      }else{
        this.toggleSong(0);
      }
    },
    //歌词滚动，封面旋转，进度条及进度时间更新
    updateState:function(){
      let _this=this;
      clearTimeout(progressTimer);
      clearTimeout(rotateTimer);
      let index=0,lrc=_this.player.cLrc;
      let $lrcWrap=$('.lrc-wrap'),h=$lrcWrap.height();
      let $cover=$('.song-cover');
      //歌词滚动
      function scrollLrc(){
        let time=_this.player.cTime;
        for(let i=0,len=lrc.length;i<len;i++){
          if(time>lrc[i].time&&(i===(len-1)||time<lrc[i+1].time)){
            if(index===i){ //不需要滚动则直接return
              return;
            }else{
              index=i; //获取需要滚动歌词行的index
              break;
            }
          }
        }
        let $lrc=$('.lrc-p').eq(index);
        $lrc.addClass("active").siblings(".active").removeClass("active");
        let top=$lrc.height()*index;
        if(top<(h/2)){
          $lrcWrap.animate({
            "scrollTop":0
          });
        }else{
          $lrcWrap.animate({
            "scrollTop":top-h/2
          });
        }
      }
      function getTwo(n){
        return n<10?'0'+n:n;
      }
      function timeFormat(t){
        let s=~~t;
        let m=~~(s/60);
        s=s-m*60;
        return getTwo(m)+':'+getTwo(s)
      }
      _this.cSong.duration=timeFormat(Player.duration);
      let update=function(){
        if(!Player.paused){
          _this.player.cTime=timeFormat(Player.currentTime);
          _this.player.cProcess=(Player.currentTime/Player.duration).toFixed(4)*100+'%';
          scrollLrc();
          progressTimer=setTimeout(update,300);
        }
      };
      update();
      //旋转封面
      let rotateCover=function(){
        if(!Player.paused){
          let rotate=$cover.data("rotate");
          rotate=~~rotate+1;
          if(rotate===360){rotate=0}
          $cover.css({
            'webkitTransform':'rotate3d(0, 0, 1, '+rotate+'deg)',
            'transform':'rotate3d(0, 0, 1, '+rotate+'deg)'
          }).data("rotate",rotate);
          rotateTimer=setTimeout(rotateCover,50);
        }
      };
      rotateCover();
    },
    toggleSong:function(index){
      this.index=index;
      this.cSong=this.songList[this.index];
      Player.src=this.cSong.src;
      Player.load();
      this.initState();
    },
    toggleProgress:function(e){
      let x=e.offsetX,w=document.querySelector('.control-progress>.bar-bg').offsetWidth;
      let rate=(x/w).toFixed(4);
      Player.currentTime=Player.duration*rate;
      this.player.cProcess=rate*100+'%';
    },
    toggleVolumn:function(e){
      let x=e.offsetX,w=document.querySelector('.control-volumn>.bar-bg').offsetWidth;
      let rate=(x/w).toFixed(4);
      Player.volume=rate;
      this.player.cVolumn=rate*100+"%";
      this.player.muted=Player.muted=false;
    },
    toggleMuted:function(){
      if(Player.muted){
        this.player.muted=Player.muted=false;
        document.querySelector('.control-volumn>.bar-bg>.bar-current').style.width=Player.volume*100+"%";
      }else{
        this.player.muted=Player.muted=true;
        document.querySelector('.control-volumn>.bar-bg>.bar-current').style.width="0%";
      }
    },
    initState:function(){
      this.player.paused=true;
      this.player.cTime='00:00';
      this.player.cProcess='0%';
      this.getLrc();
    }
  },
  beforeMount:function(){
  },
  mounted:function(){
    var _this=this;
    Player=document.getElementById("player");
    this.toggleSong(this.index);
    Player.addEventListener('canplaythrough', function() { 
      Player.play();
      _this.player.paused=false;
      _this.updateState();
    }, false);
    Player.addEventListener('ended', function() {
      _this.toggleNext();
    }, false);
  },
  beforeDestroy:function(){
    Player.pause();
  }
}
</script>
<style scoped>
@import '../assets/css/iconfont.css';
.song-container{
  display:block;
  margin:20px auto;
  width:900px;
}
.song-title{
  font-size:20px;
  margin-bottom:10px;
}
.song-info{
  font-size:12px;
  color:#8492A6;
  margin-bottom:20px;
}
.song-cover-box{
  position:relative;
  width:300px;
  margin:20px auto;
}
.song-cover{
  position:relative;
  display:inline-block;
  width:300px;
  height:300px;
}
.song-cover .cover-img{
  position:absolute;
  top:53px;
  left:52px;
  width:195px;
  height:195px;
}
.song-cover .cover-bg{
  display:inline-block;
  position:relative;
  width:300px;
  height:300px;
  background-image: url('https://evanliu2968.github.io/static/images/music/coverall.png');
  background-size: cover;
}
.round-top{
  display:inline-block;
  position:absolute;
  top:-40px;
  left:140px;
  width:60px;
  height:90px;
  background-image: url('https://evanliu2968.github.io/static/images/music/round-top.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
.round-top.paused{
  -webkit-transform-origin: top left;
  transform-origin: top left;
  -webkit-transform: rotate3d(0, 0, 1, -40deg);
    transform: rotate3d(0, 0, 1, -40deg);
}
.song-control{
  position:fixed;
  display: -webkit-flex; /* Safari */
  display: flex;
  bottom:0;
  left:0;
  right:0;
  padding:6px 30px 6px 140px;
  border-top:1px solid #eee;
  background:#F9FAFC;
}
.control-play{
  position:absolute;
  display:inline-block;
  left:30px;
}
.control-icon{
  display:inline-block;
  margin-right:10px;
  width:24px;
  height:24px;
  background:#ff4949;
  color:#fff;
  text-align:center;
  
  border-radius:50%;
  cursor:pointer;
}
.control-icon>.iconfont{
  font-size:12px;
  line-height:24px;
  margin:0;
}
.el-icon-pause{
  display:inline-block;
  height:0.8em;
  width:0.4em;
  border-left:2px solid #fff;
  border-right:2px solid #fff;
}
.control-progress{
  position:relative;
  flex:4;
  height:24px;
  padding:0 60px;
}
.control-progress .time-start{
  position:absolute;
  left:15px;
  font-size:12px;
  line-height:24px;
}
.control-progress .time-end{
  position:absolute;
  right:15px;
  font-size:12px;
  line-height:24px;
}
.song-control .bar-bg{
  position:relative;
  margin-top:10px;
  height:4px;
  border-radius:2px;
  background:#99A9BF;
  overflow: hidden;
  cursor:pointer;
}
.song-control .bar-current{
  display:block;
  position:absolute;
  left:0;
  height:4px;
  width:0%;
  background:#ff4949;
}
.control-volumn{
  position:relative;
  flex:1;
  padding-left:30px;
}
.control-volumn .volumn-icon{
  position:absolute;
  display:inline-block;
  left:0;top:4px;
  color:#475669;
  cursor:pointer;
}
.control-volumn .volumn-icon>.iconfont{
  margin:0;
}
/*歌词*/
.el-body{
  padding:10px;
  background: #d6dbdd url('https://evanliu2968.github.io/static/images/bg_uibody.png') repeat-x 0 0;
}
.el-tline{
  padding-top:14px;
  background: url('https://evanliu2968.github.io/static/images/ui-tline.png') center 0 no-repeat;
}
.lrc-wrap{
  height:300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.lrc-wrap::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.lrc-wrap::-webkit-scrollbar-track {
  background: none;
}
.lrc-wrap::-webkit-scrollbar-track-piece {
  opacity: 0;
}
.lrc-wrap::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #5c6e82;
  background: rgba(92, 110, 130, .6);
}
.lrc-p{
  height:28px;
  line-height:28px;
  font-size:14px;
}
.lrc-p.active{
  color:#ff4949;
}
/*表格*/
.n-songtb{
  margin-top:20px;
  margin-bottom:10px;
  font-size:12px;
}
.u-title {
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.u-title h3 {
  font-weight: normal;
  float:left;
  font-size: 20px;
  line-height: 28px;
}
.u-title .sub {
  float:left;
  font-size:12px;
  color:#666;
  margin: 9px 0 0 20px;
}
.m-table th, .m-table th .wp, .m-table td, .m-table .ply, .m-table .mv, .m-table .icn, .m-info .edit {
  background: #d6dbdd url('https://evanliu2968.github.io/static/images/bg_uibody.png') repeat-x 0 0;
}
.m-table {
  width: 100%;
  border: 1px solid #d9d9d9;
}
.m-table div{
  box-sizing: content-box;
}
.m-table th {
  vertical-align: top;
  text-align: left;
  font-weight: normal;
  color: #666;
}
.m-table th {
  height: 38px;
  background-color: #f7f7f7;
  background-position: 0 0;
  background-repeat: repeat-x;
}
.m-table th .wp {
  height: 18px;
  line-height: 18px;
  padding: 8px 10px;
  background-position: 0 -56px;
}
.m-table td {
  padding: 6px 10px;
  line-height: 18px;
  text-align: left;
}
.m-table tbody>tr:nth-child(2n) {
  background-color: #f7f7f7;
}
.m-table .hd {
  height: 18px;
}
.m-table .ply {
  width: 2em;
  height: 17px;
  cursor: pointer;
  color:#666;
}
.m-table .ply:hover {
  color: #ff4949;
}
.m-table .hd .ply {
  float: right;
}
.m-table .hd .num {
  width: 25px;
  margin-left: 5px;
  color: #999;
}
.m-table .text {
  width: 100%;
  position: relative;
  zoom: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.m-table .text a {
  white-space: nowrap;
}
.m-table .w0 {
  width: 25px;
}
.m-table .w1 {
  width: 74px;
}
.m-table .w2 {
  width: 111px;
}
.m-table .w3 {
  width: 14%;
}
.m-table .w4 {
  width: 20%;
}
.m-table .w5 {
  width: 120px;
}
</style>