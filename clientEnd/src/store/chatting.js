export default {
  namespaced: true,
  // type 1为单聊，2为群聊
  state: {
    worldChannel: null,
    chattings: [{
      id: 'c_0',
      name: '惊蛰',
      type: '1',
      numbers: 2,
      participants: [{
        id: 'u_0',
        name: '天棠',
        avatar: ''
      }, {
        id: 'u_1',
        nickName: '惊蛰',
        avatar: ''
      }],
      dialogs: [
        {avatar: '', type: 'system', content: '开始聊天', speakerId: ''},
        {avatar: '', type: 'dialog', speaker: '惊蛰', speakerId: '1111', content: 'this is content'},
        {avatar: '', type: 'dialog', speaker: '惊蛰', speakerId: '1111', content: 'this is content'},
        {avatar: '', type: 'dialog', speaker: '天棠', speakerId: '2222', content: 'this is conten1t'}
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
        {avatar: '', type: 'system', speakerId: '', content: '开始聊天'},
        {avatar: '', type: 'dialog', speakerId: '1111', speaker: '惊蛰', content: 'this is content'},
        {avatar: '', type: 'dialog', speakerId: '2222', speaker: '天棠', content: 'this is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is content'},
        {avatar: '', type: 'dialog', speakerId: '2222', speaker: '天棠', content: 'this is content'},
        {avatar: '', type: 'dialog', speakerId: '2222', speaker: '天棠', content: 'this is content'},
        {avatar: '', type: 'system', speakerId: '', content: 'this is a message from system'},
        {avatar: '', type: 'dialog', speakerId: '1111', speaker: '惊蛰', content: 'this is content'}
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
    }
  }
}
