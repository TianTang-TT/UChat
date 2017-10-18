<template>
  <!--当前聊天-->
  <div class="chatting">
    <contact
      contact-type="chatting"
      v-for="chatting in chattings"
      key
      :isActive="chatting.id === currentChat"
      @click.native="chooseChatting(chatting)"
      :contact-msg="chatting">
    </contact>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'chatting',
    computed: {
      ...mapState('chatting', ['chattings', 'currentChat'])
    },
    methods: {
      ...mapActions('chatting', ['activeChat']),
      chooseChatting (chatting) {
        this.$router.push({name: 'chatting', params: {chattingId: chatting.id}})
        this.activeChat(chatting.id)
      }
    }
  }
</script>
