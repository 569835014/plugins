<template>
  <div class="subscribe">
    <children-a></children-a>
    <children-b></children-b>
    <div class="box" v-container>
      saDSAdsaSDA
      <img src="" data-index="1" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="2" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="3" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="4" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="5" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="6" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="7" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="8" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
      <img src="" data-index="9" data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525893716094&di=d6a9c5b679659c6860b1f92988bb318e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F467c15bf89ca2e96f1a8640bd1e5982c1c3db3f0.jpg" alt="">
    </div>
  </div>
</template>
<script>
  import ChildrenA from './ChildrenA.vue'
  import ChildrenB from './ChildrenB.vue'
  import LoazyLoading from '../LoazyLoading'

  export default {
    name:'Subscribe',
    data(){
      return {
        count:0
      }
    },
    mounted(){
      this.$nextTick(()=>{

      })
    },
    methods:{
      add(){}
    },
    beforeDestroy(){
    },
    components:{
      ChildrenA,
      ChildrenB
    }
  }
</script>
<style scoped lang="stylus">
  .box
    padding-top   2000px
</style>
