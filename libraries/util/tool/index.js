import hasValue from './hasValue'
import getType from './getType'
import merge from './merge'
import * as judge from './detection/browser'
/**
 * 返回一个随机数
 * @param n number
 * @param m number
 * @returns {number}
 */
function random(n, m) {
  if (isNaN(n) || isNaN(m)) {
    return Math.random();
  }
  return Math.round(Math.random() * (m - n) + n);
}
export {hasValue,getType,random,merge,judge}
