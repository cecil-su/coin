<template>
  <div class="app">
    <su-loading></su-loading>
    <su-header :options="header" :show.sync="show"></su-header>
    <div class="su-container" :class="{'app-header': show,'app-footer': navbar.show }"><router-view></router-view></div>
    <su-navbar :show.sync="navbar.show" :active="navbar.active" :options="navbar.options"></su-navbar>
    <su-toast></su-toast>
    <su-notification></su-notification>
    <su-console></su-console>
  </div>
</template>

<script>
  (function (doc, win) { // 响应式调整
    let docEl = doc.documentElement
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let recalc = function () {
      let clientWidth = docEl.clientWidth
      if (!clientWidth) return
      if (clientWidth > 640) {
        clientWidth = 640
      }
      docEl.style.fontSize = (clientWidth / 7.5) + 'px'
    }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
  })(document, window)
  import loading from './components/base/loading'
  import header from './components/base/header'
  import navbar from './components/base/navbar'
  import toast from './components/base/toast'
  import notification from './components/base/notification'
  import Console from './components/base/console'
  import store from './vuex/store'
  import { initApp } from './vuex/actions'
  export default {
    data () {
      return {
        show: true
      }
    },
    components: {
      suLoading: loading,
      suHeader: header,
      suNavbar: navbar,
      suToast: toast,
      suNotification: notification,
      suConsole: Console
    },
    store,
    vuex: {
      actions: {
        initApp
      },
      getters: {
        header: (state) => state.header,
        navbar: (state) => state.navbar
      }
    },
    ready () {
      this.initApp(this)
    }
  }
</script>

<style lang="less">
  @import './assets/css/app.less';
</style>
