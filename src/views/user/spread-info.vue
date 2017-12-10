<template>
  <div class="coin-user-spread">
    
  </div>
</template>

<script>
  import { initUserSpreadInfo } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        initUserSpreadInfo,
      }
    },
    route: {
      data () {
        this.initUserSpreadInfo()
      }
    }
  }
</script>