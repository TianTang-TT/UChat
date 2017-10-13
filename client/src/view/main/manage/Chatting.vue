<template>
  <!--当前聊天-->
  <div class="chatting">
    <contact
      contact-type="chatting"
      v-for="chatting in chattings"
      key
      :isActive="chatting.chatName === currentChat"
      @click.native="chooseChatting(chatting)"
      :contact-msg="chatting">
    </contact>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import Avatar from 'assets/img/1.jpg'
  export default {
    name: 'chatting',
    data () {
      return {
        chattings: [
          {name: '惊蛰', chatName: '惊蛰', avatar: Avatar, text: '测试文字d'},
          {name: '天棠', chatName: '天棠', avatar: Avatar, text: '说过一句话'}
        ]
      }
    },
    computed: {
      ...mapState('chatting', ['currentChat'])
    },
    methods: {
      ...mapActions('chatting', ['activeChat']),
      chooseChatting (chatting) {
        this.$router.push({name: 'chatting', params: {userName: chatting.name}})
        this.activeChat(chatting.name)
      }
    }
  }
</script>
