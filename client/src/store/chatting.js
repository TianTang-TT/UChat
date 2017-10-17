export default {
  namespaced: true,
  // type 1为单聊，2为群聊
  state: {
    chattings: [{
      id: 'c_0',
      name: '惊蛰',
      type: '1',
      numbers: 2,
      participants: [{
        id: 'u_0',
        nickName: '天棠',
        avatar: ''
      }, {
        id: 'u_1',
        nickName: '惊蛰',
        avatar: ''
      }],
      dialogs: [
        {avatar: '', type: 'system', content: '开始聊天'},
        {avatar: '', type: 'dialog', speaker: '惊蛰', content: 'this is content'},
        {avatar: '', type: 'dialog', speaker: '惊蛰', content: 'this is content'},
        {avatar: '', type: 'dialog', speaker: '天棠', content: 'this is conten1t'}
      ]
    }, {
      id: 'c_1',
      name: '天棠',
      type: '1',
      numbers: 2,
      participants: [{
        id: 'u_0',
        nickName: '天棠',
        avatar: ''
      }, {
        id: 'u_1',
        nickName: '惊蛰',
        avatar: ''
      }],
      dialogs: [
        {avatar: '', type: 'system', content: '开始聊天'},
        {avatar: '', type: 'dialog', speaker: '惊蛰', content: 'this is content'},
        {avatar: '', type: 'dialog', speaker: '天棠', content: 'this is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is content'},
        {avatar: '', type: 'dialog', speaker: '天棠', content: 'this is content'},
        {avatar: '', type: 'dialog', speaker: '天棠', content: 'this is content'},
        {avatar: '', type: 'system', content: 'this is a message from system'},
        {avatar: '', type: 'dialog', speaker: '惊蛰', content: 'this is content'}
      ]
    }],
    currentChat: ''
  },
  mutations: {
    addChatting (state, chatting) {
      state.chattings.push(chatting)
    },
    activeChat (state, chattingId) {
      state.currentChat = chattingId
    },
    addDialog (state, condition) {
      state.chattings
        .find(chatting => chatting.id === condition.chattingId)
        .dialogs.push(condition.dialog)
    }
  },
  actions: {
    addChatting ({ commit, chatting }) {
      commit('addChatting', chatting)
    },
    activeChat ({ commit }, chattingId) {
      commit('activeChat', chattingId)
    },
    addDialog ({ commit }, condition) {
      commit('addDialog', condition)
      console.log(condition)
    }
  }
}
