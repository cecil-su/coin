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
          <div class="item">{{item.level}}</div>
          <div class="item">{{item.time}}</div>
        </div>
      </div>
    </su-scroll>
  </div>
</template>

<script>
  import scroll from '../../components/base/scroll'
  import { initUserSpreadReward } from '../../vuex/actions'
  export default {
    components: {
      suScroll: scroll
    },
    data () {
      return {
        list: [
          {name: '哈哈哈', level: '普通会员', time: '2017-10-23'},
          {name: '哈哈哈', level: '普通会员', time: '2017-10-23'},
          {name: '哈哈哈', level: '普通会员', time: '2017-10-23'},
          {name: '哈哈哈', level: '普通会员', time: '2017-10-23'},
          {name: '哈哈哈', level: '普通会员', time: '2017-10-23'}
        ]
      }
    },
    vuex: {
      actions: {
        initUserSpreadReward,
      }
    },
    route: {
      data () {
        this.initUserSpreadReward()
      }
    }
  }
</script>