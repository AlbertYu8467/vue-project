<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
        activeIndex:this.$router.path,
    }
  },
  methods:{
    handleSelect(key,paht){
      console.log(key,path)
    }
  },
  mounted(){
    console.log(this.$router)
  }
}
</script>
