<template>
  <div class="su-container fixed tc index-i" v-if="show">
    <header class="su-header" >
      <div class="su-header-l" v-if="options.linkLeft"><a v-link="{path: options.linkLeft}" class="su-header-back"></a></div>
      <div class="su-header-title" v-text="options.title"></div>
      <div class="su-header-r" v-if="options.linkRight"><a v-link="{path: options.linkRight}" :class="options.iconRight"><img v-if="options.img" :src="options.img"></a></div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'su-header',
    props: {
      show: {
        type: Boolean,
        default: true
      },
      options: {
        title: '',
        linkLeft: '',
        linkRight: '',
        iconRight: '',
        img: ''
      }
    }
  }
</script>