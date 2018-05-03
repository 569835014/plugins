class ValiForm {


  static created(rules) {
    if (!ValiForm.instance) {
      ValiForm.instance = new ValiForm(rules)
    }
    return ValiForm.instance
  }

  constructor(rules) {
    //内置验证函数
    this.builtIn = {
      email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
      phone: /^[1][3,4,5,7,8][0-9]{9}$/
    }
    this.inFun = {
      //最小长度
      minLength(val, boundary) {
        return !(val.length < boundary)
      },
      //最大长度
      maxLength(val, boundary) {
        return !(val.length > boundary)
      },
      between(val, ...arg) {
        let len = arg.length;
        if (len === 0) return true
        else if (len === 1) return val >= arg[0];
        else return (val >= arg[0] && val <= arg[1])
      },
      required(val) {
        if (val) {
          return true
        }
        return false
      }
    }
    this.builtIn = Object.assign({}, this.builtIn, rules)
  }

  /**
   *
   * @param data
   * @param only 是否是短路验证，短路验证：只要有一个属性验证为false即返回
   * @returns {{adopt, [p: string]: boolean}|{adopt}}
   */
  form(data, only = false) {
    let keys = Object.keys(data)
    if (only) return this.isOnlyModel(keys, data);
    return this.unOnlyModel(keys, data);
  }

  unOnlyModel(keys, data) {
    let res = {}
    let len = keys.length;
    let flag = true
    for (let i = 0; i < len; i++) {
      let key = keys[i]
      let item = data[key];
      let result = this.valiField(item,data)
      if (!result.success) {
        res[key] = result
        //非必要属性不影响验证的结果，但是会验证单个
        if(!item.unNecessary){
          flag = false
        }

      }
    }
    res.adopt = flag

    return res
  }

  isOnlyModel(keys, data) {
    let len = keys.length;
    let result={}
    for (let i = 0; i < len; i++) {
      let key = keys[i]
      let item = data[key];
      let res = this.valiField(item,data)
      if (!res.success) {
        if(item.unNecessary){
          result[key]=res
        }else{
          //第一个必要验证的属性为false的时候就返回结果
          result[key]=res
          result.adopt=false
          return result
        }


      }
    }
    result.adopt=true
    return result
  }

  //验证单个属性单个规则是否合法（and）
  isOnlyRule() {
  }

  //验证单个属性单个规则是否合法（or）
  unOnlyRule() {
  }

  /*****
   * 验证单个表单字段
   * @param key
   * @param Field
   * type:内置类型
   * rule:自定义规则
   * value:待验证字段的值
   * join:连接符 and 或者 or
   */
   valiField(Field,data) {
    let rules = Field.rules;
    let len = rules.length;
    let flag = false;
    if (Field.join === 'and') {
      for (let i = 0; i < len; i++) {
        let item = rules[i];
        switch (item.type) {
          case 'patter':
            flag = this.valiRegArr(Field.value, item.rule);
            break;
          case 'inFun':
            flag = this.evalInFun(Field.value, item.rule)
            break;
          case 'outFun':
            flag =  this.evalOutFun(Field.item.rule)
        }

        if(item.equal){
          let equal=data[item.equal];
          if(!equal||equal.value!=Field.value){
            flag=false;
            item.msg= item.equalMsg?item.equalMsg:`两次输入不相符`
          }
        }
        if (!flag) {
          return {
            success: false,
            msg: item.msg
          }
        }
      }
      return {
        success: true
      }
    } else {
      let res = {
        success: true,
        msg: ''
      }
      for (let i = 0; i < len; i++) {
        let item = rules[i];
        switch (item.type) {
          case 'patter':
            flag = this.valiRegArr(Field.value, item.rule);
            break;
          case 'inFun':
            flag = this.evalInFun(Field.value, item.rule)
            break;
          case 'outFun':
            flag = this.evalOutFun(Field.item.rule)

        }
        if(item.equal){
          let equal=data[item.equal];
          if(!equal||equal.value!=Field.value){
            flag=false;
            item.msg= item.equalMsg?item.equalMsg:`两次输入不相符`
          }
        }
        if (flag) {
          return {
            success: true,
          }
        } else {
          res = {
            success: flag,
            msg: item.msg
          }
        }
      }
      return res
    }
  }

  /*****
   *
   * @param str
   * @param patter
   * @param join
   * @returns {*}
   */
  valiRegArr(str, patter, join) {
    let isArray = patter instanceof Array
    if (!isArray) {

      if (this.builtIn[patter]) {
        patter = this.builtIn[patter]
      }
      return this.valiReg(str, patter)
    }
    let patterArr = patter
    let len = patterArr.length;
    if (join === 'and') {
      for (let i = 0; i < len; i++) {
        if (!this.valiReg(str, patterArr[i])) return false
      }
      return true
    } else {
      for (let i = 0; i < len; i++) {
        if (this.valiReg(str, patterArr[i])) return true
      }
      return false
    }
  }

  valiReg(str, reg) {
    return reg.test(str)
  }

  /****
   * 例如 minLength(4),maxLength(8),between(4,5) 这种字符串函数
   * 提取括号里面的内容
   * @param str
   */
  extractReg(str) {
    let regex = "\\((.+?)\\)";
    let arr = str.match(regex);
    if (!arr) return null
    if (arr.length > 1) {
      if (arr[1].indexOf(',') > 0) {
        return arr[1].split(',')
      }
      return arr[1]
    }
    return null
  }

  /*****
   * 提取函数名
   * @param str
   * @returns {*}
   */
  extractFun(str) {
    let len = str.indexOf('(');
    if (len < 0) return str
    return str.substring(0, len)
  }

  /*****
   * 执行内置函数
   * @param val
   * @param str
   * @returns {*}
   */
  evalInFun(val, str) {
    let fun = this.inFun[this.extractFun(str)];

    if (fun) {
      let arg = this.extractReg(str);
      if (arg) {
        if (arg instanceof Array) {
          return fun(val, ...arg);
        }
        return fun(val, arg);
      }
      return fun(val);
    }
    return true
  }

  async evalOutFun(Filed, str) {
    if (typeof str === 'function') {
      return await str(Filed)
    }
    return false
  }

}

ValiForm.instance = null
export default ValiForm
