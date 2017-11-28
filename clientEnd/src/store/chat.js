const worldChannelId = '999999999'
export default {
  namespaced: true,
  // type 0为世界频道 1为单聊，2为群聊
  state: {
    total: 1,
    unRead: 0,
    currentChat: worldChannelId,
    defaultAvatar: 'http://localhost:3000/static/images/avatars/v.jpg',
    chats: {
      [worldChannelId]: {
        id: worldChannelId,
        name: '世界频道',
        type: 0,
        numbers: 0,
        participants: [],
        dialogs: []
      }
    }
  },
  mutations: {
    INIT_WORLD_CHANNEL (state, participants) {
      state.chats[worldChannelId].participants = participants
      state.chats[worldChannelId].dialogs.push({
        avatar: '',
        type: 'system',
        content: '开始聊天',
        speakerId: ''
      })
    },
    ADD_CHAT (state, chat) {
      state.chats = Object.assign({}, state.chats, {[chat.id]: chat})
      state.total++
    },
    ACTIVE_CHAT (state, chatId) {
      // 当chat 被激活时，消除此聊天的unRead信息，并将其从总数中减去
      state.unRead -= state.chats[chatId].unRead
      state.chats[chatId].unRead = 0
      state.currentChat = chatId
    },
    ADD_DIALOG (state, msg) {
      // 收到消息之后如果不是世界频道，或者当前active的频道，则unread++
      if (msg.chatId !== state.currentChat && msg.chatId !== worldChannelId) {
        state.chats[msg.chatId].unRead++
        state.unRead++
      }
      state.chats[msg.chatId]
        .dialogs.push(msg.dialog)
    }
  },
  actions: {
    initWorldChannel ({ commit }, participants) {
      commit('INIT_WORLD_CHANNEL', participants)
    },
    addChat ({ commit }, chat) {
      // 新增加一个聊天时为其设置unRead属性，并发送一条'开始聊天'的系统消息
      chat.unRead = 0
      commit('ADD_CHAT', chat)
      commit('ADD_DIALOG', {
        chatId: chat.id,
        dialog: {
          id: Date.now(),
          type: 'system',
          content: '开始聊天'
        }
      })
    },
    activeChat ({ commit }, chatId) {
      commit('ACTIVE_CHAT', chatId)
    },
    addDialog ({ commit }, dialog) {
      commit('ADD_DIALOG', dialog)
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
        commit('ADD_DIALOG', {
          chatId: chat.id,
          dialog: {
            id: Date.now(),
            type: 'system',
            content: `${userInfo.name}退出了聊天`
          }
        })
      }
    }
  }
}
