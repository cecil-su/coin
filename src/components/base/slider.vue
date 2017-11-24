<template>
  <div class="su-slider" :style="{height: xheight}">
    <slot></slot>
    <div class="su-slider-item" v-for="item in list" @click="onSliderItem(item)">
      <a :href="item.url" style="display: block;" v-if="item.url !== ''">
        <div class="su-slider-item-img"><img :src="item.image" @load="imgLoad"></div>
        <!-- <div class="su-slider-item-desc" v-text="item.desc"></div> -->
      </a>
      <!-- <a v-link="{name: 'fund-item', params: {id: item.id}, query: {name: item.title}}" style="display: block;" v-else>
        <div class="su-slider-item-img"><img :src="item.picture"></div>
        <div class="su-slider-item-desc" v-text="item.text"></div>
      </a> -->
    </div>
    <div v-show="showDots" :class="[dotsClass, 'su-slider-dots', 'su-slider-dots-' + dotsPosition]">
      <a href="javascript:" v-for="key in length">
        <i class="su-slider-dots-icon" :class="{'active': key === current}"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import Swiper from './swiper'
  export default {
    methods: {
      render () {
        this.swiper = new Swiper({
          container: this.$el,
          direction: this.direction,
          auto: this.auto,
          loop: this.loop,
          interval: this.interval,
          threshold: this.threshold,
          duration: this.duration,
          height: this.height,
          minMovingDistance: this.minMovingDistance
        }).on('swiped', (prev, index) => {
          this.current = index
          this.index = index
        })
      },
      rerender () {
        if (!this.$el) {
          return
        }
        this.$nextTick(() => {
          this.index = 0
          this.current = 0
          this.length = this.list.length || this.$children.length
          this.destroy()
          this.render()
        })
      },
      destroy () {
        // console.log('des')
        this.swiper && this.swiper.destroy()
      },
      getHeight () {
        const hasHeight = parseInt(this.height, 10)
        if (hasHeight) return this.height
        if (!hasHeight) {
          if (this.aspectRatio) {
            return this.$el.offsetWidth * this.aspectRatio + 'px'
          }
          return '180px'
        }
      },
      onSliderItem (item) {
      },
      imgLoad () {
        if (document.querySelectorAll('.su-slider-item-img')[0] !== undefined) {
          this.xheight = document.querySelectorAll('.su-slider-item-img')[0].offsetHeight + 'px'
        }
      }
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      showDots: {
        type: Boolean,
        default: true
      },
      dotsClass: String,
      dotsPosition: {
        type: String,
        default: 'center'
      },
      showDescMask: {
        type: Boolean,
        default: true
      },
      auto: {
        type: Boolean,
        default: true
      },
      loop: true,
      interval: {
        type: Number,
        default: 3000
      },
      threshold: {
        type: Number,
        default: 50
      },
      duration: {
        type: Number,
        default: 300
      },
      height: {
        type: String,
        default: 'auto'
      },
      aspectRatio: Number,
      minMovingDistance: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        defalut: 0
      }
    },
    data () {
      return {
        current: this.index,
        xheight: '0px',
        length: this.list.length
      }
    },
    watch: {
      list (val) {
        this.rerender()
      },
      current (currentIndex) {
        this.$emit('on-index-change', currentIndex)
      },
      index (val) {
        if (val !== this.current) {
          this.$nextTick(() => {
            this.swiper.go(val)
          })
        }
      }
    },
    beforeDestroy () {
      this.destroy()
    }
  }
</script>

<style lang="less">
.su-slider {
  overflow: hidden;
  position: relative;
  &-item {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    img {
      width: 100%;
    }
    &-desc {
      position: absolute;
      left: 0;
      bottom: 25px;
      width: 100%;
      color: #fff;
      padding: 10px 0;
      text-indent: 15px;
      background-color: rgba(0,0,0,.5);
    }
  }
  &-dots {
    bottom: 10px;
    position: absolute;
    &-left {
      left: 15px;
    }
    &-center {
      left: 50%;
      transform: translate(-50%)
    }
    &-right {
      right: 15px;
    }
    > a {
      float: left;
      margin: 0 4px;
      position: relative;
    }
    &-icon {
      background-color: #d0cdd1;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      width: 6px;
      height: 6px;
      &.active {
        background-color: orange;
      }
    }
  }
}
</style>