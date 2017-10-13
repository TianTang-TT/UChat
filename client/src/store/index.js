import Vue from 'vue'
import Vuex from 'vuex'
import chatting from './chatting'
import contacts from './contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    avatar: ''
  },
  mutations: {
    setUserName (state, name) {
      state.userName = name
    }
  },
  actions: {
    setUserName ({ commit, name }) {
      commit('setUserName', name)
    }
  },
  modules: {
    chatting,
    contacts
  }
})
