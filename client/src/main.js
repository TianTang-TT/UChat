import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'components'  // 引入全局组件

import 'static/css/reset.css'
import 'assets/css/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

