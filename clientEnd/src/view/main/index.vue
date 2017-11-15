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
      ...mapState(['worldChannelId', 'userInfo', 'socket'])
    },
    methods: {
      ...mapActions('contacts', ['addContact', 'removeContact']),
      ...mapActions('chatting', ['addDialog', 'cleanChattings'])
    },
    mounted () {
      this.socket.on('online', contact => {
        this.addContact(contact)
        this.addDialog({
          chattingId: this.worldChannelId,
          dialog: {
            id: Date.now(),
            type: 'system',
            speaker: '',
            content: `${contact.name}加入了群聊`
          }
        })
      })
      this.socket.on('offline', user => {
        this.removeContact(user.id)
        // 并且从各个群聊中删除
        this.cleanChattings(user.id)
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
                  this.$.message.error(res.message)
                }
              })
            }).catch(() => {
              this.$message.error('已拒绝该请求')
              this.socket.emit('denyChat', requester.id)
            })
          }
        })
      })
      // 自己发的聊天请求被人拒绝
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
      this.socket.on('startChat', target => {
        // TODO
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
