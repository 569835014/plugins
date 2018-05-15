/**
 * @author autumnLeaves0
 * Date: 17/11/15
 */
import SubscribeVue from './src/Subscribe.vue';
import SubscribeClass from '../../libraries/subscribe/Subscribe'
const Subscribe=new SubscribeClass();
import LoazyLoading from './LoazyLoading'

SubscribeVue.install = function (Vue) {
  Vue.use(Subscribe);
  Vue.component(SubscribeVue.name, SubscribeVue);
  Vue.use(LoazyLoading,{
    attr: "data-src",
    offSet: 0,
    container: window,
    loadingImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525973681893&di=6a2bb2a4a70ea47a0dbfb33a98a55465&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fhb%2Fdt%2F00%2F88151021425857.jpg',
    on: function () {
      alert(1)
    }
  })
};

export default SubscribeVue;
