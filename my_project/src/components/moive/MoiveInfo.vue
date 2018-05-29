<template>
    <div class="moive-info">
        <div class="moive-cover">
            <img :src="subject.images.small" alt="">
        </div>
        <div class="moive-content">
            <div class="moive-row">
                {{subject.title}} ( {{subject.original_title}} )
                <el-tag type='success' class="movie-genre" v-for="(genre,index) in subject.genres" :key='index'>{{genre}}</el-tag>
            </div>
            <div class="moive-row">
                年份：
                <span class="movie-tag">{{subject.year}}</span>
                导演：
                <a :href="director.alt" class="moive-tag" v-for="(director,index) in subject.directors" target="_blank" :key='index'>{{director.name}}</a>
            </div>
            <div class="moive-row">
                主演：
                <a :href="cast.alt" class="movie-tag" v-for="(cast,index) in subject.casts" target="_blank" :key='index'>{{cast.name}}</a>
            </div>
            <div class="moive-row">
                评分：
                <span style="color:#F7BA2A" class="movie-tag">{{subject.rating.average}}</span>
                <router-link class="movie-tag" :to="{ name: '电影详情', params: { id: subject.id }}">查看详情 <i class="el-icon-d-arrow-right text-small"></i></router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'MoiveInfo',
    props:[
        'subject'
    ],
    data(){
        return {
            msg:'ss'
        }
    }
}
</script>
<style scoped>
.moive-info {
    display: flex;
    color: #99A9BF;
    height: 90px;
    margin-bottom: 15px;
}
.moive-cover {
    width: 60px;
    height: 90px;
    margin-right:10px; 
}
.moive-cover > img {
    display: block;
    height: 100%;
    width: 100%;
}
.moive-content {
    flex-grow:1;
    padding: 5px;
    text-align: left;
}
.moive-row {
    font-size: 14px;
    line-height: 20px;
}
.movie-genre {
    margin-left: 10px;
    height: 20px;
    line-height: 18px;
    padding: 0 5px;
}
.movie-tag {
    display: inline-block;
    margin-right: 15px;
}
</style>
