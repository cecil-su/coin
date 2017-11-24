<template>
  <div class="coin-user-password">
    <div class="flex center column white" style="height: 80%;">
      <div class="title" style="font-size: 0.6rem;margin-bottom: 0.4rem;"><img src="../../assets/img/login/logo.png" style="width: 2.28rem;height: 0.96rem;"></div>
      <div class="desc" style="font-size: 0.4rem;margin-bottom: 1rem;">首个虚拟币游戏中心</div>
      <div class="b" style="font-size: 0.3rem;">
        合作邮箱：1467888888@qq.com <br>
        联系电话：18914009186
      </div>
    </div>
  </div>
</template>

<script>
  import { setHeader } from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        setHeader
      }
    },
    route: {
      data () {
        this.setHeader({'title': '关于我们', 'linkLeft': '/user'})
      }
    }
  }
</script>