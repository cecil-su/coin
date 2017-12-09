<template>
  <div class="coin-sign">
    <a class="coin-sign-back" v-link="{name: 'home'}"></a>
    <div class="coin-sign-box">
      <div class="coin-sign-box-logo"><img src="../../assets/img/login/logo.png"></div>
      <div class="coin-sign-box-form">
        <su-input :value.sync="name" place="请输入用户名"></su-input>
        <su-input :value.sync="pwd" type="password" place="请输入登录密码"></su-input>
      </div>
      <div class="flex between">
        <input type="button" class="btn-r" @click="postSignIn(name, pwd)">
        <!--<input type="button" class="btn-b" @click="this.$route.router.go({name: 'signup'})">-->
      </div>
    </div>
  </div>
</template>

<script>
  import input from '../../components/base/input'
  import { isHasCoinType, postSignIn } from '../../vuex/actions'
  export default {
    data () {
      return {
        name: '',
        pwd: ''
      }
    },
    components: {
      suInput: input
    },
    vuex: {
      actions: {
        isHasCoinType,
        postSignIn
      }
    },
    route: {
      data () {
        this.isHasCoinType()
      }
    }
  }
</script>

<style lang="less">
  .coin-sign {
    align-items: center;
    display: flex;
    height: 13.34rem;
    justify-content: center;
    position: relative;
    width: 100%;
    &-back {
      background: url(../../assets/img/home/icon-back.png) no-repeat center center;
      background-size: 100% 100%;
      height: 0.57rem;
      left: 0.25rem;
      position: absolute;
      top: 0.5rem;
      width: 0.47rem;
      > img {width: 100%;}
    }
    &-box {
      width: 5.58rem;
      &-logo {
        margin: 0 auto;
        width: 2.58rem;
        > img {width: 100%;}
      }
      &-form {
        margin: 1.5rem 0 1.2rem;
        .su-input {margin-bottom: 0.4rem;}
        input {
          background: url(../../assets/img/login/input-bg.png) no-repeat center center;
          background-size: 100% 100%;
          border: none;
          color: #999;
          font-family: 微软雅黑;
          font-size: 0.3rem;
          height: 0.9rem;
          text-indent: 1.5em;
          width: 100%;
          &::-webkit-input-placeholder {color: rgba(0,0,0,.4);}
        }
      }
      &-btn {
        background: url(../../assets/img/login/in-btn.png) no-repeat center center;
        background-size: 100% 100%;
        margin: 0 auto;
        height: 0.97rem;
        width: 3.86rem;
      }
      .btn-r {
        background: url(../../assets/img/login/btn-r.png) no-repeat center center;
        background-size: 100% 100%;
        margin: 0 auto;
        border: none;
        height: 0.76rem;
        width: 2.55rem;
      }
      .btn-b {
        background: url(../../assets/img/login/btn-b.png) no-repeat center center;
        background-size: 100% 100%;
        border: none;
        height: 0.76rem;
        width: 2.55rem;
      }
    }
  }
</style>