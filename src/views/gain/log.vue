<template>
  <div class="coin-gain-record">
    <div class="coin-gain-record-title">
      <div class="item">时间</div>
      <div class="item">数量</div>
      <div class="item">用途</div>
      <div class="item">状态</div>
    </div>
    <su-scroll :update="updateGainLog">
      <div class="coin-gain-record-list" v-if="list.length > 0">
        <div class="coin-gain-record-list-item" v-for="item in list">
          <div class="item">{{item.addtime}}</div>
          <div class="item">{{item.value}}</div>
          <div class="item">{{item.use}}</div>
          <div class="item"><span class="s" v-if="item.status === '成功'">{{item.status}}</span><span class="f" v-else>{{item.status}}</span></div>
        </div>
      </div>
    </su-scroll>
  </div>
</template>

<script>
  import { initGainLog, updateGainLog } from '../../vuex/actions'
  import scroll from '../../components/base/scroll'
  export default {
    components: {
      suScroll: scroll
    },
    vuex: {
      actions: {
        initGainLog,
        updateGainLog
      },
      getters: {
        list: (state) => state.record.join
      }
    },
    route: {
      data () {
        this.initGainLog()
      }
    }
  }
</script>