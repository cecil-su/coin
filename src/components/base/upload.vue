<template>
  <div class="su-upload">
    <div class="su-upload-action">
      <input type="file" class="su-upload-file" id="choose" :value="inputValue">
      <div class="su-upload-btn add" @click="touchUp">{{name}}</div>
    </div>
    <div class="su-upload-preview clear" v-if="show">
      <div class="su-upload-item" v-for="item in fileList">
        <div class="su-upload-del" @click="delFile(item, $index)">-</div>
        <div class="su-upload-item-img-wrapper">
          <div class="su-upload-item-img" :style="{'background-image': 'url(' + item.src + ')'}" v-if="item.src"></div>
        </div>
        <div class="su-upload-progress" :style="{'width': + percent + '%'}"></div>
      </div>
    </div>
    <div class="su-upload-crop" v-show="panel">
      <div class="flex center">
        <img :src="url" id="image" style="width: 6rem;">
      </div>
      <div class="flex center">
        <button @click="panel = false" style="border-radius: 0.45rem;height: 0.6rem;padding: 0 0.3rem;margin: 0.2rem;border: 1px solid #fff;">取消</button>
        <button @click="crop" style="border-radius: 0.45rem;height: 0.6rem;padding: 0 0.3rem;margin: 0.2rem;border: 1px solid #fff;">确定</button>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { getCookie } from '../../vuex/actions'
  import Cropper from 'cropperjs'
  const imageType = /^image\//
  const imgFile = {}
  export default {
    name: 'su-upload',
    props: {
      name: {
        type: String,
        default: '上传'
      },
      show: {
        type: Boolean,
        default: true
      },
      replace: {
        type: String
      }
    },
    data () {
      return {
        inputValue: '',
        $file: null,
        percent: 0,
        fileList: [],
        res: [],
        panel: false,
        cropper: '',
        croppable: false,
        url: '',
        file: {
          name: '',
          type: ''
        }
      }
    },
    ready () {
      // this.$file = this.$el.getElementsByClassName('su-upload-file')[0]
      this.$file = document.getElementById('choose')
      var image = document.getElementById('image')
      let self = this
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        zoomable: false,
        ready: function () {
          self.croppable = true
        }
      })
    },
    vuex: {
      actions: {
        getCookie
      }
    },
    methods: {
      getObjectURL (file) {
        var url = null
        if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(file)
        } else if (window.URL !== undefined) {
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      crop () {
        this.panel = false
        if (!this.croppable) return 

        this.cropper.getCroppedCanvas({
          width: 160,
          height: 160,
          fillColor: '#fff',
          imageSmoothingQuality: 'low'
        }).toBlob((blob) => {
          let file = new File([blob], this.file.name, {type: this.file.type})
          // 判断是否是ios
          if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
              // iOS
              console.log('ios')
              this.transformFileToFormData(file);
              return;
          }

          // 图片压缩之旅
          this.transformFileToDataUrl(file);
        })
      },
      touchUp (e) {
        if (this.$file) {
          this.$file.value = ''
          this.$file.click()
          this.$file.addEventListener('change', this.handleInputChange)
        }
      },
      handleInputChange (e) {
        // 获取当前选中的文件
        this.panel = true 
        const file = e.target.files[0];
        const imgMasSize = 1024 * 1024 * 2; // 2MB

        // 检查文件类型
        if(['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0){
            // 自定义报错方式
            // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
            return;
        }

        // 文件大小限制
        if(file.size > imgMasSize ) {
            // 文件大小自定义限制
            // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
            return;
        }
        this.file.name = file.name
        // this.file.type = file.type
        this.file.type = 'image/png'
        this.panel = true 
        this.url = this.getObjectURL(file)
        if (this.cropper) {
          this.cropper.replace(this.url)
        }
        // if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        //   // iOS
        //   console.log('ios')
        //   this.transformFileToFormData(file);
        //   return;
        // }

        // // 图片压缩之旅
        // this.transformFileToDataUrl(file);
      },
      transformFileToFormData (file) {
        const formData = new FormData();
        // 自定义formData中的内容
        // type
        formData.append('type', file.type);
        // size
        formData.append('size', file.size || "image/png");
        // name
        formData.append('name', file.name);
        // lastModifiedDate
        formData.append('lastModifiedDate', file.lastModifiedDate);
        // append 文件
        formData.append('file', file);
        // 上传图片
        this.uploadImg(formData);
      },
      transformFileToDataUrl (file) {
        console.log()
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

        // 存储文件相关信息
        imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
        imgFile.size = file.size;
        imgFile.name = file.name;
        imgFile.lastModifiedDate = file.lastModifiedDate;
        // 封装好的函数
        const reader = new FileReader();

        // file转dataUrl是个异步函数，要将代码写在回调里
        let self = this
        reader.onload = function(e) {
            const result = e.target.result;

            if(result.length < imgCompassMaxSize) {
              self.compress(result, self.processData, false );    // 图片不压缩
            } else {
              self.compress(result, self.processData);            // 图片压缩
            }
        };

        reader.readAsDataURL(file);
      },
      compress (dataURL, callback, shouldCompress = true) {
        const img = new window.Image();

        img.src = dataURL;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let compressedDataUrl;

            if(shouldCompress){
                compressedDataUrl = canvas.toDataURL(imgFile.type, 0.2);
            } else {
                compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
            }

            callback(compressedDataUrl);
        }
      },
      processData (dataURL) {
        // 这里使用二进制方式处理dataUrl
        const binaryString = window.atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }

        const data = [intArray];

        let blob;

        try {
            // blob = new window.Blob(data, { type: imgFile.type });
            blob = this.getBlob(data, 'image/png')
        } catch (error) {
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            console.log(window.BlobBuilder)
            if (error.name === 'TypeError' && window.BlobBuilder){
                const builder = new BlobBuilder();
                builder.append(arrayBuffer);
                blob = builder.getBlob(imgFile.type);
            } else {
                // Toast.error("版本过低，不支持上传图片", 2000, undefined, false);
                throw new Error('版本过低，不支持上传图片');
            }
        }

        // blob 转file
        const fileOfBlob = new File([blob], imgFile.name);
        const formData = new FormData();

        // type
        formData.append('type', imgFile.type);
        // size
        formData.append('size', fileOfBlob.size);
        // name
        formData.append('name', imgFile.name);
        // lastModifiedDate
        formData.append('lastModifiedDate', imgFile.lastModifiedDate);
        // append 文件
        formData.append('file', fileOfBlob);

        this.uploadImg(formData);
      },
      uploadImg (formData) {
        const xhr = new XMLHttpRequest();
        let _this = this
        // 进度监听
        xhr.upload.addEventListener('progress', (e)=>{
          // console.log(e.loaded / e.total)
          _this.percent = ~~(100 * e.loaded / e.total)
        }, false);
        // 加载监听
        // xhr.addEventListener('load', ()=>{console.log("加载中");}, false);
        // 错误监听
        xhr.addEventListener('error', ()=>{Toast.error("上传失败！", 2000, undefined, false);}, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const result = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    // 上传成功
                  _this.$emit('add', result.url.url)

                  _this.$suToast.center('', '上传成功', 1000)
                } else {
                    // 上传失败
                  _this.$suToast.center('', '上传失败', 1000)
                }
            }
        };
        xhr.open('POST', window.Game.apiHost + 'user/upload_image?sid=' + this.getCookie('bhw_sid') + '&scode=' + this.getCookie('bhw_scode'), true);
        xhr.send(formData);
      },
      changeFile (e) {
        if (window.File && window.FileReader && window.FormData) {
          let previewUrl = ''
          let newItem = {}
          for (let i = 0, len = this.$file.files.length; i < len; i++) {
            previewUrl = ''
            if (imageType.test(this.$file.files[i].type)) {
              previewUrl = window.URL.createObjectURL(this.$file.files[i])
              this.readFile(this.$file.files[i])
            } else {
              window.alert('Not a valid image!')
            }
            newItem = {
              src: previewUrl,
              file: this.$file.files[i]
            }
            this.replace = previewUrl
            this.fileList.push(newItem)
            this.$emit('add', newItem, this.fileList, this.res)
          }
        } else {
          window.alert('File upload is not supported!')
        }
      },
      readFile (file) {
        let reader = new window.FileReader()
        let _this = this
        reader.onload = function () {
          let result = this.result
          _this.sendFile(result, file.type)
        }
        reader.readAsDataURL(file)
      },
      sendFile (base, type) {
        let text = window.atob(base.split(',')[1])
        let buffer = new window.Uint8Array(text.length)
        let loop = null
        let _this = this
        for (let i = 0; i < text.length; i++) {
          buffer[i] = text.charCodeAt(i)
        }

        let blob = this.getBlob([buffer], type)
        let xhr = new window.XMLHttpRequest()
        let formdata = this.getFormData()
        formdata.append('file', blob)
        xhr.open('post', window.Game.apiHost + 'user/upload_image?sid=' + this.getCookie('bhw_sid') + '&scode=' + this.getCookie('bhw_scode'))
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function () {
          console.log(xhr)
          if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.response) {
              let data = JSON.parse(xhr.response)
              if (data.error === '0') {
                _this.res.push(data.url)
                _this.$suToast.center('', '上传成功', 1000)
              } else {
                _this.$suToast.center('', '上传失败', 1000)
              }
            }
          }
        }
        xhr.upload.addEventListener('progress', function (e) {
          if (loop) return
          _this.percent = ~~(100 * e.loaded / e.total)
        }, false)
        xhr.send(formdata)
      },
      delFile (item, i) {
        this.fileList.$remove(item)
        this.res.splice(i, 1)
        this.$emit('remove', item)
      },
      getBlob (buffer, format) {
        try {
          return new window.Blob(buffer, {type: format})
        } catch (e) {
          let bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)
          buffer.forEach(function (buf) {
            bb.append(buf)
          })
          return bb.getBlob(format)
        }
      },
      getFormData () {
        let isNeedShim = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome') && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534
        return isNeedShim ? new this.FormDataShim() : new window.FormData()
      },
      /*
       *formdata补丁，给不支持formdata上传的blob的andro机打补丁
       */
      FormDataShim () {
        console.warn('using formdata shim')
        let o = this
        let parts = []
        let boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36)
        let oldSend = window.XMLHttpRequest.prototype.send
        this.append = function (name, value, filename) {
          parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"')
          if (value instanceof window.Blob) {
            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n')
            parts.push(value)
          } else {
            parts.push('\r\n\r\n' + value)
          }
          parts.push('\r\n')
        }

        window.XMLHttpRequest.prototype.send = function (val) {
          console.log(val)
          let fr
          let data
          let oXHR = this

          if (val === o) {
            // append the final boundary string
            parts.push('--' + boundary + '--\r\n')

            // create the blob
            data = this.getBlob(parts)

            // set up and read the blob into an array to be sent
            fr = new window.FileReader()
            fr.onload = function () {
              oldSend.call(oXHR, fr.result)
            }
            fr.onerror = function (err) {
              throw err
            }
            fr.readAsArrayBuffer(data)

            // set the multipart content type and boundary
            this.setRequestHeader('Content-Type', 'multipart/form-data: boundary=' + boundary)
            window.XMLHttpRequest.prototype.send = oldSend
          } else {
            oldSend.call(this, val)
          }
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../assets/css/less/z.less';
  .su-upload-file {display: none;}
  .su-upload {
    position: relative;
    &-crop {
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: rgba(0,0,0,.5);
    }
    &-action {
      // width: 20%;
    }
    &-preview {
      &.clear {
        .clearfix();
      }
      .su-upload-item {
        position: relative;
        float: left;
        width: 25%;
        .su-upload-del {
          position: absolute;
          right: 0px;
          padding: 0 8px;
          top: 0;
          background-color: #fff;
          font-size: 20px;
        }
      }
      .su-upload-item-img-wrapper {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      .su-upload-item-img {
        width: 100%;
        height: 1rem;
        background-repeat: no-repeat;
        background-position: left center;
        background-size: auto 100%;
      }
      .su-upload-progress {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 5px;
        background-color: green;
      }
    }
  }
</style>