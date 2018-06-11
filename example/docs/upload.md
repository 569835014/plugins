<style>
.dome-alert .w-alert:not(:first-child){
  margin-top: 10px;
}
</style>
<script>
 export default {
    methods: {
      hello() {
        alert('Hello World!!');
      }
    }
  }
</script>
# upload 文件上传
----


### 名词解释
`upload` 把文件用ajax上传到服务器上，支持图片压缩上传
### 用法

<div class="dome-alert demo-block">
 <we-upload></we-upload>
</div>

::: demo

```vue
 <template>
   <div>
     <input type="file" ref="upload" @change="uploadFile" multiple/>
     <div class="press">
       <div class="value" :style="{'width':value+'%'}"></div>
     </div>
   </div>
 
 </template>

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



```


:::
### options
| 参数      | 说明       | 备注   |
|------------- |----------- |---------  |
|file         |要上传的文件| - |
|options         |参数配置| 包括name文件名，headers头信息，url上传路径等，compressOptions:压缩参数 |

### Method
| 事件名称      | 说明       | 返回值   |
|------------- |----------- |---------  |
|send         |上传文件 |data
|base64         |获得文件的base64| base64 |


### Hook
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|beforeUpload         |上传之前,用return false 可以取消上传| file,info |
|compressSuccess         |压缩完成| base64，info |
|progress         |进度条| event,info |
|success         |上传成功| data,info |
|success         |上传失败| info,status |
