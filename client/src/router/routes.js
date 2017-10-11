import Login from 'view/login'
import Main from 'view/main'

import Chatting from 'view/main/manage/Chatting'
const Contacts = () => import('view/main/manage/Contacts')
const Foo = () => import('view/main/manage/Foo')

const Chat = () => import('view/main/content/chat')
const Contact = () => import('view/main/content/contact')

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
        components: {
          manage: Chatting,
          content: Chat
        }
      },
      {
        path: 'contacts',
        components: {
          manage: Contacts,
          content: Contact
        }
      },
      {
        path: 'foo',
        component: Foo
      }
    ]
  }
]

export default routes
