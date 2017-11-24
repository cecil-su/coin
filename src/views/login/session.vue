<template>
  <div class="session"></div>
</template>

<script>
  import { setCookie } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        setCookie
      }
    },
    route: {
      data ({to: {query: {sid, scode}}}) {
        if (scode !== undefined) {
          this.setCookie('bhw_scode', scode, 30)
        }
        if (sid !== undefined) {
          this.setCookie('bhw_sid', sid, 30)
          setTimeout(() => {
            // this.$route.router.go({name: 'user'})
          }, 500)
        }
      }
    }
  }
</script>