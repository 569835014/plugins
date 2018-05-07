import hasValue from './hasValue'
import typeOf from './typeOf'

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
export {hasValue,typeOf,random}
