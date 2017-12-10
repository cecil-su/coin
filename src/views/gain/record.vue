<template>
  <div class="coin-gain-record">
    <div class="coin-gain-record-title">
      <div class="item">时间</div>
      <div class="item">盈亏</div>
      <div class="item">状态</div>
    </div>
    <su-scroll :update="updateGainRecord">
      <div class="coin-gain-record-list" v-if="list.length > 0">
        <div class="coin-gain-record-list-item" v-for="item in list">
          <div class="item">{{item.time}}</div>
          <div class="item"><span class="s" v-if="item.type === 1">{{item.value}}</span><span class="f" v-else>{{item.value}}</span></div>
          <div class="item"><span class="s" v-if="item.type === 1">{{item.status}}</span><span class="f" v-else>{{item.status}}</span></div>
        </div>
      </div>
    </su-scroll>
  </div>
</template>

<script>
  import { initGainRecord, updateGainRecord } from '../../vuex/actions'
  import scroll from '../../components/base/scroll'
  export default {
    components: {
      suScroll: scroll
    },
    vuex: {
      actions: {
        initGainRecord,
        updateGainRecord
      },
      getters: {
        list: (state) => state.record.profit
      }
    },
    route: {
      data () {
        this.initGainRecord()
      }
    }
  }
</script>

<style lang="less">
  .coin-gain-record {
    padding: 0.25rem 0;
    &-title {
      align-items: center;
      background-color: rgba(51,69,151,.6);
      border-radius: 0.2rem;
      color: rgba(255,255,255,.8);
      display: flex;
      font-size: 0.3rem;
      height: 1rem;
      margin-bottom: 0.1rem;
      padding: 0 0.25rem;
      .item {
        flex: 1;
        text-align: center;
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    &-list {
      background-color: rgba(51,69,151,.6);
      border-radius: 0.2rem;
      color: rgba(255,255,255,.8);
      padding: 0.25rem;
      &-item {
        align-items: center;
        display: flex;
        height: 0.9rem;
        position: relative;
        &:not(:first-child):after {
          background-color: rgba(255,255,255,.1);
          content: '';
          height: 1px;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
        .s {color: #3ce00a;}
        .f {color: #fd1f1f;}
        .item {
          flex: 1;text-align: center;
          &:first-child {
            text-align: left;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }
</style>