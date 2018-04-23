/**
 * @author monkeywang
 * Date: 17/11/9
 */
import Subscribe from './subscribe/index.js';
import Skeleton  from './skeleton/index'
import Col  from './col/index'
import Row  from './row/index'
import MetaInfo  from './meta-info/index'
import WLoadingBar from './loading-bar/index'
const components = [
  Subscribe,
  Skeleton,
  Row,
  Col
]

const install = function(Vue) {
  if (install.installed) return
  components.map((component) => {
    Vue.component(component.name, component)
    component.install(Vue);
  })
  MetaInfo.install(Vue)
  Vue.prototype.$loading = WLoadingBar
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  Subscribe,
  Skeleton,
  Row,
  Col,
  MetaInfo,
  install
}
