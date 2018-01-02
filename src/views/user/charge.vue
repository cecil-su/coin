<template>
  <div class="coin-user-charge" v-if="coin">
    <div class="coin-user-charge-box">
      <div class="img"><img :src="coin.icon"></div>
      <div class="text">{{coin.coin_name}}</div>
    </div>
    <div class="coin-user-charge-info">{{coin.desc}}</div>
    <div class="coin-user-charge-tab">
      <div class="coin-user-charge-tab-item" v-for="item in tabs" v-bind:class="{active: currentTabIndex == $index}" @click="handleTabIndex($index)">{{item}}</div>
    </div>
    <div class="coin-user-charge-form-input" v-show="currentTabIndex == 0" style="margin-top: 0.5rem;">
      <su-input :value.sync="chargeNum" place="输入充值数量"></su-input>
      <div style="color: #fff;font-size: 0.2rem;margin-top: 0.3rem;text-align: center;">可用数量：{{coin.btzf_coin_num}}{{coin.short}}</div>
      <a class="btn" type="button" @click = "handleChargeBtzf()"></a>
      <div style="color: #fff;font-size: 0.2rem;text-align: center;">充值成功后即时到账</div>
    </div>
    <div class="coin-user-charge-form" v-show="currentTabIndex == 1">
      <div class="coin-user-charge-form-input">
        <div class="text">{{coin.address}}</div>
      </div>
      <div class="coin-user-charge-form">
        <!--<a class="btn address" @click="handleCopy"></a>-->
        <div class="s">我们将在收到3次确认以后为您充值成功</div>
      </div>
    </div>
    <!-- <div class="coin-user-charge-ad" v-if="adv">
      <a class="img" :href="adv.url"><img :src="adv.icon"><span style="color: #fff;">钱包下载</span></a>
      <div class="text">
        <div class="t">{{adv.name}}</div>
        <a class="btn" :href="adv.url">下载地址</a>
      </div>
    </div> -->
  </div>
</template>

<script>
  import input from '../../components/base/input'
  import { initUserCharge, postChargeBtzf } from '../../vuex/actions'
  export default {
    components: {
      suInput: input
    },
    data () {
      return {
        tabs: ['比特支付', '其他钱包'],
        currentTabIndex: 0,
        chargeNum: ''
      }
    },
    vuex: {
      actions: {
        initUserCharge,
        postChargeBtzf
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
    },
    methods: {
      handleTabIndex (i) {
        this.currentTabIndex = i
      },
      handleCopy () {
        document.execCommand('Copy', 'false', this.coin.address)
      },
      handleChargeBtzf(){
          this.postChargeBtzf(this.chargeNum).then(res => {
              if (res.error === 0) {
                  this.coin.btzf_coin_num = res.coin
                  this.chargeNum = ''
              }
          });
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
    &-info {
      color: red;font-size: 0.2rem;text-align: center;margin-top: 0.3rem;
    }
    &-tab {
      margin-top: 0.5rem;
      text-align: center;
      &-item {
        border-bottom: 1px solid transparent;
        color: #fff;
        display: inline-block;
        font-size: 0.3rem;
        margin: 0 0.5rem;
        padding-bottom: 0.1rem;
        &.active {
          border-color: #fff;
        }
      }
    }
    &-radio {
      .item {
        background: rgba(51, 69, 151, 0.6);
        border: 5px solid rgba(51, 69, 151, 0.6);
        border-radius: 5px;
        display: inline-block;
        margin-right: 0.1rem;
        height: 5px;
        width: 5px;
        position: relative;
        &.active {
          position: relative;
          &:after {
            background-color: #000;
            border-radius: 50%;
            content: '';
            width: 6px;
            height: 6px;
            position: absolute;
            left: -3px;
            top: -3px;
          }
        }
      }
    }
    &-form {
      color: rgba(255,255,255,.8);
      margin-top: 0.5rem;
      .ye {color: red;font-size: 0.3rem;}
      &-input {
        margin: 0.2rem auto 0.4rem;
        .text, .su-input input {
          background-color: rgba(51,69,151,.6); 
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 0.45rem;
          color: #fff;
          font-size: 0.3rem;
          height: 0.9rem;
          text-indent: 1.5em;
          &::-webkit-input-placeholder {
            color: #0.3rem;
          }
        }
        .text {font-size: 0.3rem;line-height: 0.9rem;text-align: center;}
        .btn {
          background: url(../../assets/img/home/true-btn.png) no-repeat center center;
          background-size: 100% 100%;
          display: block;
          height: 0.75rem;
          margin: 0.5rem auto 0.3rem;
          width: 3.2rem;
        }
      }
      .b {color: red;font-size: 0.35rem;margin-bottom: 0.3rem;text-align: center;}
      .s {font-size: 0.2rem;text-align: center;}
      .btn {
        background: url(../../assets/img/home/charge-btn.png) no-repeat center center;
        background-size: 100% 100%;
        display: block;
        height: 0.75rem;
        margin: 1rem auto 0.5rem;
        width: 3.2rem;
        &.address {
          background: url(../../assets/img/home/address-btn.png) no-repeat center center;
          background-size: 100% 100%;
        }
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