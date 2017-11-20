const wordChannelId = '999999999'
export default {
  namespaced: true,
  // type 1为单聊，2为群聊
  state: {
    total: 1,
    currentChat: wordChannelId,
    defaultAvatar: 'http://localhost:3000/static/images/avatars/v.jpg',
    chats: {
      [wordChannelId]: {
        id: wordChannelId,
        name: '世界频道',
        type: '2',
        numbers: 0,
        participants: [],
        dialogs: []
      }
      /*
      ,
      'c_1': {
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
      },
      'c_2': {
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
      }
      */
    }

  },
  mutations: {
    initWorldChannel (state, participants) {
      state.chats[wordChannelId].participants = participants
      state.chats[wordChannelId].dialogs.push({
        avatar: '',
        type: 'system',
        content: '开始聊天',
        speakerId: ''
      })
    },
    addChat (state, chat) {
      state.chats = Object.assign({}, state.chats, {[chat.id]: chat})
    },
    activeChat (state, chatId) {
      state.currentChat = chatId
    },
    addDialog (state, msg) {
      state.chats[msg.chatId]
        .dialogs.push(msg.dialog)
    }
  },
  actions: {
    initWorldChannel ({ commit }, participants) {
      commit('initWorldChannel', participants)
    },
    addChat ({ commit }, chat) {
      commit('addChat', chat)
    },
    activeChat ({ commit }, chatId) {
      commit('activeChat', chatId)
    },
    addDialog ({ commit }, dialog) {
      commit('addDialog', dialog)
    },
    cleanChats ({ commit, state }, userInfo) {
      // 从各个聊天中删除联系人信息
      // 由于contacts和世界频道的participants世纪指向的是同一个数组，所以只需要处理其中一个就可以。
      // 这里选择在清理聊天信息时顺便清理世界平岛的participants信息
      for (let chat of Object.values(state.chats)) {
        let index = chat.participants.findIndex(user => user.id === userInfo.id)
        if (index < 0) return
        chat.participants.splice(index, 1)
        // 退出之后在群聊中发送一条系统消息
        commit('addDialog', {
          chatId: chat.id,
          dialog: {
            id: Date.now(),
            type: 'system',
            speakerId: '',
            speaker: '',
            content: `${userInfo.name}退出了聊天`
          }
        })
      }
    }
  }
}
