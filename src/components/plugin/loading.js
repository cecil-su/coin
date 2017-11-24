import loading from '../base/loading'

export default (Vue, $root) => {
  Vue.set($root, 'su_loading', {
    percent: 0,
    options: {
      canSuccess: true,
      color: 'rgb(143, 255, 199)',
      failedColor: 'red',
      show: false,
      height: '3px'
    }
  })
  Vue.component('su-loading', loading)

  Vue.prototype.$suLoading = {
    timer: null,
    cut: 0,
    start (time) {
      if (!time) { time = 3000 }
      $root.su_loading.percent = 0
      $root.su_loading.options.show = true
      $root.su_loading.options.canSuccess = true
      this.cut = 10000 / Math.floor(time)
      this.timer = setInterval(() => {
        this.increase(this.cut * Math.random())
        if ($root.su_loading.percent > 95) {
          this.finish()
        }
      }, 100)
    },
    set (num) {
      $root.su_loading.options.show = true
      $root.su_loading.options.canSuccess = true
      $root.su_loading.percent = Math.floor(num)
    },
    get () {
      return Math.floor($root.su_loading.percent)
    },
    increase (num) {
      $root.su_loading.percent += Math.floor(num)
    },
    decrease (num) {
      $root.su_loading.percent -= Math.floor(num)
    },
    hide () {
      clearInterval(this.timer)
      this.timer = null
      setTimeout(() => {
        $root.su_loading.options.show = false
        Vue.nextTick(() => {
          setTimeout(() => {
            $root.su_loading.percent = 0
          }, 100)
        }, 800)
      })
    },
    finish () {
      $root.su_loading.percent = 100
      this.hide()
    },
    failed () {
      $root.su_loading.options.canSuccess = false
      $root.su_loading.percent = 100
      this.hide()
    }
  }
}
