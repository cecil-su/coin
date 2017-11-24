<template>
  <div class="su-container fixed all index-iii" v-if="toasts.length" >
    <div class="su-toast" :class="posClass()">
      <div class="su-toast-item" v-for="item in toasts" transition="notification">
        <div class="su-toast-item-icon" v-if="item.icon" :class="'loading-'+item.icon"></div>
        <div class="su-toast-item-label" v-text="item.label"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'si-toast',
    computed: {
      toasts () {
        return this.$root.su_toast
      }
    },
    methods: {
      posClass () {
        return this.toasts[0].pos
      }
    }
  }
</script>