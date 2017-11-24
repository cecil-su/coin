import loadingInstall from './plugin/loading'
import notificationInstall from './plugin/notification'
import toastInstall from './plugin/toast'
import consoleInstall from './plugin/console'

export const install = (Vue, options = {
  Loading: true,
  Notification: true,
  Toast: true,
  Console: true
}) => {
  Vue.use(require('vue-animated-list'))

  let $root = null

  Vue.mixin({
    created () {
      if (!$root) {
        if (this === this.$root) {
          SuInit(this)
        }
      }
    }
  })

  const SuInit = (vm) => {
    $root = vm

    if (options.Loading) {
      loadingInstall(Vue, vm)
    }

    if (options.Notification) {
      notificationInstall(Vue, vm)
    }

    if (options.Toast) {
      toastInstall(Vue, vm)
    }

    if (options.Console) {
      consoleInstall(Vue, vm)
    }
  }
}
