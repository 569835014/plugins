/**
 * 判断元素是不是有某个className
 * @author zhangmin
 * @param el HTMLElement
 * @param className string
 * @returns {boolean}
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 给某个元素添加className
 * @param el HTMLElement
 * @param className string
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 * 加浏览器前缀
 * @param style
 * @returns {vendor}
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * 断言是不是元素
 * @param ele HTMLElement
 * @returns {boolean}
 */
export function assertionDom(ele) {
  if (typeof ele === 'object' && ele instanceof HTMLElement) return true
  return false
}

function getPos(ele) {
  let left = 0, top = 0;
  while (obj) {
    left += obj.offsetLeft;
    top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return {
    left: left,
    top: top
  }
}

/**
 * 获取元素在浏览器的左边距和上边距
 * @param ele HTMLElement
 * @returns {{left: *|number, top: *|number}}
 */
export function absolutePosition(ele) {
  if (!assertionDom(ele)) {
    throw new Error('请传入一个dom元素')
  }
  let result
  if (ele.getBoundingClientRect) {
    result = ele.getBoundingClientRect()
  } else {
    result = getPos(ele)
  }
  let left = result.left
  let top = result.top
  return {
    left,
    top
  }
}

/**
 * 获得css样式值
 * @param ele HTMLElement
 * @param attr string
 * @returns {string}
 */
export function getStyle(ele, attr) {
  if (!assertionDom(ele)) {
    throw new Error('请传入一个dom元素')
  }
  if (element.currentStyle) {
    return element.currentStyle[attr];
  } else {
    return window.getComputedStyle(element, null)[attr];
  }
}
