<template>
  <div class="coin-user-spread">
    <div class="coin-user-spread-item">
      <div class="flex between">
        <div class="flex user">
          <img src="http://new_game.yiqu365.com/images/static/default.jpg">
          <div class="flex column center-v">
            <div>周小志(ID：1243)</div>
            <div>黄金会员</div>
          </div>
        </div>
        <div class="flex center">
          <a class="btn" v-link="{name: 'user-spread-level'}">快速升级</a>
        </div>
      </div>
      <div class="link">
        <div class="flex between">
          <div class="flex center">推广链接：</div>
          <div class="flex center" style="font-size: 0.25rem;">长按复制</div>
        </div>
        <div style="font-size: 0.23rem;margin-top: 0.3rem;">http://www.iconfont.cn/search/index?q%E6A8%E5%B9&page=1</div>
      </div>
    </div>
    <div class="coin-user-spread-item flex">
      <div class="flex-item text-center">
        <div>推广奖励</div>
        <div class="text-small"><span class="text-big">789</span>MCC</div>
        <a class="yellow" v-link="{name: 'user-spread-reward'}">查看明细</a>
      </div>
      <div class="flex-item text-center">
        <div>推广人数</div>
        <div class="text-small"><span class="text-big">567</span>人</div>
        <a class="yellow" v-link="{name: 'user-spread-person'}">查看明细</a>
      </div>
    </div>
    <div class="coin-user-spread-item">
      <div class="title">推广奖励</div>
      <div class="flex between content">
        <div class="text-center" v-for="item in vips">
          {{item.name}}<br>{{item.number}}
        </div>
      </div>
      <div class="flex between content">
        <div class="text-center" v-for="item in roles">
          {{item.name}}<br>{{item.number}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initUserSpread } from '../../vuex/actions'
  export default {
    data () {
      return {
        vips: [
          {name: '普通会员', number: '20'},
          {name: '黄金会员', number: '20'},
          {name: '钻石会员', number: '20'}
        ],
        roles: [
          {name: '渠道商', number: '20'},
          {name: '代理人', number: '20'},
          {name: '合伙人', number: '20'}
        ]
      }
    },
    vuex: {
      actions: {
        initUserSpread,
      }
    },
    route: {
      data () {
        this.initUserSpread()
      }
    }
  }
</script>

<style lang="less">
  .coin-user-spread {
    padding: 0.3rem;
    .btn {
      background-color: #6a6fc2;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.3rem;
      padding: 0.1rem 0.25rem;
    }
    &-item {
      background: rgba(51, 69, 151, 0.6);
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.3rem;
      margin-bottom: 0.3rem;
      padding: 0.3rem;
      .user {
        color: #fff;
        font-size: 0.3rem;
        img {
          border-radius: 50%;
          height: 1rem;
          margin-right: 0.1rem;
        }
      }
      .link {
        border-top: 1px solid #4C3F94;
        color: #fff;
        margin-top: 0.3rem;
        padding-top: 0.3rem;
      }
      .flex-item {
        line-height: 2;
        .text-big {font-size: 0.4rem;margin-right: 0.1rem;}
        .text-small {font-size: 0.2rem;}
        .yellow {
          color: #F2DE2B;
          font-size: 0.25rem;
        }
      }
      .title {color: #fff;}
      .content {margin-top: 0.4rem;.text-center {line-height: 2;}}
    }
    &-mask {
      align-items: center;
      background: rgba(0,0,0,.6);
      bottom: 0;
      display: flex;
      left: 0;
      justify-content: center;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 10000;
    }
    &-alert {
      align-items: center;
      background: rgba(51, 69, 151, 1);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 0.2rem;
      color: #fff;
      display: flex;
      flex-direction: column;
      font-size: 0.3rem;
      height: 2.8rem;
      justify-content: center;
      width: 90%;
      .title {
        margin-bottom: 0.7rem;
      }
      .btn {
        display: inline-block;
      }
    }
  }
</style>