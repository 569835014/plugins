import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import * as Util from './util/index'
const {hasClass, getData, addClass, prefixStyle} = Util.Dom;
const URL=Util.URL;
const myPlugins = {
  Subscribe,
  Session,
  Util
};

export {
  Subscribe,
  Session,
  hasClass,
  getData,
  addClass,
  prefixStyle,
  URL
}
window.myPlugins = myPlugins
export default myPlugins

