<template>
  <div class="chats">
    <chat v-for="chat in chats" :chatInfo="chat" key></chat>
  </div>
</template>
<script>
  import Chat from './Chat'
  export default {
    name: 'chats',
    components: {
      Chat
    },
    data () {
      return {
        currentChatName: '惊蛰',
        chats: [{
          chatName: '惊蛰'
        }, {
          chatName: '天棠'
        }]
      }
    }
  }
</script>
<style lang="less">
  .chats {
    height: 100%;
  }
</style>
