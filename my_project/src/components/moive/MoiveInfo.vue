<template>
    <div class="moive-info">
        <div class="moive-cover">
            <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
        </div>
        <div class="moive-content">
            <div class="moive-row">
                肖申克的救赎 ( The Shawshank Redemption )
                <el-tag type='success' class="movie-genre">犯罪</el-tag>
                <el-tag type='success' class="movie-genre">剧情</el-tag>
            </div>
            <div class="moive-row">
                年份：
                <span class="movie-tag">1994</span>
                导演：
                <a href="www.baidu.com" class="moive-tag">弗兰克·德拉邦特</a>
            </div>
            <div class="moive-row">
                主演：
                <a href="www.baidu.com" class="movie-tag">蒂姆·罗宾斯</a>
                <a href="www.baidu.com" class="movie-tag">曼鲍勃·冈顿</a>
            </div>
            <div class="moive-row">
                评分：
                <span style="color: rgb(247, 186, 42);" class="movie-tag">9.6</span>
                <a href="www.baidu.com" class="movie-tag">
                    查看详情
                    <i class="el-icon-d-arrow-right text-small"></i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'MoiveInfo',
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
