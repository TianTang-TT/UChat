import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Badge from 'components/Badge'
import AccessUsers from 'components/AccessUsers'
import { Table, TableColumn, Button, Dialog, Message, MessageBox, Notification } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'static/css/reset.css'
import 'assets/css/iconfont.css'

Vue.config.productionTip = false

Vue.component('badge', Badge)
Vue.component('access-users', AccessUsers)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Button)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$notify = Notification

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

