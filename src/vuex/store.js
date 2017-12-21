import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  header: {},
  navbar: {
    show: true,
    active: 'active',
    options: [
      {'name': '首页', 'icon': 'icon-home', 'link': '/home'},
      {'name': '投资', 'icon': 'icon-gain', 'link': '/gain'},
      {'name': '我的', 'icon': 'icon-user', 'link': '/user'}
    ]
  },
  home: {},
  gain: {},
  user: {},
  downLine: {
      downlineData:[]
  },
  login: [],
  record: {
    join: [],
    profit: [],
    user: [],
    charge: []
  }
}
const mutations = {
  SET_HEADER (state, val) {
    state.header = val
  },
  SET_HOME (state, val) {
    state.home = val
  },
  SET_GAIN (state, val) {
    state.gain = val
  },
  SET_GAIN_ITEM (state, val) {
    state.gain.coin = (state.gain.coin - val).toFixed(4)
    state.gain.coin_pool = (state.gain.coin_pool - val).toFixed(4)
  },
  SET_USER (state, val) {
    state.user = val
  },
  SET_DOWNLINE (state, val) {
    state.downLine = val
  },
  SET_LOGIN (state, val) { // 引导页
    state.login = val
  },
  PUSH_LOGIN (state, val) {
    window.localStorage.setItem('LOAD_PAGE-1', (parseInt(window.localStorage.getItem('LOAD_PAGE-1'))) + 1)
    state.login = state.login.concat(val)
  },
  SET_LOG (state, key, val) {
    state.record[key] = val
  },
  PUSH_LOG (state, key, val) {
    window.localStorage.setItem('LOAD_PAGE-1', (parseInt(window.localStorage.getItem('LOAD_PAGE-1'))) + 1)
    state.record[key] = state.record[key].concat(val)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
