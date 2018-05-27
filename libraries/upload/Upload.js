import ExIF from './exif'
import Subscribe from '../subscribe/Subscribe'
function packingAsync(context) {
  return new Promise((resolve, reject) => {
    if (!context['onload']) {
      context['onload'] = function () {
        resolve(context)
      }
      context['onerror'] = function (e) {
        resolve(reject)
      }
    }
  })


}

class Upload {
  constructor(file, {name, options}) {
    this.file = file
    this.initInfo();
    this.name = name;
    this.options = options;
    this.subscribe = new Subscribe()
  }

  on() {
    this.subscribe.on(...arguments)
  }

  off() {
    this.subscribe.off(...arguments)
  }

  emit() {
    return this.subscribe.emit(...arguments)
  }

  validationType() {
    //TODO
    let reg = new RegExp(`\.(${this.options.type})$`)
    return reg.test(this.file)
  }

  initInfo() {
    this.info = this.setFileInfo(this.file)
    this.file.fontSize = this.info.fontSize = this.getFileSizeDesc(this.file.size)
  }

  setFileInfo(file) {

    if (this.validationFile(file)) {
      let {type, size, name, lastModified, lastModifiedDate, webkitRelativePath} = file
      return {
        type,
        size,
        name,
        status: 'beforeUpload',
        lastModified,
        lastModifiedDate,
        webkitRelativePath
      }
    }
  }

  validationFile(file) {
    if (file instanceof File) return true
    return false
  }

  async send() {
    let result=await this.sendFile(this.file, this.info)
    return result
  }

  getFileSizeDesc(fileSize) {
    return fileSize / 1024 > 1024
      ? (~~(10 * fileSize / 1024 / 1024) / 10) + 'MB'
      : ~~(fileSize / 1024) + 'kb'
  }
  base64ToBlob(base64,type){
    let  binary = atob(base64.split(',')[1]);
    let array = [];
    for(let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type:type });
  }
  async sendFile(file, info) {
    console.info(file)
    let arg = Array.from(arguments)
    let xhr = this.createdAjax();
    let form = new FormData(); // FormData 对象

    if (this.options.compressOptions && this.vailDateIMG(this.file.name)&&this.file.size>1024*1024) {
      this.emit('beforeCompress', ...arg)
      this.file.status = this.info.status = 'beforeCompress'
      let base64 = await this.compress();
      this.file.status = this.info.status = 'compressSuccess'
      this.emit('compressSuccess', base64, this.info)
      this.file.fontSize = this.info.fontSize = this.getFileSizeDesc(base64.length)
      let blob=this.base64ToBlob(base64,'image/jpeg')
      form.append(this.name, blob ,`${this.name}.jpeg`);
    } else {
      form.append(this.name, file); // 文件对象
    }
    xhr.open("post", this.options.url, true);
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
    if (this.options.headers) {
      for (let key in this.options.headers) {
        xhr.setRequestHeader(key, this.options.headers[key]);
      }
    }
    let result = true
    xhr.upload.onloadstart = () => {
      result = this.emit('beforeUpload', ...arg);
      if (!result) {
        xhr.abort();
        info.status = file.status = 'cancel'
      }
    }
    if (xhr.upload) {
      xhr.upload.onprogress = (e) => {
        this.emit('progress', e,this.info,arguments)
      }
    }
    xhr.send(form);
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {

        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
          this.emit('success', xhr.responseText)
          file.status = info.status = 'success'
          resolve(xhr.responseText,this.info)
        } else {
          console.info(xhr.status)
          this.emit('error',this.info,xhr.status)
          file.status = info.status = 'error'
          reject(xhr, this.info,xhr.status)
        }
      };
    }).catch(()=>{
    })
  }

  vailDateIMG(file) {
    let reg = new RegExp('.+(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$');
    return reg.test(file)
  }

  createdAjax() {
    if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }

  async compress() {
    let compressOptions = this.options.compressOptions || {}
    let Orientation = null;
    let image = new Image();
    if (window.FileReader) {
      let reader = new FileReader()
      ExIF.getData(this.file, function () {
        Orientation = ExIF.getTag(this, 'Orientation');
      });
      reader.readAsDataURL(this.file);
      await packingAsync(reader)
      image.src = reader.result;
    } else if (navigator.appName === 'Microsoft Internet Explorer') {
      image.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
      image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = this.file;
    }
    await packingAsync(image)
    let imgWidth = image.width;
    let imgHeight = image.height;
    let maxWidth = compressOptions.maxWidth || 1920;
    let maxHeight = compressOptions.maxHeight || 1080
    if (imgWidth > imgHeight && imgWidth > maxWidth) {
      imgWidth = maxWidth;
      imgHeight = Math.ceil(maxWidth * image.height / image.width);
    } else if (imgWidth < imgHeight && imgHeight > maxHeight) {
      imgWidth = Math.ceil(maxHeight * image.width / image.height);
      imgHeight = maxHeight;
    }
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    if (Orientation && Orientation != 1) {
      switch (Orientation) {
        case 6:     // 旋转90度
          canvas.width = imgHeight;
          canvas.height = imgWidth;
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(image, 0, -imgHeight, imgWidth, imgHeight);
          break;
        case 3:     // 旋转180度
          ctx.rotate(Math.PI);
          ctx.drawImage(image, -imgWidth, -imgHeight, imgWidth, imgHeight);
          break;
        case 8:     // 旋转-90度
          canvas.width = imgHeight;
          canvas.height = imgWidth;
          ctx.rotate(3 * Math.PI / 2);
          ctx.drawImage(image, -imgWidth, 0, imgWidth, imgHeight);
          break;
      }
    } else {
      ctx.clearRect(0, 0, imgWidth, imgHeight);
      this.ratio(image, canvas,ctx)
    }
    return canvas.toDataURL("image/jpeg", compressOptions.quality || 0.8);
  }

  initWidthHeigt(image) {
    let compressOptions = this.options.compressOptions || {}
    let maxWidth = compressOptions.maxWidth;
    let maxHeight = compressOptions.maxHeight;
    if (maxWidth && maxHeight) {
      return {
        width: maxWidth,
        height: maxHeight
      }
    } else {
      let imgWidth = maxWidth ? maxWidth : image.width;
      let imgHeight = maxHeight ? maxHeight : image.height;
      if (imgWidth > imgHeight && imgWidth > maxWidth) {
        imgWidth = maxWidth;
        imgHeight = Math.ceil(maxWidth * image.height / image.width);
      } else if (imgWidth < imgHeight && imgHeight > maxHeight) {
        imgWidth = Math.ceil(maxHeight * image.width / image.height);
        imgHeight = maxHeight;
      }
      return {
        width: imgWidth,
        height: imgHeight
      }
    }

  }

  async ratio(image, canvas, ctx,w,h) {
    let width,height
    if(w&h){
      let width=w;
      let height=h
    }else{
      let result=this.initWidthHeigt(image);
      width=result.width
      height=result.height
    }
    let ratio
    if ((ratio = width * height / 4000000) > 1) {
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    let tCanvas = document.createElement("canvas")
    let tctx = tCanvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width,height)
    let count;
    if ((count = width * height / 3000000) > 1) {
      count = ~~(Math.sqrt(count) + 1)
      const tileWidth = ~~(width / count)
      const tileHeight = ~~(height / count)
      tCanvas.width = tileWidth
      tCanvas.height = tileHeight
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(image, i * tileWidth * ratio, j * tileHeight * ratio, tileWidth * ratio, tileHeight * ratio, 0, 0, tileWidth, tileHeight)
          ctx.drawImage(tCanvas, i * tileWidth, j * tileHeight, tileWidth, tileHeight)
        }
      }

    }else{
      ctx.drawImage(image, 0, 0, width, height)
    }
  }

  // async ratio(image,ctx,width,height){
  //   let count = width * height / 1000000;
  //   let tCanvas = document.createElement("canvas")
  //   let tctx = tCanvas.getContext('2d');
  //   if(count>1){
  //     count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片
  //     let nw = ~~(width / count);
  //     let nh = ~~(height / count);
  //      tCanvas.width = nw;
  //      tCanvas.height = nh;
  //     for (let i = 0; i < count; i++) {
  //       for (let j = 0; j < count; j++) {
  //         tctx.drawImage(image, i * nw * count, j * nh * count, nw * count, nh * count, 0, 0, nw, nh);
  //         ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
  //       }
  //     }
  //   }else{
  //     ctx.drawImage(image, 0, 0, width, height);
  //   }
  // }
}


export default Upload
