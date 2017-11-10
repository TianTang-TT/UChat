<template>
  <div class="chats">
    <chat v-for="chatting in chattings" v-if="chatting.id === currentChat" :chatInfo="chatting" key></chat>
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
      ...mapState('chatting', ['currentChat', 'chattings'])
    }
  }
</script>
<style lang="less">
  .chats {
    height: 100%;
  }
</style>
