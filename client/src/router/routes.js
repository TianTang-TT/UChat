import Login from 'view/login'
import Main from 'view/main'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Main
  }
]

export default routes
