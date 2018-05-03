/**
 * 返回一个随机数
 * @param n number
 * @param m number
 * @returns {number}
 */
function getRandom(n, m) {
  if (isNaN(n) || isNaN(m)) {
    return Math.random();
  }
  return Math.round(Math.random() * (m - n) + n);
}
