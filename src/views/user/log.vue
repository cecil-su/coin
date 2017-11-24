<template>
  <div class="coin-gain-record">
    <div class="coin-gain-record-title">
      <div class="item">时间</div>
      <div class="item">数量</div>
      <div class="item">类型</div>
      <div class="item">状态</div>
    </div>
    <su-scroll :update="updateGainLog">
      <div class="coin-gain-record-list" v-if="list.length > 0">
        <div class="coin-gain-record-list-item" v-for="item in list">
          <div class="item">{{item.addtime}}</div>
          <div class="item">{{item.value}}</div>
          <div class="item">{{item.type}}</div>
          <div class="item">{{item.status}}</div>
        </div>
      </div>
    </su-scroll>
  </div>
</template>

<script>
  import { initUserLog, updateUserLog } from '../../vuex/actions'
  import scroll from '../../components/base/scroll'
  export default {
    components: {
      suScroll: scroll
    },
    vuex: {
      actions: {
        initUserLog,
        updateUserLog
      },
      getters: {
        list: (state) => state.record.charge
      }
    },
    route: {
      data () {
        this.initUserLog()
      }
    }
  }
</script>