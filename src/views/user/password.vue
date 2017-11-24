<template>
  <div class="coin-user-password">
    <su-input :value.sync="old" type="password" place="请输入您的旧密码"></su-input>
    <su-input :value.sync="pwd" type="password" place="请输入您的新密码"></su-input>
    <su-input :value.sync="repwd" type="password" place="请确认您的新密码"></su-input>
    <input type="button" class="coin-user-password-btn" value="确定修改" @click="postChangePwd(old, pwd, repwd)">
  </div>
</template>

<script>
  import input from '../../components/base/input'
  import { setHeader, postChangePwd } from '../../vuex/actions'
  export default {
    data () {
      return {
        old: '',
        pwd: '',
        repwd: ''
      }
    },
    components: {
      suInput: input
    },
    vuex: {
      actions: {
        setHeader,
        postChangePwd
      }
    },
    route: {
      data () {
        this.setHeader({'title': '修改密码', 'linkLeft': '/user'})
      }
    }
  }
</script>

<style lang="less">
  .coin-user-password {
    background-color: #353575;
    height: 11.34rem;
    padding: 0.5rem 0.25rem;
    .su-input {
      margin-bottom: 0.5rem;
      input {
        background-color: #515ab7;
        border: none;
        border-radius: 0.45rem;
        font-size: 0.3rem;
        height: 0.9rem;
        text-indent: 1.5em;
        width: 100%;
      }
    }
    &-btn {
      background-color: #bd3852;
      border: none;
      border-radius: 0.45rem;
      color: #fff;
      font-family: 微软雅黑;
      font-size: 0.4rem;
      height: 0.9rem;
      margin-top: 1.5rem;
      width: 100%;
    }
  }
</style>