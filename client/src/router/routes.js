import Login from 'view/login'
import Main from 'view/main'

import Chatting from 'view/main/manage/Chatting'
const Contacts = () => import('view/main/manage/Contacts')
const Foo = () => import('view/main/manage/Foo')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Main,
    redirect: '/chatting',
    children: [
      {
        path: 'chatting',
        component: Chatting
      },
      {
        path: 'contacts',
        component: Contacts
      },
      {
        path: 'foo',
        component: Foo
      }
    ]
  }
]

export default routes
