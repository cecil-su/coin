<template>
  <div class="coin-user-charge" v-if="coin">
    <div class="coin-user-charge-box">
      <div class="img"><img :src="coin.icon"></div>
      <div class="text">{{coin.coin_name}}</div>
    </div>
    <div class="coin-user-charge-form">
      <div class="flex between">
        <div>充币地址</div>
        <div class="ye">{{coin.desc}}</div>
      </div>
      <div class="coin-user-charge-form-input">
        <div class="text">{{coin.address}}</div>
      </div>
      <div class="coin-user-charge-form-tip">
        <div class="b">复制上面的钱包地址</div>
        <div class="s">我们将在收到3次确认以后为您充值成功</div>
      </div>
    </div>
    <div class="coin-user-charge-ad" v-if="adv">
      <a class="img" :href="adv.url"><img :src="adv.icon"><span style="color: #fff;">钱包下载</span></a>
      <!-- <div class="text">
        <div class="t">{{adv.name}}</div>
        <a class="btn" :href="adv.url">下载地址</a>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { initUserCharge } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        initUserCharge
      },
      getters: {
        coin: (state) => state.user.coin_info,
        adv: (state) => state.user.banner
      }
    },
    route: {
      data () {
        this.initUserCharge()
      }
    }
  }
</script>

<style lang="less">
  .coin-user-charge {
    padding: 0.25rem 0.25rem 0.5rem;
    &-box {
      align-items: center;
      background-color: rgba(51,69,151,.6); 
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.25rem;
      .img {width: 1rem; img {width: 100%;}}
      .text {color: rgba(255,255,255,.8);font-size: 0.3rem;}
    }
    &-form {
      color: rgba(255,255,255,.8);
      margin-top: 1rem;
      .ye {color: #fed803;font-size: 0.2rem;}
      &-input {
        margin: 0.2rem auto 0.4rem;
        .text, .su-input input {
          background-color: rgba(51,69,151,.6); 
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 0.45rem;
          font-size: 0.4rem;
          height: 0.9rem;
          text-indent: 1.5em;
        }
        .text {font-size: 0.2rem;line-height: 0.9rem;text-align: center;}
      }
      .b {color: red;font-size: 0.35rem;margin-bottom: 0.3rem;text-align: center;}
      .s {font-size: 0.2rem;text-align: center;}
      .btn {
        background: url(../../assets/img/home/charge-btn.png) no-repeat center center;
        background-size: 100% 100%;
        height: 0.75rem;
        margin: 1rem auto 0.5rem;
        width: 3.2rem;
      }
      .flex.center {font-size: 0.2rem;}
    }
    &-ad {
      align-items: flex-end;
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
      overflow: hidden;
      .img {width: 1.5rem;text-align: center;font-size: 0.3rem; img {width: 100%;}}
      .text {
        color: rgba(255,255,255,.8);
        font-size: 0.35rem;
      }
      .btn {
        background-color: #6a6fc2;
        border-radius: 20px;
        color: rgba(255,255,255,.8);
        display: block;
        font-size: 0.25rem;
        margin-top: 0.4rem;
        padding: 0.1rem 0.5rem;
      }
    }
  }
</style>