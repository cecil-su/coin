<template>
  <div class="coin-gain-record">
    <div class="coin-gain-record-title">
      <div class="item">昵称</div>
      <div class="item">等级</div>
      <div class="item">时间</div>
    </div>
    <su-scroll :update="updateGainLog">
      <div class="coin-gain-record-list" v-if="list.length > 0">
        <div class="coin-gain-record-list-item" v-for="item in list">
          <div class="item">{{item.name}}</div>
          <div class="item">{{item.downlind_vip_name}}</div>
          <div class="item">{{item.time}}</div>
        </div>
      </div>
    </su-scroll>
  </div>
</template>

<script>
  import scroll from '../../components/base/scroll'
  import { initUserSpread, initUserSpreadPerson } from '../../vuex/actions'
  export default {
    components: {
      suScroll: scroll
    },
    vuex: {
      actions: {
        initUserSpreadPerson,
        initUserSpread,
      },
      getters: {
          list: (state) => state.downLine.downlineData
      }
    },
    route: {
      data () {
        this.initUserSpreadPerson()
        this.initUserSpread()
      }
    }
  }
</script>