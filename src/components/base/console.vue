<template>
  <div class="su-console" v-if="consoles.length" @click="clear()">
    <div class="su-console-scroll">
      <div class="su-console-item" v-for="item in consoles" transition="notification">
        <div class="su-console-item-time">{{item.time}}</div>
        <p class="su-console-item-result" :class="item.result"><span>Port: {{item.url}}</span>-{{item.result}}-{{item.status}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'su-console',
    computed: {
      consoles () {
        return this.$root.su_console
      }
    },
    methods: {
      clear () {
        this.$root.su_console = []
      }
    }
  }
</script>

<style lang="less">
  .su-console {
    background: rgba(0,0,0,.5);
    height: 50%;
    left: 50%;
    max-width: 640px;
    overflow: hidden;
    position: fixed;
    top: 25%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 9;
    &-scroll {
      height: 100%;
      overflow-y: scroll;
      padding: 10px;
    }
    &-item {
      margin: 10px;
      &-time {
        color: rgba(255,255,255,.4);
        font-size: 10px;
        overflow: hidden;
      }
      &-result {
        &.success {color: #22be34;}
        &.failed {color: red;}
        font-size: 14px;
      }
    }
  }
</style>