/**
 * 函数防抖
 * @param fun Function
 * @param context Object 指针
 * @param delay Nubmer 延迟时间
 * @param immediate Boolean 第一次是否立即执行
 * @returns {Function}
 */
export function debounce(fun,context,delay=200,immediate=false){
  if(typeof fun!=="function"){
    console.warn('传入的不是一个函数')
    return fun
  }
  let time=null;
  return function () {
    let arg=[].call(arguments,0)
    clearTimeout(time);
    time=setTimeout(()=>{
      fun.apply(context,arg)
    },delay)
  }
}

/**
 * 函数节流
 * @param fun Function
 * @param context Object 指针
 * @param interval Nubmer 时间间隔
 * @returns {Function}
 */
export function throttle(fun,context,interval=30) {
  if(typeof fun!=="function"){
    console.warn('传入的不是一个函数')
    return fun
  }
  let startTime=0;
  let endTime;
  return function () {
    let arg=[].slice.call(arguments,0);
    endTime=new Date().getTime();
    if(endTime-startTime>interval){
      fun.apply(context,arg)
      startTime=endTime
    }
  }
}

/***
 * 函数柯里化
 * @param fun Function
 * @param context Object 指针
 * @returns {Function}
 */
export function curring(fun,context) {
  if(typeof fun!=="function"){
    console.warn('传入的不是一个函数')
    return fun
  }
  let arg=[].slice.call(arguments,1);
  return function() {
    let newArgs = arg.concat([].slice.call(arguments));
    return fun.apply(context, newArgs);
  };
}
