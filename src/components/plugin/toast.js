import toast from '../base/toast'

export default (Vue, $root) => {
  Vue.set($root, 'su_toast', [])
  Vue.component('su-toast', toast)

  Vue.prototype.$suToast = {
    remove (item, duration) {
      setTimeout(() => {
        $root.su_toast.$remove(item)
      }, duration)
    },
    create (pos, icon, label, duration) {
      let item = {
        pos: pos,
        icon: icon,
        label: label
      }
      $root.su_toast.push(item)
      if (duration) {
        this.remove(item, duration)
      }
    },
    top (icon, label, duration) {
      this.create('tc', icon, label, duration)
    },
    center (icon, label, duration) {
      this.create('center', icon, label, duration)
    },
    bottom (icon, label, duration) {
      this.create('bc', icon, label, duration)
    }
  }
}
