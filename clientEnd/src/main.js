import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Message, MessageBox, Notification } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'static/css/reset.css'
import 'assets/css/iconfont.css'

Vue.config.productionTip = false
Vue.use(Message)
Vue.use(MessageBox)
Vue.use(Notification)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

