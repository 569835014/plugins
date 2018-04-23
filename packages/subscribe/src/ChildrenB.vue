<template>
  <div>我来显示信息{{item}}</div>
</template>

<script>
  export default {
    name: "ChildrenB",
    data() {
      return {
        item:null
      }
    },
    created(){
      this.$subscribe.on('add',(item)=>{
        this.item=item
      })
    }
  }
</script>

<style scoped>

</style>
