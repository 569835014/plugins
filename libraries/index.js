import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import * as Util from './util/index'
const {hasClass, getData, addClass, prefixStyle, absolutePosition, assertionDom, getStyle,} = Util.Dom;
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
  URL
}
window.myPlugins = wePlugins
export default wePlugins

