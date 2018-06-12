class Exceptional {
  constructor(config) {

    this.config = config
  }

  catch(fn, context, ...arg) {
    try {
      return fn.apply(context, arg);
    } catch (e) {
      let argHandler = arg[arg.length - 1]
      if (typeof argHandler === 'function') {
        return argHandler.call(context, e);
      }
      else if (context.errorHandler) {
        return context.errorHandler(e);
      } else {
        return this.errorHandler(context, e);
      }
    }
  }

  finallyHandle() {
    // TODO
    new Error('请实现')
  }

  errorHandler() {
    // TODO
    new Error('请实现')
  }
  // 根据配置代理一个对象的方法
  /***
   * 当config是一个数组的时候这个对象的属性如果在这个数组中就代理这个对象
   * 当config为数组的时候代理数组的所有属性
   * @param context
   * @param config
   * @returns {*}
   */
  init(context,vue,config) {
    let self = this
    // if (typeof target[prop] === 'function' && prop.startsWith('catch'))
    context = new Proxy(context, {
      get: (target, prop) => {
        let _config = config ? config : self.config
        if (!target[prop]) {
          return
        } else {
          if (_config) {
            if (_config instanceof Array) {
              if (_config.includes(prop)) {
                target[prop] = self.catch.bind(self, target[prop], context)
              }
              return target[prop]
            }else if (typeof _config === 'object') {
              if (typeof _config[prop] === "object") {
                if (_config[prop].deep && _config[prop].config) {
                  _config[prop] = self.init(_config[prop], _config[prop].config)
                }
                if (_config[prop]['prefix'] && prop.startsWith(_config[prop]['prefix'])) {
                  return target[prop] = self.catch.bind(self, target[prop], context)
                } else if (_config[prop]['suffix'] && prop.startsWith(_config[prop]['suffix'])) {
                  return target[prop] = self.catch.bind(self, target[prop], context)
                } else {
                  return target[prop]
                }
              } else if (typeof _config[prop] === 'boolean' && _config[prop]) {
                target[prop] = self.catch.bind(self, target[prop], context)
              }
            }
          }
        }
        return Reflect.get(target, prop, target[prop])
      },
      set(trapTarget, key, value, receiver) {
        return Reflect.set(trapTarget, key, value, receiver)
      }
    })
    return context
  }

  install(Vue) {

  }
}

export default Exceptional
