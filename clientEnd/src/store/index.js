import Vue from 'vue'
import Vuex from 'vuex'
import chats from './chat'
import contacts from './contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    worldChannelId: '999999999',
    userInfo: {
      id: '',
      userName: '未命名',
      avatar: 'http://localhost:3000/static/images/avatars/v.jpg'
    },
    socket: null
  },
  mutations: {
    initUserInfo (state, userInfo) {
      state.userInfo.id = userInfo.id
      state.userInfo.userName = userInfo.name
      state.userInfo.avatar = userInfo.avatar
    },
    setUserName (state, name) {
      state.userInfo.userName = name
    },
    setUserAvatar (state, avatar) {
      state.userInfo.avatar = avatar
    },
    initSocket (state, socket) {
      state.socket = socket
    }
  },
  actions: {
    initUserInfo ({ commit }, userInfo) {
      commit('initUserInfo', userInfo)
    },
    setUserName ({ commit }, name) {
      commit('setUserName', name)
    },
    setUserAvatar ({ commit }, avatar) {
      commit('setUserAvatar', avatar)
    },
    initSocket ({ commit }, socket) {
      commit('initSocket', socket)
    }
  },
  modules: {
    chats,
    contacts
  }
})
