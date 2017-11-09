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
      ...mapState(['userInfo', 'socket'])
    },
    methods: {
      ...mapActions('contacts', ['addContact', 'removeContact'])
    },
    mounted () {
      this.socket.on('online', contact => {
        this.addContact(contact)
      })
      this.socket.on('offline', id => {
        this.removeContact(id)
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
              type: 'info'
            }).then(() => {
              this.$message.success('已同意该请求')
              this.socket.emit('agreeChat', this.userInfo.id, res => {
                if (res.code === 0) {
                  this.$.message.error(res.message)
                }
              })
            }).catch(() => {
              this.$message.error('已拒绝该请求')
              this.socket.emit('denyChat', this.userInfo.id)
            })
          }
        })
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
