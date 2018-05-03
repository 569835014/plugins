import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import * as Util from './util/index'
const {hasClass, getData, addClass, prefixStyle, absolutePosition, assertionDom, getStyle,} = Util.Dom;
const {random}=Util.Tool
const URL = Util.URL;
const wePlugins = {
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
  absolutePosition,
  assertionDom,
  getStyle,
  random,
  URL
}
window.wePlugins = wePlugins
export default wePlugins

