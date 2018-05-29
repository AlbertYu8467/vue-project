<template>
    <div class="rotateBox">
        <div class="transBox">
            <div class="movie-list-box front" :style="{background:background}">
                <div class="movie-list-name">
                    <span>Top250</span>
                </div>
            </div>
            <div class="movie-list-box back">
                <div class="movie-list-cover">
                    <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'MoiveItem',
    props:[
        'background'
    ],
    data(){
        return {
            msg:'#f00000'
        }
    }
}
</script>
<style scoped>
.rotateBox {
    overflow: hidden;
    height: 300px;
    width: 200px;
    float: left;
    position: relative;
    -webkit-perspective: 2000px;
    perspective: 600px;
}
.transBox {
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
    height: 300px;
    width: 200px;
    transform-origin: center center -100px;
    transition: .4s;
}
.rotateBox:hover .transBox {
    transform: rotateY(-90deg);
}
.transBox .movie-list-box {
    position: absolute;
    height: 500px;
    cursor: pointer;
}
.movie-list-box {
    position: relative;
    height: 300px;
    width: 200px;
    float: left;
    display: block;
    overflow: hidden;
}
.transBox .front {
    left: 0;
    top: 0;
}
.movie-list-name {
    line-height: 300px;
    font-size: 30px;
    font-weight: bolder;
    color: #fff;
    text-align: center;
}
.transBox .back {
    left: 200px;
    top: 0;
    transform-origin: left;
    transform: rotateY(90deg);
}
.movie-list-cover {
    position: absolute;
    padding: 0;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.movie-list-cover > img {
    display: block;
    width: 200px;
    height: 300px;
}
</style>

