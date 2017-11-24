<template>
  <div class="su-container fixed bc index-i" v-if="show">
    <div class="su-navbar" v-if="options.length !== 0">
      <a class="su-navbar-item" v-for="item in options" v-link="{path: item.link, activeClass: active, replace: true}">
        <span class="su-navbar-item-icon" :class="item.icon" v-if="item.icon"></span>
        <span class="su-navbar-item-label" v-text="item.name"></span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'su-navbar',
    props: {
      show: {
        type: Boolean,
        default: true
      },
      active: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: ''
      }
    }
  }
</script>