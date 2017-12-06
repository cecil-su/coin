<template>
  <div class="su-container fixed all index-ii" v-if="show">
    <div class="coin-gain-back">
      <div class="coin-gain-back-form">
        <div class="coin-gain-back-form-input"><input type="text" placeholder="撤资币数量" v-model="num"></div>
        <div class="coin-gain-back-form-label">友情提示：撤资时间为每周日0：00 - 24：00</div>
        <div class="coin-gain-back-form-btn" @click="btnAction">确定</div>
        <div class="coin-gain-back-form-btn" @click="show = false">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      num: {
        type: Number
      },
      show: {
        type: Boolean,
        default: false
      },
      btnFun: {
        type: Function,
        require: true
      }
    },
    methods: {
      btnAction () {
        this.btnFun(this.num).then(res => {
          if (res.error === 0) {
            setTimeout(() => {
              this.show = false
            }, 1000)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .coin-gain-back {
    align-items: flex-end;
    background-color: rgba(0,0,0,.1);
    display: flex;
    height: 100%;
    width: 100%;
    &-form {
      // background-color: rgba(51,69,151,.6);
      background-color: #353575;
      width: 100%;
      padding: 0.25rem;
      &-input {
        height: 0.9rem;
        input {
          background-color: rgba(255,255,255,.5);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 0.45rem;
          color: rgba(255,255,255,.8);
          font-size: 0.4rem;
          height: 0.9rem;
          text-indent: 1.5em;
          width: 100%;
        }
      }
      &-label {
        font-size: 0.3rem;
        color: red;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
      }
      &-btn {
        background-color: #636ccb;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 0.45rem;
        color: rgba(255,255,255,.8);
        font-size: 0.3rem;
        height: 0.9rem;
        line-height: 0.9rem;
        margin-top: 0.1rem;
        text-align: center;
      }
    }
  }
</style>