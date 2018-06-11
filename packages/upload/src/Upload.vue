<template>
  <div>
    <input type="file" ref="upload" @change="uploadFile" multiple/>
    <div class="press">
      <div class="value" :style="{'width':value+'%'}"></div>
    </div>
  </div>

</template>
<style>
  .press{
    width: 200px;
    border-radius: 25px;
    height: 6px;
    background: black;

  }
  .value{
    background: #42b983;
    width: 0;
    height: 100%;
    transition: 1s;
    border-radius: 25px;
  }
</style>
<script>

  export default {
    name: "WeUpload",
    data() {
      return {
        value:null,
        img:''
      }
    },
    created(){

    },
    methods:{
      async uploadFile($event){

        let file=new this.$upload($event.target.files[0],{
          name:'file',
          options:{
            headers:{
              'x-token':'dsafdsaf'
            },
            compressOptions:{
              maxWidth:750
            },
            url:'/api/common/upload',
          }
        })
        console.info(await file.base64())
        // this.img=await file.compress();
        file.on('beforeUpload',(file,arrFile,index)=>{
          return true
        })
        file.on('progress',(progress)=>{
          this.value=(progress.loaded/progress.total).toFixed(1)*100

        })
        file.on('compressSuccess',(base64,info)=>{

          console.info(info.status)
        })
        file.on('error',(...arg)=>{
          console.info(arg)
        })
        this.img=await file.send();
      }
    }
  }
</script>

<style scoped>

</style>
