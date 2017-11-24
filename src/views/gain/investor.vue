<template>
  <div class="coin-gain-record">
    <div class="coin-gain-record-title">
      <div class="item">投资者</div>
      <div class="item">投资数量</div>
      <div class="item">投资占比</div>
      <div class="item">累计盈亏</div>
    </div>
    <div class="coin-gain-record-list" v-if="list.length > 0">
      <div class="coin-gain-record-list-item" v-for="item in list">
        <div class="item">{{item.name}}</div>
        <div class="item">{{item.value}}</div>
        <div class="item">{{item.percent}}</div>
        <div class="item">{{item.profit}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initGainInvestor } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        initGainInvestor
      },
      getters: {
        list: (state) => state.record.user
      }
    },
    route: {
      data () {
        this.initGainInvestor()
      }
    }
  }
</script>