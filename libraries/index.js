import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import * as Util from './util/index'
const {hasClass, getData, addClass, prefixStyle, absolutePosition, assertionDom, getStyle,} = Util.Dom;
const {random}=Util.Tool
const wePlugins = {
  Subscribe,
  Session,
  Util
};
const URL = Util.URL;
const typeOf = Util.typeOf;
const hasValue = Util.hasValue;

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
  URL,
  typeOf,
  hasValue
}
window.wePlugins = wePlugins
export default wePlugins
