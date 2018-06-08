<template>
        <ul class="pic-items">
            <li class="item" v-for='(value,index) in info' :key="index">
                <a :href="'http://www.huajiao.com'+value.href" class="figture" target="_blank">
                    <div class="pic">
                        <img :src="value.avatar" alt="">
                    </div>
                    <div class="pic-info">{{value.nickname}}</div>
                </a>
            </li>
        </ul>
</template>
<script>
export default {
    name:'Live',
    data(){
        return {
           info:[]
        }
    },
    methods:{
        getInfo(id){
            let local = this.$store.state.infoArr[id]
            this.info = Object.values(local[id])[0]
        }
    },
    beforeCreate(){
        this.$router.afterEach((to, from, next) => {
            this.getInfo(to.params.id)
        })
    }
}
</script>
<style scoped>
    .pic-items {
        display: flex;
        flex-wrap: wrap;
    }
    .item {
        margin: 10px;
    }
    .figture {
        display: block;
    }
    .figture img {
        width: 200px;
        height: auto;
    }
    .pic-info {
        height: 30px;
        line-height: 30px;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
