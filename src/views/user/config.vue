<template>
  <div class="coin-user-config" v-if="user">
    <div class="coin-user-config-box">
      <div class="flex">
        <div class="img">
          <img :src="user.avatar" alt="">
        </div>
        <div class="btn"><su-upload name="编辑头像" :show="false" :replace.sync="user.avatar" @add="addFile"></su-upload></div>
      </div>
      <div class="info">
        <div class="flex center">昵称：</div>
        <div class="name">
          <input type="text" v-model="user.username">
        </div>
      </div>
    </div>
    <input type="button" class="coin-user-config-btn" value="确定" @click="postChangeUser(url, user.username)">
  </div>
</template>

<script>
  import upload from '../../components/base/upload'
  import { initUserConfig, postChangeUser } from '../../vuex/actions'
  export default {
    data () {
      return {
        url: ''
      }
    },
    components: {
      suUpload: upload
    },
    vuex: {
      actions: {
        initUserConfig,
        postChangeUser
      },
      getters: {
        user: (state) => state.user
      }
    },
    methods: {
      addFile (file, list, res) {
        this.url = res
      }
    },
    route: {
      data () {
        this.initUserConfig()
      }
    }
  }
</script>

<style lang="less">
  .coin-user-config {
    padding: 0.5rem 0;
    &-box {
      border-radius: 0.2rem;
      color: rgba(255,255,255,.8);
      font-size: 0.25rem;
      background-color: rgba(51,69,151,0.6);
      padding: 0.25rem;
      > .flex {
        align-items: center;
        padding-bottom: 0.25rem;
        position: relative;
        &:after {
          background-color: rgba(255,255,255,.1);
          bottom: 0;
          content: '';
          height: 1px;
          left: 0;
          position: absolute;
          transform: scaleY(.5);
          width: 100%;
        }
        .img {
          background-color: #c3c4f3;
          border-radius: 50%;
          height: 1rem;
          margin-right: 0.25rem;
          overflow: hidden;
          position: relative;
          width: 1rem;
          img {width: 100%;}
        }
      }
      .info {
        display: flex;
        padding-top: 0.25rem;
        .flex {text-align:center;margin-right: 0.25rem;width: 1rem;}
        .name {width: 5.75rem;}
        input {border: none;width: 100%;}
      }
    }
    &-btn {
      background-color: #636ccb;
      border: none;
      border-radius: 0.45rem;
      color: #fff;
      font-size: 0.4rem;
      font-family: 微软雅黑;
      height: 0.9rem;
      margin: 2rem 0.25rem 0;
      width: 7rem;
    }
  }
</style>