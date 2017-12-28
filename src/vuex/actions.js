import Vue from 'vue'
var _this = null
var _scode = null
var logined = false
export const initApp = ({dispatch}, t, login) => {
  if (getCookie({dispatch}, 'bhw_scode') === '') {
    _scode = randomChar({dispatch}, 32)
    setCookie({dispatch}, 'bhw_scode', _scode, 30)
  } else {
    _scode = getCookie({dispatch}, 'bhw_scode')
  }
  _this = t
}
/* ----- 初始化引导页 ----- */
export const initLoad = ({dispatch}) => {
  http('index/lead', 'GET', '').then(res => {
    dispatch('SET_LOGIN', res)
  })
}
export const setCoinType = ({dispatch}, val, coin, token) => {
  if (token !== undefined) {
    postTokenSignIn({dispatch}, val, token)
  }
  Vue.http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: window.Game.apiHost + 'user/index',
    method: 'GET',
    params: {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}
  }).then(checkStatus)
  .then(parseJSON)
  .then(res => {
    http('user/change_coin', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'coin_type': val}).then(res => {
      if (res.error === 0) {
        _this.$suToast.center('', res.msg, 1000)
        window.localStorage.setItem('bhwCoinType', val)
        window.localStorage.setItem('bhwCoinIcon', coin)
        setTimeout(() => {
          _this.$route.router.go({name: 'home'})
        }, 200)
      } else {
        _this.$suToast.center('', res.msg, 1000)
      }
    })
  }).catch(err => {
    console.log(err.status)
    window.localStorage.setItem('bhwCoinType', val)
    window.localStorage.setItem('bhwCoinIcon', coin)
    setTimeout(() => {
      _this.$route.router.go({name: 'home'})
    }, 200)
  })
}
export const isHasCoinType = ({dispatch}) => {
  let type = window.localStorage.getItem('bhwCoinType')
  if (type === undefined || type === null || type === '') {
    _this.$route.router.go({name: 'login'})
  }
}
/* ----- 初始化首页 ----- */
export const initHome = ({dispatch}) => {
  isHasCoinType({dispatch})
  let icon = window.localStorage.getItem('bhwCoinIcon')
  setHeader({dispatch}, {'title': '币好玩', 'img': icon, 'linkRight': '/login'})
  http('index/home', 'GET', '').then(res => {
    dispatch('SET_HOME', res)
  })
}
/* ----- 初始化投资页面 ----- */
export const initGain = ({dispatch}) => {
  isHasCoinType({dispatch})
  setHeader({dispatch}, {'title': '币好玩', 'iconRight': 'icon-pen', 'linkRight': '/gain/log'})
  let type = window.localStorage.getItem('bhwCoinType')
  http('invest/index', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'coin_type': type}).then(res => {
    dispatch('SET_GAIN', res)
  })
}
/* ----- 初始化投资记录 ----- */
export const initGainRecord = ({dispatch}) => {
  setHeader({dispatch}, {'title': '收益记录', 'linkLeft': '/gain'})
  http('invest/profit_log', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_LOG', 'profit', res)
  })
}
export const initGainLog = ({dispatch}) => {
  setHeader({dispatch}, {'title': '投资记录', 'linkLeft': '/gain'})
  http('invest/invest_log', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_LOG', 'join', res)
  })
}
/* ----- 滚动加载投资记录 ----- */
export const updateGainRecord = ({dispatch}) => {
  let page = window.localStorage.getItem('LOAD_PAGE-1')
  http('invest/profit_log', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'page': page}).then(res => {
    if (res && res.length > 0) {
      dispatch('PUSH_LOG', 'profit', res)
    } else {
      _this.$suToast.center('', '没有更多数据', 1000)
    }
  })
}
export const updateGainLog = ({dispatch}) => {
  let page = window.localStorage.getItem('LOAD_PAGE-1')
  http('invest/invest_log', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'page': page}).then(res => {
    if (res && res.length > 0) {
      dispatch('PUSH_LOG', 'join', res)
    } else {
      _this.$suToast.center('', '没有更多数据', 1000)
    }
  })
}
export const initGainInvestor = ({dispatch}) => {
  setHeader({dispatch}, {'title': '投资者', 'linkLeft': '/gain'})
  http('invest/investors', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_LOG', 'user', res)
  })
}
/* ----- 参与投资 ----- */
export const postJoinGain = ({dispatch}, coin) => {
  if (coin === '' || coin === undefined) { coin = 0 }
  let type = window.localStorage.getItem('bhwCoinType')
  http('invest/invest', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'coin': coin}).then(res => {
    if (res.error === 0) {
      _this.$suToast.center('', res.msg, 1000)
      http('invest/index', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'coin_type': type}).then(res => {
        dispatch('SET_GAIN', res)
      })
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
  })
}
export const getAddGain = ({dispatch}) => {
  http('invest/add_invest', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_GAIN', res)
  })
}
export const backAddGain = ({dispatch}, coin) => {
  if (coin === '' || coin === undefined) { coin = 0 }
  return http('invest/recall', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'coin': coin}).then(res => {
    if (res.error === 0) {
      _this.$suToast.center('', res.msg, 1000)
      dispatch('SET_GAIN_ITEM', coin)
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
    return res
  })
}
/* ----- 初始化个人中心 ----- */
export const initUser = ({dispatch}) => {
  setHeader({dispatch}, {'title': '我', 'iconRight': 'icon-cog', 'linkRight': '/user/cog'})
  http('user/index', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_USER', res)
  })
}
export const initUserCharge = ({dispatch}) => {
  setHeader({dispatch}, {'title': '充币', 'linkLeft': '/user', 'iconRight': 'icon-pen', 'linkRight': '/user/log'})
  http('user/charge', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_USER', res)
  })
}
export const initUserConfig = ({dispatch}) => {
  setHeader({dispatch}, {'title': '修改资料', 'linkLeft': '/user'})
  http('user/index', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_USER', res)
  })
}
export const initUserCash = ({dispatch}) => {
  setHeader({dispatch}, {'title': '提币', 'linkLeft': '/user', 'iconRight': 'icon-pen', 'linkRight': '/user/log'})
  http('user/index', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_USER', res)
  })
}
export const postUserCash = ({dispatch}, num, adr) => {
  if (num === '' || num === undefined) { num = 0 }
  return http('user/cash', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'value': num, 'address': adr}).then(res => {
    if (res && res.error === 0) {
      _this.$suToast.center('', res.msg, 1000)
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
    return res
  })
}
export const initUserLog = ({dispatch}) => {
  setHeader({dispatch}, {'title': '充值记录', 'linkLeft': '/gain'})
  http('user/charge_log', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
    dispatch('SET_LOG', 'charge', res)
  })
}
export const updateUserLog = ({dispatch}) => {
  let page = window.localStorage.getItem('LOAD_PAGE-1')
  http('user/charge_log', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'page': page}).then(res => {
    if (res && res.length > 0) {
      dispatch('PUSH_LOG', 'charge', res)
    } else {
      _this.$suToast.center('', '没有更多数据', 1000)
    }
  })
}
export const initUserCog = ({dispatch}) => {
  setHeader({dispatch}, {'title': '设置', 'linkLeft': '/user'})
}
/* ----- 推广中心 -----*/
export const initUserSpread = ({dispatch}) => {
  setHeader({dispatch}, {'title': '推广中心', 'linkLeft': '/user', 'textRight': '推广说明', 'linkRight': '/user/spread/info'})
  http('user/downline', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
      dispatch('SET_DOWNLINE', res)
  })
}

export const initUserSpreadInfo = ({dispatch}) => {
  setHeader({dispatch}, {'title': '推广说明', 'linkLeft': '/user/spread'})

}

export const initUserSpreadLevel = ({dispatch}) => {
    setHeader({dispatch}, {'title': '快速升级', 'linkLeft': '/user/spread'})
}

//快速升级接口
export const postVipLevelUp = ({dispatch}, vip_rice) => {
    http('user/vipLevel_upAction', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'vip_rice': vip_rice}).then(res => {
        if (res.error === 0) {
          _this.$suToast.center('', res.msg, 1000)
          http('user/index', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
            dispatch('SET_USER', res)
          })
        } else {
          _this.$suToast.center('', res.msg, 1000)
        }
    })
}

export const initUserSpreadReward = ({dispatch}) => {
  setHeader({dispatch}, {'title': '推广奖励', 'linkLeft': '/user/spread'})
  http('user/downline_rebate', 'GET', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}).then(res => {
      dispatch('SET_DOWNLINELOG', res)
  })
}

export const initUserSpreadPerson = ({dispatch}) => {
  setHeader({dispatch}, {'title': '推广人数', 'linkLeft': '/user/spread'})
}

/* ----- 登陆接口 ----- */
export const postSignIn = ({dispatch}, name, pwd) => {
  let type = window.localStorage.getItem('bhwCoinType')
  http('user/login', 'POST', {'username': name, 'password': pwd, 'scode': _scode, 'coin_type': type}).then(res => {
    if (res.error === 0 && res.sid !== '') {
      _this.$suToast.center('c', res.msg, 1000)
      setCookie({dispatch}, 'bhw_sid', res.sid, 30)
      setTimeout(() => {
        _this.$route.router.go({path: '/user'})
      }, 1000)
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
  })
}
/* ---- 从比特钱包token登录接口 ---- */
export const postTokenSignIn = ({dispatch}, coin, token) => {
    // let type = window.localStorage.getItem('bhwCoinType')
    http('user/external_token_login', 'POST', {'token': token, 'scode': _scode, 'coin_type': coin}).then(res => {
        if (res.error === 0 && res.sid !== '') {
            _this.$suToast.center('c', res.msg, 1000)
            setCookie({dispatch}, 'bhw_sid', res.sid, 30)
            setTimeout(() => {
                _this.$route.router.go({path: ''})
            }, 1000)
        } else {
            _this.$suToast.center('', res.msg, 1000)
        }
    })

}
/* ----- 注册接口 ----- */
export const postSignUp = ({dispatch}, name, pwd, repwd) => {
  let type = window.localStorage.getItem('bhwCoinType')
  http('user/register', 'POST', {'username': name, 'password': pwd, 'repassword': repwd, 'scode': _scode, 'coin_type': type}).then(res => {
    if (res.error === 0 && res.sid !== '') {
      _this.$suToast.center('c', res.msg, 1000)
      setCookie({dispatch}, 'bhw_sid', res.sid, 30)
      setTimeout(() => {
        _this.$route.router.go({name: 'user'})
      }, 1000)
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
  })
}
/* ----- 修改用户信息 ----- */
export const postChangeUser = ({dispatch}, url, name) => {
  http('user/modify_info', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'avatar': url, 'name': name}).then(res => {
    if (res.error === 0) {
      _this.$suToast.center('', res.msg, 1000)
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
  })
}
/* ----- 修改密码接口 ----- */
export const postChangePwd = ({dispatch}, old, pwd, repwd) => {
  http('user/modifypwd', 'POST', {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode, 'password': old, 'new_password': pwd, 'repeat_password': repwd}).then(res => {
    if (res.error === 0) {
      _this.$suToast.center('c', res.msg, 1000)
      setTimeout(() => {
        setCookie({dispatch}, 'bhw_sid', '', -1)
        _this.$route.router.go({name: 'signin'})
      }, 1000)
    } else {
      _this.$suToast.center('', res.msg, 1000)
    }
  })
}
/* ----- 设置头信息 ----- */
export const setHeader = ({dispatch}, op) => {
  dispatch('SET_HEADER', op)
}
/* ----- 跳转 ----- */
export const toUrl = ({dispatch}, url) => {
  isLogin({dispatch}).then(res => {
    if (res) {
      _this.$suToast.center('', 'login', 1000)
      window.location.href = 'http://' + window.location.host + url
    } else {
      _this.$suToast.center('', 'no login', 1000)
      _this.$route.router.go({name: 'signin'})
    }
  })
}
/* ----- 判断是否登录 ----- */
export const isLogin = ({dispatch}) => {
  return Vue.http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: window.Game.apiHost + 'user/index',
    method: 'GET',
    params: {'sid': getCookie({dispatch}, 'bhw_sid'), 'scode': _scode}
  }).then(checkStatus)
  .then(parseJSON)
  .then(res => {
    if (res) {
      return res
    }
  }).catch(err => {
    console.log(err.status)
    // _this.$suToast.center('', err.status, 1000)
    // _this.$suConsole.show('user/index', 'app failed', err.status)
  })
}
/* ----- 网络请求方法 ----- */
export const http = (url, method, params) => {
  return Vue.http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: window.Game.apiHost + url,
    method: method,
    params: params
  }).then(checkStatus)
  .then(parseJSON)
  .then(res => {
    if (res) {
      // _this.$suToast.center('', 'loading...', 1000)
      // _this.$suConsole.show(url, 'success', '200')
      return res
    }
  }).catch(err => {
    _this.$suToast.center('', err.status, 1000)
    // _this.$suConsole.show(url, 'failed', err.status)
    _this.$route.router.go({name: 'signin'})
  })
}
/* ----- 设置cookie ----- */
export const setCookie = ({dispatch}, cname, cvalue, exdays) => {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires
}
/* ----- 获取cookie ----- */
export const getCookie = ({dispatch}, cname) => {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}
/* ----- 清除cookie ----- */
export const clearCookie = (name) => {
  setCookie(name, '', -1)
}
/* ----- 生成随机字符串 ----- */
export const randomChar = ({dispatch}, l) => {
  var x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  var tmp = ''
  var timestamp = new Date().getTime()
  for (var i = 0; i < l; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return timestamp + tmp
}
/* ----- 检测网络状态 ----- */
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
/* ----- 格式化json ----- */
function parseJSON (response) {
  return response.json()
}
