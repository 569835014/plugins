/**
 * @author autumnLeaves0
 * Date: 17/11/15
 */
import SubscribeVue from './src/Subscribe.vue';
import SubscribeClass from '../../libraries/subscribe/Subscribe'
import {hasClass} from "../../libraries/index";
const Subscribe=new SubscribeClass();
SubscribeVue.install = function (Vue) {
  Vue.use(Subscribe);
  Vue.component(SubscribeVue.name, SubscribeVue);
};

export default SubscribeVue;
