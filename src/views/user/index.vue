<template>
  <div class="coin-user">
    <div class="coin-user-info" v-if="user">
      <div class="face">
        <img :src="user.avatar">
      </div>
      <div class="text">
        <div class="flex center white">{{user.name}}</div>
        <div class="flex center">
          <div class="img flex center"><img :src="user.icon"></div>
          <div class="coin white">{{user.coin_name}}</div>
          <div class="num">{{user.coin}}</div>
          <div class="short">{{user.short}}</div>
        </div>
      </div>
    </div>
    <div class="coin-user-btn">
      <a v-link="{name: 'user-charge'}" class="coin-user-btn-item"></a>
      <a v-link="{name: 'user-cash'}" class="coin-user-btn-item"></a>
    </div>
    <div class="coin-user-list">
      <a class="coin-user-list-item" v-link="{name: 'user-config'}">
        <div class="flex center"><img src="../../assets/img/home/user-icon-1.png"></div>
        <div class="flex center">修改资料</div>
      </a>
      <a class="coin-user-list-item" v-link="{name: 'password'}">
        <div class="flex center"><img src="../../assets/img/home/user-icon-2.png"></div>
        <div class="flex center">修改密码</div>
      </a>
      <a class="coin-user-list-item" v-link="{name: 'user-cog'}">
        <div class="flex center"><img src="../../assets/img/home/user-icon-3.png"></div>
        <div class="flex center">设置</div>
      </a>
      <a class="coin-user-list-item" v-link="{name: 'user-about'}">
        <div class="flex center"><img src="../../assets/img/home/user-icon-4.png"></div>
        <div class="flex center">玩法说明</div>
      </a>
      <a class="coin-user-list-item" v-link="{name: 'user-spread'}">
        <div class="flex center">
          <div class="img-sp flex center">
            <img src="../../assets/img/home/user-icon-5.png">
          </div>
        </div>
        <div class="flex center">推广中心</div>
      </a>
    </div>
  </div>
</template>

<script>
  import { initUser } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        initUser
      },
      getters: {
        user: (state) => state.user
      }
    },
    route: {
      data () {
        this.initUser()
      }
    }
  }
</script>

<style lang="less">
  .coin-user {
    &-info {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-top: 0.85rem;
      .face {
        border: 0.05rem solid orange;
        border-radius: 50%;
        box-shadow: 0 0 10px 5px rgba(51,69,151,.6);
        height: 1.65rem;
        margin-left: 0.35rem;
        overflow: hidden;
        width: 1.65rem;
        > img {width: 100%;}
      }
      .text {
        background: url(../../assets/img/home/user-info-bg.png) no-repeat center center;
        background-size: 100% 100%;
        height: 1.26rem;
        width: 4.43rem;
        .flex {font-size: 0.3rem;height: 48%;}
        .img {margin-right: 10px;width: 0.35rem; img {width: 100%;}}
        .coin {color: #fff;margin-right: 10px;}
        .num {color: #fed803;margin-right: 10px;}
        .short {color: #fed803;font-size: 0.2rem;margin-top: 0.05rem;}
      }
    }
    &-btn {
      background: url(../../assets/img/home/user-btn.png) no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      height: 1rem;
      margin: 1.1rem auto 1rem;
      width: 6.26rem;
      &-item {
        display: block;
        flex: 1;
      }
    }
    &-list {
      background: rgba(51,69,151,.6);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 0.3rem;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      padding: 0.3rem 0;
      width: 7rem;
      &-item {
        color: #9095d3;
        display: block;
        margin-bottom: 0.2rem;
        margin-top: 0.2rem;
        flex-basis: 33.3333%;
        width: 33.3333%;
        img {margin-bottom: 0.2rem; width: 1.1rem;}
        .img-sp {background: #FF7AA8;border-radius: 50%;height: 1.1rem;width: 1.1rem;margin-bottom: 0.2rem; img {width: 0.7rem;margin-bottom: 0;}}
      }
    }
  }
</style>
