import getType from './getType.js'

const type = ['string', 'number', 'boolean', 'null', 'undefined']

function extend(deep, target, ...arg) {
  if (!deep) return Object.assign(target, ...arg);
  else {
    target = target || {};
    let source = arg ? arg[0] : null
    for (let name in source) {
      let item = source[name]
      if (typeof item === "object") {
        if (getType(item) === 'date') {
          target[name] = new Date(item.valueOf())
        } else if (getType(item) === 'regexp') {
          let pattern = item.valueOf();
          let flags = '';
          flags += pattern.global ? 'g' : '';
          flags += pattern.ignoreCase ? 'i' : '';
          flags += pattern.multiline ? 'm' : '';
          target[name] = new RegExp(pattern.source, flags);
        } else {
          target[name] = (item.constructor === Array) ? [] : {};
          extend(true, target[name], item);
        }

      } else {
        target[name] = source[name];
      }
    }
    return target;
  }
}

function oneLength(firstType, obj) {
  let sourceType=getType(obj)
  if (type.includes(sourceType)) {
    return obj
  } else {
    let target;
    let source;
    if (sourceType === 'object') {
      target = {}
    } else if (sourceType === 'array') {
      target = []
    }
    source = obj
    return extend(true, target, source)
  }
}

/**
 * @author zhangmin
 * @param[0] 任何值，当只有一个参数时这返回这个参数，当参数大于1是这个值如果是boolean这标明是不是深拷贝
 * @params 把后面的多个对象合并到第二个对象中（第一个参数为占位，标明是不是深拷贝，如果第一个不是boolean这默认调用Object.assign）
 * @returns {any} 返回新的合并后对象
 */
export default function merge(...arg) {
  let target;
  let source;
  if (arg.length === 0) return
  //只传一个值，强制认为是深拷贝
  if (arg.length > 0) {
    let firstType = getType(arg[0]);
    if (arg.length === 1) {
      return oneLength(firstType, arg[0])
    } else if (arg.length === 2 && firstType === 'boolean') {
      return oneLength(firstType, arg[1])
    } else {
      if (firstType === 'boolean') {
        target = arg[1];
        source = arg.slice(2);
        source.forEach((item) => {
          target = extend(firstType, target, item)
        })
        return target
      } else {
        target = arg[0];
        source = arg.slice(1);
        extend(target, ...source)
        return target
      }
    }
  }
}

