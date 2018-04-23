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
# subscribe 订阅发布模式
----


### 名词解释
`Subscribe` 订阅发布模式,又叫做观察者模式,描述对象间的一对多依赖关系，在js开发中得到广泛运用。例如：`自定义事件`、`vue里面的eventBUs等`
<div class="dome-alert demo-block">
 <subscribe></subscribe>
</div>

::: demo
```html
 父组件有两个子组件a和b
 <div class="subscribe">
    <children-a></children-a>
    <children-b></children-b>
 </div>


```
```vue
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

```
```vue
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

```

:::



### Method
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|on         |订阅事件| - |
|off         |取消订阅| - |
|emit         |发布| - |
