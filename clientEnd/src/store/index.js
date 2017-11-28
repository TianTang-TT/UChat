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
      name: '未命名',
      avatar: 'http://localhost:3000/static/images/avatars/v.jpg'
    },
    socket: null
  },
  mutations: {
    INIT_USER_INFO (state, userInfo) {
      state.userInfo = Object.assign({}, userInfo)
    },
    SET_USER_NAME (state, name) {
      state.userInfo.userName = name
    },
    SET_USER_AVATAR (state, avatar) {
      state.userInfo.avatar = avatar
    },
    INIT_SOCKET (state, socket) {
      state.socket = socket
    }
  },
  actions: {
    initUserInfo ({ commit }, userInfo) {
      commit('INIT_USER_INFO', userInfo)
    },
    setUserName ({ commit }, name) {
      commit('SET_USER_NAME', name)
    },
    setUserAvatar ({ commit }, avatar) {
      commit('SET_USER_AVATAR', avatar)
    },
    initSocket ({ commit }, socket) {
      commit('INIT_SOCKET', socket)
    }
  },
  modules: {
    chats,
    contacts
  }
})
