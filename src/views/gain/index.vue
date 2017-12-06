<template>
  <div class="coin-gain">
    <div class="coin-gain-cancel" v-if="o && o.invest === 1">
      <div class="flex center column">
        <img :src="o.icon">
        <div>{{o.coin_name}}</div>
      </div>
      <div class="flex center column">
        <div class="t" v-if="o.coin_pool > 0">{{(o.coin / o.coin_pool * 100).toFixed(2)}}%</div>
        <div class="t" v-else>0%</div>
        <div class="b">{{o.coin}}</div>
      </div>
      <div><span class="btn" @click="show = true">撤资</span></div>
    </div>
    <div class="coin-gain-box" v-if="o">
      <div>
        <div class="coin">{{o.coin_pool}}</div>
        <div class="white">实时盈亏</div>
        <div class="f" v-if="o.system_profit < 0">{{o.system_profit}}</div>
        <div class="s" v-else>{{o.system_profit}}</div>
      </div>
    </div>
    <div class="coin-gain-form" v-if="o && o.invest === 0">
      <div class="flex center">投资金额</div>
      <su-input :value.sync="num" place="0.00"></su-input>
      <div class="flex between">
        <div class="white">可投资金额：<span class="ye">{{o.coin}}</span></div>
        <div class="white">投资占比：<span class="ye" v-if="o.coin_pool > 0">{{(num / (o.coin_pool + parseInt(num)) * 100).toFixed(2)}}%</span><span class="ye" v-else>0%</span></div>
      </div>
      <div class="btn-true" @click="postJoinGain(num)"></div>
    </div>
    <div class="coin-gain-form" v-if="o && o.invest === 1">
      <div class="btn-add" @click="getAddGain"></div>
    </div>
    <div class="coin-gain-info" v-if="o && o.invest === 0">
      <div class="title">投资说明</div>
      <p>
        1、您可以在网站上投资一些虚拟币与其他玩家PK;</br>
        2、这里的投资可能盈利，也可能亏损 ，比较适合中、长期投资者;</br>
        3、玩家获利或者投资方获利时，我们抽取 5% 作为网站服务费;</br>
        如您不同意相关协议、公告、规则、操作流程和项目页面承诺,您有权选择不支持;一旦选择支持,即视为您已确知并完全同意相关协议.
      </p>
    </div>
    <div class="coin-gain-info" v-if="o && o.invest === 1">
      <div class="title">我的投资</div>
      <div class="flex">
        <div class="flex center column">
          <div class="white">昨日盈亏</div>
          <div class="ye">{{o.last_profit}}</div>
          <a class="btn" v-link="{name: 'gain-record'}">收益记录</a>
        </div>
        <div class="flex center column">
          <div class="white">累计盈亏</div>
          <div class="ye">{{o.total_profit}}</div>
          <a class="btn" v-link="{name: 'gain-investor'}">投资者</a>
        </div>
      </div>
    </div>
  </div>
  <back :show.sync="show" :btn-fun="backAddGain"></back>
</template>

<script>
  import { initGain, postJoinGain, getAddGain, backAddGain } from '../../vuex/actions'
  import input from '../../components/base/input'
  import back from '../gain/back'
  export default {
    data () {
      return {
        num: '0',
        show: false
      }
    },
    components: {
      suInput: input,
      Back: back
    },
    vuex: {
      actions: {
        initGain,
        postJoinGain,
        getAddGain,
        backAddGain
      },
      getters: {
        o: (state) => state.gain
      }
    },
    route: {
      data () {
        this.initGain()
      }
    }
  }
</script>

<style lang="less">
  .coin-gain {
    padding: 0.5rem 0.25rem 0.5rem;
    .ye {color: #fed803;}
    &-cancel {
      align-items: center;
      background-color: rgba(51,69,151,.6);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 0.25rem;
      color: rgba(255,255,255,.8);
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      padding: 0.25rem;
      img {width: 0.8rem;}
      .t {font-size: 0.2rem;margin-bottom: 0.25rem;}
      .b {color: #fed803;font-size: 0.4rem;}
      .btn {background-color: #6a6fc2;border-radius: 0.4rem;font-size: 0.35rem;padding: 5px 20px 6px;}
    }
    &-box {
      align-items: center;
      background: url(../../assets/img/gain/gain-box-bg.png) no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      height: 2.76rem;
      justify-content: center;
      margin: 0 auto;
      text-align: center;
      width: 3.78rem;
      .coin {color: #fae475;font-size: 0.5rem;}
      .white {font-size: 0.25rem;margin-bottom: 0.1rem;}
      .f {color: #fd1f1f;font-size: 0.25rem;}
      .s {color: #3ce00a;font-size: 0.25rem;}
    }
    &-form {
      > .flex.center {color: rgba(255,255,255,.8);font-size: 0.5rem;margin: 0.4rem 0 0.3rem;}
      .flex.between {margin: 0.25rem auto 0;}
      .su-input input {
        background-color: rgba(51,69,151,.6);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 0.45rem;
        color: rgba(255,255,255,.8);
        font-size: 0.4rem;
        height: 0.9rem;
        text-indent: 1.5em;
      }
      .btn-true,.btn-add {
        background: url(../../assets/img/gain/gain-true.png) no-repeat center center;
        background-size: 100% 100%;
        height: 0.76rem;
        margin: 0.5rem auto 0;
        width: 3.19rem;
      }
      .btn-add {
        background: url(../../assets/img/gain/gain-add.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &-info {
      background-color: rgba(51,69,151,.6);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 0.45rem;
      color: rgba(255,255,255,.8);
      margin: 0.5rem 0 0;
      padding: 0.5rem 0.25rem;
      .title {font-size: 0.4rem;text-align: center;}
      p {font-size: 0.25rem;line-height: 2;}
      > .flex {
        margin-top: 0.3rem;
        position: relative;
        &:after {
          background-color: rgba(255,255,255,.1);
          content: '';
          height: 60%;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
        }
        .center {flex: 1;}
        .white {font-size: 0.3rem;margin-bottom: 0.2rem;}
        .ye {font-size: 0.3rem;margin-bottom: 0.2rem;}
        .btn {background-color: #6a6fc2;border-radius: 0.4rem;color: rgba(255,255,255,.8);font-size: 0.3rem;padding: 0.05rem;text-align: center;width: 1.8rem;}
      }
    }
  }
</style>