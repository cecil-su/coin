import console from '../base/console'

export default (Vue, $root) => {
  Vue.set($root, 'su_console', [])
  Vue.component('su-console', console)

  Vue.prototype.$suConsole = {
    show (url, result, status) {
      let item = {
        time: new window.Date(),
        url: url,
        result: result,
        status: status
      }
      $root.su_console.push(item)
      if (status === '200') {
        this.remove(item)
      }
    },
    remove (item) {
      setTimeout(() => {
        $root.su_console.$remove(item)
      }, 5000)
    }
  }
}
