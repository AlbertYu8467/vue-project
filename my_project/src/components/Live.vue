<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="category">
            <li class="item active" v-for="(value,index) in category" :key="index" @click="jump(index,value)">{{Object.keys(value)[0]}}</li>
        </div>
        <router-view></router-view>
    </div>
        
</template>
<script>
export default {
    name:'Live',
    data(){
        return {
            category:[],
            loading:false
        }
    },
    methods:{
        jump(index,value){
            this.$router.push({ name: 'LiveItem', params: { id:index}})
            localStorage.setItem(index,JSON.stringify(value))
        }
    },
    beforeMount(){
        this.$store.state.infoArr = []
        this.loading = true;
        this.axios.get('./static/data.json').then((res) =>{
            this.category = res.data.data
            this.category.forEach((value,index) => {
                var obj = {}
                obj[index] = value
                this.$store.state.infoArr.push(obj)
                this.loading = false;
            })
        })
    }
}
</script>
<style scoped>
    .category {
        display: flex;
        flex-wrap: wrap;
    }
    .item {
        margin: 5px;
        padding: 5px 5px;
        font-size: 16px;
        border-radius: 5px;
        border:1px solid  #eb4e4e;
        transition: all linear .2s;
        background-color: #fff;
        color: #eb4e4e;
    }
    .active:hover {
        background-color: #eb4e4e;
        color: #fff;
        cursor: pointer
    }
</style>
