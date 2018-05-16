/**
 * 函数防抖
 * @param fun Function
 * @param context Object 指针
 * @param delay Nubmer 延迟时间
 * @returns {Function}
 */
export function debounce(fun,context,delay=200){
  if(typeof fun!=="function"){
    console.warn('传入的不是一个函数')
    return fun
  }
  let time=null;
  return function () {
    let arg=Array.prototype.slice.call(arguments,0)
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
    let arg=Array.prototype.slice.call(arguments,0);
    endTime=new Date().getTime();
    if(endTime-startTime>interval){
      fun.apply(context,arg)
      startTime=endTime
    }
  }
}
