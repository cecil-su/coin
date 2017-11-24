<template>
  <div class="coin-sign">
    <a class="coin-sign-back" v-link="{name: 'signin'}"></a>
    <div class="coin-sign-box">
      <div class="coin-sign-box-logo"><img src="../../assets/img/login/logo.png"></div>
      <div class="coin-sign-box-form">
        <su-input :value.sync="name" place="请输入用户名"></su-input>
        <su-input :value.sync="pwd" type="password" place="请输入密码"></su-input>
        <su-input :value.sync="repwd" type="password" place="请确认密码"></su-input>
      </div>
      <div class="coin-sign-box-btn" @click="postSignUp(name, pwd, repwd, type)"></div>
    </div>
  </div>
</template>

<script>
  import input from '../../components/base/input'
  import { isHasCoinType, postSignUp } from '../../vuex/actions'
  export default {
    data () {
      return {
        name: '',
        pwd: '',
        repwd: ''
      }
    },
    components: {
      suInput: input
    },
    vuex: {
      actions: {
        isHasCoinType,
        postSignUp
      }
    },
    route: {
      data () {
        this.isHasCoinType()
      }
    }
  }
</script>