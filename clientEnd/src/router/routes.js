import Login from 'view/login'
import Main from 'view/main'
// import store from 'store'

import Chats from 'view/main/manage/chats'
const Contacts = () => import('view/main/manage/contacts')
const Foo = () => import('view/main/manage/Foo')

const Chat = () => import('view/main/content/chat')
const Contact = () => import('view/main/content/contact')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Main,
    redirect: '/chats',
    children: [
      {
        path: 'chats',
        components: {
          manage: Chats
        }
      },
      {
        path: 'chats/:chatId',
        name: 'chat',
        components: {
          manage: Chats,
          content: Chat
        },
        props: {
          manage: false,
          content: true
        }
      },
      {
        path: 'contacts',
        components: {
          manage: Contacts
        }
      },
      {
        path: 'contacts/:contactId',
        name: 'contacts',
        components: {
          manage: Contacts,
          content: Contact
        },
        props: {
          manage: false,
          content: true
        }
      },
      {
        path: 'foo',
        components: {
          manage: Foo
        }
      }
    ]
  }
]

export default routes
