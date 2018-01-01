import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './routers'
import { install } from './components/install'
import App from './App'
import 'cropperjs/dist/cropper.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(install, {
  Loading: true,
  Notification: true,
  Toast: true,
  Console: true
})

let router = new VueRouter({
  hashbang: false
})

window.Game = {}
window.Game.router = router
window.Game.timer = null
window.Game.isLogin = false
window.Game.refreshShow = false
window.Game.scrollLoad = false
window.Game.debug = 1
window.Game.apiHost = 'http://new_game.yiqu365.com/api/'
// window.Game.apiHost = 'http://localhost:8014/api/'
window.Game.localHost = 'http://' + window.location.host + '/'

routerMap(router)

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true

router.start(Vue.extend(App), '#app')
