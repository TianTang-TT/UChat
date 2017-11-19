<template>
  <div class="chats">
    <chat v-for="chat in chats" v-if="chat.id === currentChat" :chatInfo="chat" key></chat>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Chat from './Chat'
  export default {
    name: 'chats',
    components: {
      Chat
    },
    computed: {
      ...mapState('chats', ['currentChat', 'chats'])
    }
  }
</script>
<style lang="less">
  .chats {
    height: 100%;
  }
</style>
