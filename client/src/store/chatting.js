export default {
  namespaced: true,
  state: {
    chattings: [{
      chatName: '惊蛰'
    }, {
      chatName: '天棠'
    }],
    currentChat: ''
  },
  mutations: {
    addChatting (state, chatting) {
      state.chattings.push(chatting)
    },
    activeChat (state, chattingId) {
      state.currentChat = chattingId
    }
  },
  actions: {
    addChatting ({ commit, chatting }) {
      commit('addChatting', chatting)
    },
    activeChat ({ commit }, name) {
      commit('activeChat', name)
    }
  }
}
