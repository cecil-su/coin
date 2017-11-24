<template>
  <div class="coin-load">
    <div class="coin-load-box" v-if="load">
      <div class="coin-load-box-item" v-for="item in load" @click="setCoinType(item.coin_type, item.icon)">
        <div class="img"><img :src="item.icon"></div>
        <div class="white">{{item.name}}</div>
        <div class="red">{{item.player}}人在玩</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initLoad, setCoinType } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        initLoad,
        setCoinType
      },
      getters: {
        load: (state) => state.login
      }
    },
    route: {
      data () {
        this.initLoad()
      }
    }
  }
</script>

<style lang="less">
  .coin-load {
    align-items: center;
    background: url('../../assets/img/home/load-bg.png') no-repeat center bottom;
    background-size: 100% 100%;
    display: flex;
    height: 13.34rem;
    justify-content: center;
    width: 100%;
    &-box {
      width: 7rem;
      display: flex;
      flex-wrap: wrap;
      &-item {
        background-color: rgba(51,69,151,.6);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 0.15rem;
        display: block;
        flex-basis: 30.3333%;
        margin: 1.5%;
        padding: 0.5rem 0 0.3rem;
        text-align: center;
        width: 30.3333%;
        .img {margin: 0 auto;width: 0.84rem; img {width: 100%;}}
        .white {margin-top: 0.15rem;}
        .red {color: #ff3a3a;margin-top: 0.1rem;}
      }
    }
  }
</style>
