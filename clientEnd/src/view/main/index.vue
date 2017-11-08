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
      ...mapState(['userInfo', 'socket']),
      ...mapActions('contacts', ['addContact', 'removeContact'])
    },
    mounted () {
      this.socket.on('online', contact => {
        this.addContact(contact)
      })
      this.socket.on('offline', contact => {
        this.removeContact(contact.id)
      })
      this.socket.on('logout', () => {
        this.$message.warning('登录失效')
      })
      this.socket.on('requestChat', requester => {
        this.$notify({
          title: '系统消息',
          message: '有人想与你聊天',
          duration: 0,
          onClick: () => {
            this.$msgbox.confirm({
              confirmButtonText: '同意',
              cancelButtonText: '拒绝',
              type: 'info'
            }).then(() => {
              this.$message.success('已同意该请求')
            }).catch(() => {
              this.$message.error('已拒绝该请求')
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
