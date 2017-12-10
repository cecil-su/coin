export default (router) => {
  router.map({
    '/home': {
      name: 'home',
      component: require('./views/home/index')
    },
    '/gain': {
      name: 'gain',
      component: require('./views/gain/index')
    },
    '/gain/record': {
      name: 'gain-record',
      component: require('./views/gain/record')
    },
    '/gain/log': {
      name: 'gain-log',
      component: require('./views/gain/log')
    },
    '/gain/investor': {
      name: 'gain-investor',
      component: require('./views/gain/investor')
    },
    '/user': {
      name: 'user',
      component: require('./views/user/index')
    },
    '/user/charge': {
      name: 'user-charge',
      component: require('./views/user/charge')
    },
    '/user/cash': {
      name: 'user-cash',
      component: require('./views/user/cash')
    },
    '/user/config': {
      name: 'user-config',
      component: require('./views/user/config')
    },
    '/user/password': {
      name: 'password',
      component: require('./views/user/password')
    },
    '/user/about': {
      name: 'user-about',
      component: require('./views/user/about')
    },
    '/user/cog': {
      name: 'user-cog',
      component: require('./views/user/cog')
    },
    '/user/log': {
      name: 'user-log',
      component: require('./views/user/log')
    },
    '/user/spread': {
      name: 'user-spread',
      component: require('./views/user/spread.vue')
    },
    '/user/spread/info': {
      name: 'user-spread-info',
      component: require('./views/user/spread-info.vue')
    },
    '/user/spread/level': {
      name: 'user-spread-level',
      component: require('./views/user/spread-level.vue')
    },
    '/user/spread/reward': {
      name: 'user-spread-reward',
      component: require('./views/user/spread-reward.vue')
    },
    '/user/spread/person': {
      name: 'user-spread-person',
      component: require('./views/user/spread-person.vue')
    },
    '/login': {
      name: 'login',
      component: require('./views/login/login')
    },
    '/login/signin': {
      name: 'signin',
      component: require('./views/login/signin')
    },
    '/login/signup': {
      name: 'signup',
      component: require('./views/login/signup')
    },
    '/login/session': {
      name: 'session',
      component: require('./views/login/session')
    }
  })

  router.redirect({
    '*': '/home'
  })

  router.beforeEach((transition) => {
    if (transition.to.path.indexOf('login') !== -1) {
      router.app.show = false
      router.app.navbar.show = false
    } else {
      router.app.show = true
      router.app.navbar.show = true
    }
    transition.to.router.app.$suLoading.start()
    transition.next()
  })

  router.afterEach((transition) => {
    transition.to.router.app.$suLoading.finish()
  })
}

