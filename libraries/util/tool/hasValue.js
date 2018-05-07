/**
 * 判断变量是否有值
 * - 空字符串、null、undefined视作无值
 * - 全部都是空格或者诸如tab的话作为无值看待
 * - 0视为有值
 * @param  {any} val     待判断的变量
 * @return {boolean}     是否有值
 */
export default function (val) {
  return val != '' && val !== null && val !== undefined && !/^\s+$/.test(val)
}
