import Login from 'view/login'
import Main from 'view/main'
// import store from 'store'

import Chatting from 'view/main/manage/chats'
const Contacts = () => import('view/main/manage/contacts')
const Foo = () => import('view/main/manage/Foo')

const Chats = () => import('view/main/content/chats')
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
    redirect: '/chatting',
    children: [
      {
        path: 'chatting',
        components: {
          manage: Chatting
        }
      },
      {
        path: 'chatting/:chattingId',
        name: 'chatting',
        components: {
          manage: Chatting,
          content: Chats
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
