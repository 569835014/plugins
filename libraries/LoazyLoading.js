import {getData, getStyle, absolutePosition} from './util/dom'

class LoazyLoading {
  constructor(config) {
    let base = {
      attr: "data-src",
      offSet: 0,
      container: window,
      loadingImg: '',
      on: function () {

      }
    }
    this.config = Object.assign({}, base, config);
    this.cacheList = [];

  }

  init() {
    let el = this.config.container
    let body = document.body
    let w = window
    if (this.config.container === w) {
      this.container = {
        width: w.innerWidth ? w.innerWidth : body.clientWidth,
        height: w.innerHeight ? w.innerHeight : body.clientHeight,
        ...absolutePosition(body)
      }
    } else {
      this.container = {
        width: el.clientWidth,
        height: el.clientHeight,
        ...absolutePosition(el)
      }
    }
    this.initCachList();
    this.loading();
  }

  initCachList() {
    if (document) {
      let lazyList = Array.prototype.slice.call(document.querySelectorAll(`[${this.config.attr}]`), 0);
      lazyList.forEach((item) => {
        let node = item.nodeName.toLowerCase();
        let url = getData(item, 'src');
        this.cacheList.push({
          el: item,
          tag: node,
          url: url
        })
      })
    } else {
      console.warn('没有要延迟加载的元素')
    }
  }

  loading() {
    if (this.cacheList.length === 0) {
      this.config.container.removeEventListener('scroll', this.loading, false)
    } else {
      let len = this.cacheList.length-1;
      let config = this.config;
      let container=this.config.container===window? document.documentElement:this.config.container
      for (let i = len; i > -1; i--) {
        let item = this.cacheList[i]
        let absolute = absolutePosition(item.el);
        let posTop = absolute.top - this.container.top;
        let posLeft = absolute.left - this.container.left;
        let scrollTop = container.scrollTop;
        let scrollLeft = container.scrollLeft;

        let url=item.url;
        console.info('container.height:'+this.container.height)
        console.info('top:'+(posTop-config.offSet-scrollTop))
        if (((posTop-config.offSet-this.container.height <= scrollTop)) && (posLeft < scrollLeft + config.offSet + this.container.width)) {
          if (getStyle(item.el, 'display') !== 'none' && getStyle(item.el, 'visibility') !== 'hidden'&&url) {
            if(item.tag==='img'){
              item.el.src=url
            }else{
              item.el.style.color='red';
              item.el.style.backgroundImage=`url(${url})`
            }
          }
          if(item.on) item.on.apply(null,[item,i])
          if (i <= 0) {
            this.cacheList = [];
            return
          } else {
            this.cacheList.splice(i, 1)
            len = len - 1;
          }

        }
      }
    }
  }
  addEvent(){
    this.config.container.addEventListener("scroll", this.loading.bind(this),false)
  }
  remove(){
    this.config.container.removeEventListener("scroll", this.loading,false)
    this.cacheList=[]
  }
}
export default LoazyLoading
