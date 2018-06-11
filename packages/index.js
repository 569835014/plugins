/**
 * @author zhangmin
 *
 */
import Subscribe from './subscribe/index.js';
import ValiForm from './valiform/index.js';
import Upload from './upload/index.js';
import Skeleton  from './skeleton/index'
import Col  from './col/index'
import Row  from './row/index'
import MetaInfo  from './meta-info/index'
import WLoadingBar from './loading-bar/index'
const components = [
  Subscribe,
  Skeleton,
  Row,
  Col,
  ValiForm,
  Upload
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
  ValiForm,
  MetaInfo,
  install
}
