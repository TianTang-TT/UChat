import Vue from 'vue'
import Vuex from 'vuex'
import chatting from './chatting'
import contacts from './contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '天棠',
    avatar: '',
    socket: null
  },
  mutations: {
    setUserName (state, name) {
      state.userName = name
    },
    initSocket (state, socket) {
      state.socket = socket
    }
  },
  actions: {
    setUserName ({ commit, name }) {
      commit('setUserName', name)
    },
    initSocket ({ commit }, socket) {
      commit('initSocket', socket)
    }
  },
  modules: {
    chatting,
    contacts
  }
})
