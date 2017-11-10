import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
})

// 路由切换之前做校验
router.beforeEach((to, from, next) => {
  // let token = sessionStorage.getItem('u_token')
  let token = window.token
  if (!token) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
