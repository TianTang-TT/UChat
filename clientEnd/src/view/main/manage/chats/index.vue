<template>
  <!--当前聊天-->
  <div class="chatting">
    <div class="mem-item contact"
         :class="[chatting.id === currentChat ? 'active' : '']"
         v-for="chatting in chattings"
         @click="chooseChatting(chatting)"
         key>
      <img class="portrait" src="http://localhost:3000/static/images/avatars/v.jpg">
      <div class="desc chatting">
        <p class="name">{{ chatting.name }}</p>
        <p class="speak" v-html="chatting.dialogs[0].content || ''"></p>
      </div>
    </div>
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
<style lang="less" scoped="">
  .mem-item {
    height: 40px;
    padding: 12.5px;
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    display: flex;
    .portrait {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    .desc {
      flex: 1;
      width: 1%;
      margin-left: 10px;
      height: 100%;
      &.chatting {
        .name {
          margin-top: 2px;
        }
        .speak {
          margin-top: 8px;
          opacity: .5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          [type=emoji] {
            width: 17px;
            height: 17px;
          }
        }
      }
    }
    &.active {
      background-color: #3a3f45;
    }
  }
</style>
