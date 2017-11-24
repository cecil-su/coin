<template>
  <div class="coin-user-password">
    <input type="button" class="coin-user-password-btn" value="退出登录" @click="exit">
  </div>
</template>

<script>
  import { initUserCog, setCookie } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        initUserCog,
        setCookie
      }
    },
    route: {
      data () {
        this.initUserCog()
      }
    },
    methods: {
      exit () {
        this.setCookie('bhw_sid', '', -1)
        this.$route.router.go({name: 'signin'})
      }
    }
  }
</script>