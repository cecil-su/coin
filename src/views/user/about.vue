<template>
  <div class="coin-user-password" style="padding-bottom: 1rem;background: #353575;padding: 0.5rem 0.25rem 1.5rem;">
    <div class="flex center column white">
      <p style="font-size: 0.3rem;">
        <span style="color: red;">玩法说明</span><br>
        1、本平台支持多种虚拟币，每个币种都有自己独立的游戏场；<br>
        2、普通玩家可以通过玩游戏赚币，赚币速度更快、盈利空间更大，但风险也高；<br>
        3、你也可以做投资者与普通玩家进行PK，系统根据你的投资占比进行盈亏分配，此法适合中长期投资者；<br>
        4、平台会在每次投资获利中抽取 5% 作为平台团队的服务费；<br>
        5、为了适应多种游戏，我们将充值进来的币按固定比例换成“券”进行游戏，提现的时候再那个比例兑换成币；<br>
        6、投资收益从投资的第二天开始计算，投资资金撤资时间为每周日0：00 - 24：00。<br><br>
        <span style="color: red;">重要声明</span><br>
        平台只接受免费挖矿获得的虚拟币进行游戏，不支持任何法定货币、兑换法定货币及相关交易服务。<br><br>
      </p>
      <div class="title" style="font-size: 0.6rem;margin-bottom: 0.4rem;"><img src="../../assets/img/login/logo.png" style="width: 2.28rem;height: 0.96rem;"></div>
      <div class="desc" style="font-size: 0.4rem;">首个虚拟币游戏中心</div>
      <div class="b" style="font-size: 0.3rem;">
        合作QQ：1467888888 <br>
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
        this.setHeader({'title': '玩法说明', 'linkLeft': '/user'})
      }
    }
  }
</script>