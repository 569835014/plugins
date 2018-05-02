import Subscribe from './subscribe/Subscribe'
import Session from './session/Session'
import * as Util from './util/index'
const myPlugins={
  Subscribe,
  Session,
  ...Util
};
window.myPlugins=myPlugins
const keys=Object.keys(myPlugins);
keys.map((item)=>{
  if(item!=='Util'){
    exports[item]=myPlugins[item]
  }else{
    let _keys=Object.keys(myPlugins[item])
    _keys.map((list)=>{
      exports[list]=myPlugins[item][list]
    })
  }
})
Object.defineProperty(exports, '__esModule', { value: true });
export default myPlugins

