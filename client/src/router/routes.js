import Login from 'view/login'
import Main from 'view/main'

import Chatting from 'view/main/manage/Chatting'
import Contacts from 'view/main/manage/Contacts'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'chatting',
        component: Chatting
      },
      {
        path: 'contacts',
        component: Contacts
      }
    ]
  }
]

export default routes
