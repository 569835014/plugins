/**
 * 判断对象类型
 * @param  {any} input    目标对象
 * @return {string}       目标对象的类型：'array', 'object', 'function', 'null', 'undefined', 'string', 'number'
 */
export default function (input) {
  return ({}).toString.call(input).slice(8, -1).toLowerCase()
}
