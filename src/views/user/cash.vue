<template>
  <div class="coin-user-charge" v-if="user">
    <div class="coin-user-charge-box">
      <div class="img"><img :src="user.icon"></div>
      <div class="text">{{user.coin_name}}</div>
    </div>
    <div class="coin-user-charge-form">
      <div class="flex between">
        <div>提币数量</div>
        <div class="ye">可用数量：{{user.coin}}</div>
      </div>
      <div class="coin-user-charge-form-input">
        <su-input :value.sync="num"></su-input>
        <div class="ye" style="margin-top:0.2rem;">{{user.desc}}</div>
      </div>
      <div class="coin-user-charge-radio">
        <span v-for="item in radios" @click="hanldeRadio($index)" style="margin-right: 0.5rem;"><span class="item" v-bind:class="{active: currentRadioIndex == $index}"></span>{{item}}</span>
      </div>
      <div class="btn" @click="postUser" v-show="currentRadioIndex == 0"></div>

      <div class="coin-user-charge-form-input" v-show="currentRadioIndex == 1">
        <su-input :value.sync="adr"></su-input>
      </div>
      <div class="btn" @click="postUser" v-show="currentRadioIndex == 1"></div>
      <!-- <div class="flex center">为了您的账户安全,每笔提币数量不能超过500000000,如果您有更高的需求,请与网站客服联系,提币手续费为0.</div> -->
    </div>
  </div>
</template>

<script>
  import input from '../../components/base/input'
  import { initUserCash, postUserCash } from '../../vuex/actions'
  export default {
    data () {
      return {
        radios: ['比特支付', '其他钱包'],
        currentRadioIndex: 0,
        num: '',
        adr: ''
      }
    },
    components: {
      suInput: input
    },
    vuex: {
      actions: {
        initUserCash,
        postUserCash
      },
      getters: {
        user: (state) => state.user
      }
    },
    route: {
      data () {
        this.initUserCash()
      }
    },
    methods: {
      postUser () {
        this.postUserCash(this.num, this.adr).then(res => {
          if (res.error === 0) {
            this.user.coin = res.coin
            this.num = ''
            this.adr = ''
          }
        })
      },
      hanldeRadio (i) {
        this.currentRadioIndex = i
      }
    }
  }
</script>
