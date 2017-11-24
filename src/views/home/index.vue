<template>
  <div class="coin-home">
    <su-slider :list="banner"></su-slider>
    <div class="coin-home-horn" v-if="annou">
      <div class="coin-home-horn-box">
        <div class="coin-home-horn-box-item">{{note.content}}</div>
      </div>
    </div>
    <div class="coin-over">
      <div class="coin-home-list" v-if="list" :style="{'transform': 'translate3D(' + currentX + 'px, 0, 0)', 'transition:' : move ? 'transform 0s' : 'transform .5s'}">
        <div class="mask" @mousedown="touchSlide" @touchstart="touchSlide" :style="{'transform': 'translate3D(' + currentX + 'px, 0, 0)', 'transition:' : move ? 'transform 0s' : 'transform .5s'}"></div>
        <div class="coin-home-list-item" v-for="item in list" :style="{'transform': $index == index ? 'scale(1.2,1.2) translateX('+($index*100-22)+'%)' : 'scale(1,1) translateX('+($index*120-26)+'%)', 'z-index': $index == index ? '10' : '1', 'transition': 'transfrom 1s ease'}">
          <div class="coin-home-list-item-img">
            <img :src="item.img">
          </div>
          <div class="coin-home-list-item-name" @click="toUrl(item.url)">{{item.name}}</div>
          <!-- <div class="coin-home-list-item-desc">{{item.player}}</div> -->
        </div>
      </div>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initHome, toUrl, getCookie } from '../../vuex/actions'
  import slider from '../../components/base/slider'
  const _ = {
    on (type, handler) {
      document.body.addEventListener(type, handler, false)
    },
    off (type, handler) {
      document.body.removeEventListener(type, handler)
    }
  }
  export default {
    data () {
      return {
        note: '',
        code: '',
        index: 1,
        prevX: 0,
        currentX: 0,
        move: false,
        dir: true
      }
    },
    components: {
      suSlider: slider
    },
    vuex: {
      actions: {
        initHome,
        toUrl,
        getCookie
      },
      getters: {
        banner: (state) => state.home.banner,
        annou: (state) => state.home.annou,
        list: (state) => state.home.recommends,
        icon: (state) => state.iconImg
      }
    },
    route: {
      data () {
        this.initHome()
        _.on('mousemove', this.actionMove)
        _.on('mouseup', this.endMove)
        _.on('touchmove', this.actionMove)
        _.on('touchend', this.endMove)
      }
    },
    watch: {
      annou (val) {
        if (val.length > 0) {
          this.note = val[0]
          let i = 1
          this.timer = setInterval(() => {
            this.note = val[i]
            i++
            if (i === val.length) {
              i = 0
            }
          }, 7000)
        }
      }
    },
    methods: {
      touchSlide (e) {
        this.arr = this.list
        this.prevX = this.getMousePos(e)
        this.move = true
        this.index = -1
      },
      getMousePos (e) {
        if (e.type === 'touchstart' || e.type === 'touchmove') {
          return e.touches[0].pageX
        }
        return e.pageX
      },
      actionMove (e) {
        // const arr = this.list
        if (!this.move) return
        this.currentX = this.getMousePos(e) - this.prevX
        if (this.currentX > 0) {
          this.dir = true
        } else {
          this.dir = false
        }
      },
      endMove (e) {
        this.move = false
        this.currentX = 0
        let obj = null
        setTimeout(() => {
          this.index = 1
          if (!this.dir) {
            obj = this.list[0]
            this.list.splice(0, 1)
            this.list.push(obj)
          } else {
            obj = this.list[this.list.length - 1]
            this.list.splice(this.list.length - 1, 1)
            this.list.splice(0, 0, obj)
          }
        }, 100)
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="less">
  .coin-home {
    &-horn {
      background: url(../../assets/img/home/home-horn.png) no-repeat center center;
      background-size: 100% 100%;
      height: 0.73rem;
      &-box {
        color: #fff;
        font-size: 0.3rem;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        width: 68%;
        &-item {
          animation: run 7s ease-out infinite;
          left: 0;
          position: absolute;
          top: 50%;
          white-space: nowrap;
          min-width: 100%;
        }
      }
    }
    .coin-over {
      background: url(../../assets/img/home/homebg.png) no-repeat center bottom;
      background-size: 95% auto;
      height: 6.5rem;
      overflow: hidden;
    }
    &-list {
      // display: flex;
      // flex-wrap: wrap;
      height: 6.5rem;
      position: relative;
      // overflow: hidden;
      .mask {
        height: 3.5rem;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 100;
      }
      &-item {
        background: url(../../assets/img/home/gamebg.png) no-repeat center center;background-size: 100% 100%;
        color: rgba(255,255,255,.8);
        display: inline-block;
        font-size: 0.3rem;
        height: 2.625rem;
        text-align: center;
        width: 35%;
        padding: 0.2rem;
        position: absolute;
        top: 15%;
        left: 0;
        &-img {transform: translate(-50%, -50%) rotate(45deg);overflow: hidden;height: 61%;position: absolute;left: 50%;top: 50%; width: 61%;display: flex;align-items: center;justify-content: center; img { height: 150%;width: 220%;transform: rotate(-45deg);}}
        &-name {color: #ffd660;font-size: 0.25rem;position: absolute;bottom: -20%;left: 0;text-align: center;width: 100%;cursor: pointer;}
      }
    }
  }
  @keyframes run {
    from {transform: translate(100%, -50%);}
    to {transform: translate(-100%, -50%);}
  }
</style>