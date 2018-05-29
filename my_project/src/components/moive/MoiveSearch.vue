<template>
    <div class="moive-header">
        <div class="moive-title">
            <i class="el-icon-menu"></i>
            <span>Top250</span>
        </div>
        <div class="moive-search">
            <el-input size="small" placeholder="请输入电影或人名">
                <i slot="suffix" class="el-input__icon el-icon-search is-clickable"></i>
            </el-input>
        </div>
    </div>
</template>
<script>
export default {
    name:'MoiveSearch',
    props:[],
    data(){
        return {
            msg:'aaa'
        }
    }
}
</script>
<style scoped>
.moive-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-input__icon.is-clickable:hover {
    cursor: pointer;
    color: #8391a5;
}
</style>
