<template>
  <div class="coin-home">
    <su-slider :list="banner"></su-slider>
    <div class="coin-home-horn" v-if="annou">
      <div class="coin-home-horn-box">
        <div class="coin-home-horn-box-item"><a :href="note.url">{{note.content}}</a></div>
      </div>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in list">
          <a :href="item.url" class="link">
            <div class="img" :style="{'background':'url('+ item.img +') no-repeat center center', 'background-size': 'cover'}"></div>
            <div class="text">{{item.name}}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initHome, toUrl, getCookie } from '../../vuex/actions'
  import slider from '../../components/base/slider'
  import swiper from '../../assets/css/swiper.min.js'
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
      }
    },
    watch: {
      annou (val) {
        if (val.length > 0) {
          this.note = val[0]
          let i = 0
          this.timer = setInterval(() => {
            i++
            if (i === val.length) {
              i = 0
            }
            this.note = val[i]
          }, 7000)
        }
      },
      list (val) {
        if (val.length > 0) {
          var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1
            }
          })
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="less">
  @import '../../assets/css/swiper.min.css';
  .coin-home {
    &-horn {
      background: url(../../assets/img/home/home-horn.png) no-repeat center center;
      background-size: 100% 100%;
      height: 0.73rem;
      &-box {
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.73rem;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        width: 68%;
        &-item {
          animation: run 7s ease-out infinite;
          left: 0;
          position: absolute;
          top: 0;
          white-space: nowrap;
          min-width: 100%;
          a {color: #fff;}
        }
      }
    }
    .swiper-container {height: 5rem;margin-top: 1rem;}
    .swiper-slide {background: url(../../assets/img/home/gamebg.png) no-repeat center center;height: 4rem;width: 4rem;background-size: 100% 100%;opacity: 0.5;}
    .swiper-slide-active {opacity: 1;}
    .swiper-slide .link {display: block;}
    .swiper-slide .img {display: block;height: 4rem;width: 4rem;margin: 0;overflow: hidden;clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);}
    .swiper-slide .text {color: #ffd600;font-size: 0.35rem;margin-top: 0.2rem;text-align: center;}
    .swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right {background-image: none;}
  }
  @keyframes run {
    from {transform: translateX(100%);}
    to {transform: translateX(-100%);}
  }
</style>