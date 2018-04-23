<template>
  <div class="subscribe">
    <children-a></children-a>
    <children-b></children-b>
  </div>
</template>
<script>
  import ChildrenA from './ChildrenA.vue'
  import ChildrenB from './ChildrenB.vue'
  export default {
    name:'Subscribe',
    data(){
      return {
        count:0
      }
    },
    components:{
      ChildrenA,
      ChildrenB
    }
  }
</script>
