<template>
  <div class="su-loading" :style="{'width': loading.percent + '%', 'height': loading.options.height, 'background-color': loading.options.canSuccess ? loading.options.color : loading.options.failedColor, 'opacity': loading.options.show ? 1 : 0}">
  </div>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$root.su_loading
      }
    }
  }
</script>