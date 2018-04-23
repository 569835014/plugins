<style>
.dome-alert .w-alert:not(:first-child){
  margin-top: 10px;
}
</style>
<script>
 export default {
    methods: {
      hello() {
        alert('Hello World!');
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

<div>
 <subscribe></subscribe>
</div>

```
:::



### Method
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|on         |订阅事件| - |
|off         |取消订阅| - |
|emit         |发布| - |
