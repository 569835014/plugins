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
const {getType,hasValue,random,merge,judge}=Util.Tool
const {Dom,Tool}=Util
export {
  Dom,
  Tool,
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
  getType,
  hasValue,
  merge,
  judge
}
window.wePlugins = wePlugins
export default wePlugins
