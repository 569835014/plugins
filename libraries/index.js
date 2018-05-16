import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import LoazyLoading from './LoazyLoading'
import * as Util from './util/index'
const {hasClass, getData, addClass, prefixStyle, absolutePosition, assertionDom, getStyle,} = Util.Dom;
const wePlugins = {
  Subscribe,
  Session,
  Util
};
const URL = Util.URL;
const {getType,hasValue,random,merge,judge}=Util.Tool
const {debounce,throttle,curring}=Util.partial
const partial=Util.partial
const {Dom,Tool}=Util
export {
  Dom,
  Tool,
  Util,
  Subscribe,
  Session,
  LoazyLoading,
  hasClass,
  getData,
  addClass,
  prefixStyle,
  absolutePosition,
  assertionDom,
  getStyle,
  random,
  URL,
  getType,
  hasValue,
  merge,
  judge,
  debounce,
  throttle,
  curring,
  partial
}
window.wePlugins = wePlugins
export default wePlugins
