<template>
  <div class="su-upload">
    <div class="su-upload-action">
      <input type="file" class="su-upload-file" id="choose">
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
  </div>
</template>

<script>
  import { getCookie } from '../../vuex/actions'
  const imageType = /^image\//
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
        $file: null,
        percent: 0,
        fileList: [],
        res: []
      }
    },
    ready () {
      // this.$file = this.$el.getElementsByClassName('su-upload-file')[0]
      this.$file = document.getElementById('choose')
    },
    vuex: {
      actions: {
        getCookie
      }
    },
    methods: {
      touchUp (e) {
        if (this.$file) {
          this.$file.click()
          this.$file.addEventListener('change', this.changeFile)
        }
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