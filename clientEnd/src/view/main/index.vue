<template>
  <div id="main">
    <manage></manage>
    <content-detail></content-detail>
  </div>
</template>
<script>
  import Manage from './manage'
  import Content from './content'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'main',
    components: {
      Manage,
      'content-detail': Content
    },
    computed: {
      ...mapState(['worldChannelId', 'userInfo', 'socket']),
      ...mapState('chats', ['chats'])
    },
    methods: {
      ...mapActions('contacts', ['addContact', 'removeContact']),
      ...mapActions('chats', ['addChat', 'activeChat', 'addDialog', 'addParticipant', 'removeParticipant', 'cleanChats'])
    },
    mounted () {
      this.socket.on('online', contact => {
        this.addContact(contact)
        this.addDialog({
          chatId: this.worldChannelId,
          dialog: {
            id: Date.now(),
            type: 'system',
            speaker: '',
            content: `${contact.name}加入了群聊`
          }
        })
      })
      this.socket.on('offline', user => {
        // 并且从各个群聊中删除
        this.cleanChats(user)
      })
      this.socket.on('logout', () => {
        this.$message.warning('登录失效')
      })
      this.socket.on('requestChat', requester => {
        let notify = this.$notify({
          title: '系统消息',
          message: '有人想与你聊天',
          duration: 0,
          onClick: () => {
            notify.close()
            this.$msgbox.confirm(`${requester.name}想与您进行聊天`, '会话请求', {
              confirmButtonText: '同意',
              cancelButtonText: '拒绝',
              cancelButtonClass: 'error',
              type: 'info'
            }).then(() => {
              this.$message.success('已同意该请求')
              this.socket.emit('agreeChat', requester.id, res => {
                if (res.code === 0) {
                  return this.$message.error(res.message)
                }
                this.$router.push({name: 'chat', params: {chatId: res.data}})
                this.activeChat(res.data)
              })
            }).catch(() => {
              this.$message.error('已拒绝该请求')
              this.socket.emit('denyChat', requester.id)
            })
          }
        })
      })
      // 聊天请求被拒绝
      this.socket.on('denyChat', res => {
        if (res.code !== 0) {
          this.$message.error(res)
          return
        }
        this.$notify({
          title: '系统消息',
          message: res.message,
          type: 'error'
        })
      })
      // 聊天请求同意，准备进行会话
      this.socket.on('startChat', chatInfo => {
        this.addChat(chatInfo)
      })
      // 有人退出群聊
      this.socket.on('quitChat', (chatId, userInfo) => {
        // 没有此chat，说明是自己发起的quit
        if (!this.chats[chatId]) {
          return
        }

        // 在群里发消息
        this.addDialog({
          chatId: chatId,
          dialog: {
            id: Date.now(),
            type: 'system',
            content: `${userInfo.name}退出了聊天`
          }
        })
        // 然后从聊天列表中删除此人
        this.removeParticipant(chatId, userInfo.id)
      })
      this.socket.on('usersJoinChat', (chatId, usersInfo) => {
        // 将成员加入群聊名单，自动发送通知消息
        this.addParticipant(chatId, usersInfo)
      })
      this.socket.on('message', dialog => {
        this.addDialog(dialog)
      })
    }
  }
</script>
<style lang="less">
  #main {
    height: 100%;
    display: flex;
  }
</style>
