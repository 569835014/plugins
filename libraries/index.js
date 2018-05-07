import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import * as Util from './util/index'
const {hasClass, getData, addClass, prefixStyle, absolutePosition, assertionDom, getStyle,} = Util.Dom;
const wePlugins = {
  Subscribe,
  Session,
  Util
};
const URL = Util.URL;
const {typeOf,hasValue,random}=Util.Tool
export {
  Util,
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
  URL,
  typeOf,
  hasValue
}
window.wePlugins = wePlugins
export default wePlugins
