<template>
  <div class="su-input">
    <span class="su-input-clear" v-if="show" @click="clear()">+</span>
    <input :type="type" v-model="value" @focus="focusAction" @blur="blurAction" :placeholder="place">
  </div>
</template>

<script>
  export default {
    name: 'su-input',
    props: {
      value: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default () {
          return 'text'
        }
      },
      show: {
        type: Boolean,
        default: false
      },
      place: {
        type: String,
        default: ''
      }
    },
    methods: {
      focusAction () {
        this.show = true
      },
      blurAction () {
        setTimeout(() => {
          this.show = false
        }, 200)
      },
      clear () {
        this.value = ''
        this.show = false
      }
    }
  }
</script>

<style lang="less">
  .su-input {
    width: 100%;
    position: relative;
    input {box-sizing: border-box;font-family: 微软雅黑; width: 100%;font-size: 0.3rem;}
    &-clear {
      color: red;
      font-size: 0.5rem;
      position: absolute;
      right: 0.1rem;
      text-align: center;
      top: 45%;
      transform: translateY(-50%) rotate(45deg);
      width: 40px;
    }
  }
</style>