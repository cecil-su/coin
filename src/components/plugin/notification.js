import notification from '../base/notification'

export default (Vue, $root) => {
  Vue.set($root, 'su_notification', [])
  Vue.component('su-notification', notification)

  Vue.prototype.$suNotification = {
    remove (item, duration) {
      setTimeout(() => {
        $root.su_notification.$remove(item)
      }, duration)
    },
    create (type, title, content, duration) {
      let item = {
        type: type,
        title: title,
        content: content
      }
      $root.su_notification.push(item)
      if (duration) {
        this.remove(item, duration)
      }
    },
    success (title, content, duration) {
      this.create('success', title, content, duration)
    },
    info (title, content, duration) {
      this.create('info', title, content, duration)
    },
    warning (title, content, duration) {
      this.create('warning', title, content, duration)
    },
    failed (title, content, duration) {
      this.create('failed', title, content, duration)
    }
  }
}
