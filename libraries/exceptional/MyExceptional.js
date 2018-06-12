import Exceptional from './Exceptional'
class MyExceptional extends Exceptional{

  static created(config) {
    if (!MyExceptional.instance) {
      MyExceptional.instance = new MyExceptional(config)
    }
    return MyExceptional.instance
  }
  finallyHandle(){

    console.info(arguments)
  }
  errorHandler(){
    console.info(arguments)
  }
  static staticInit(traget){
    return MyExceptional.instance.init(traget,'vue')
  }

}

export default MyExceptional
