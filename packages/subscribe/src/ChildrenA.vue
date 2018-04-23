<template>
  <div>
    <ul>
      <li v-for="item in send" @click="sendItem(item)">点击通过订阅发布模式传递数据{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ChildrenA",
    data(){
      return {
        send:10
      }
    },

    methods:{
      sendItem(item){
        this.$subscribe.emit('add',item)
      }
    }
  }
</script>

<style scoped>

</style>
