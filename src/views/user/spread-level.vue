<template>
  <div class="coin-user-spread">
    <div class="coin-user-spread-item">
      <div class="flex between level">
        <div>渠道商</div>
        <div style="color: red;">支付200MCC</div>
        <div><a class="btn" @click="handleLevelUpdate">升级</a></div>
      </div>
    </div>
    <div class="coin-user-spread-item">
      <div class="flex between level">
        <div>代理商</div>
        <div style="color: red;">支付200MCC</div>
        <div><a class="btn" @click="handleLevelUpdate">升级</a></div>
      </div>
    </div>
    <div class="coin-user-spread-item">
      <div class="flex between level">
        <div>合伙人</div>
        <div style="color: red;">支付200MCC</div>
        <div><a class="btn" @click="handleLevelUpdate">升级</a></div>
      </div>
    </div>
    <div class="coin-user-spread-mask" v-show="alertVisible" @click="alertVisible = false">
      <div class="coin-user-spread-alert">
        <div class="title">您的余额不足200MCC，请充值后再升级！</div>
        <div>
          <a class="btn" v-link="{name: 'user-charge'}">去充值</a>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { initUserSpreadLevel } from '../../vuex/actions'
  export default {
    data () {
      return {
        alertVisible: false
      }
    },
    vuex: {
      actions: {
        initUserSpreadLevel,
      }
    },
    route: {
      data () {
        this.initUserSpreadLevel()
      }
    },
    methods: {
      handleLevelUpdate () {
        this.alertVisible = true
      }
    }
  }
</script>