import Vue from 'vue'
import App from './App'
import router from './router'
import 'static/css/reset.css'
import 'assets/css/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

