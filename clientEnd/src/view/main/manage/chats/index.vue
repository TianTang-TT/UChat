<template>
  <!--当前聊天-->
  <div class="chat">
    <badge ></badge>
    <div class="mem-item contact"
         :class="[chat.id === currentChat ? 'active' : '']"
         v-for="chat in chats"
         @click="chooseChat(chat)"
         key>
      <badge :value="12"></badge>
      <img class="portrait" :src="defaultAvatar">
      <div class="desc chat">
        <p class="name">{{ chat.name }}</p>
        <p class="speak" v-html="lastWord(chat)"></p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'chat',
    computed: {
      ...mapState('chats', ['total', 'defaultAvatar', 'chats', 'currentChat'])
    },
    methods: {
      ...mapActions('chats', ['activeChat']),
      lastWord (chatInfo) {
        let dialogLen = chatInfo.dialogs.length
        return dialogLen === 0 ? '' : chatInfo.dialogs[dialogLen - 1].content
      },
      chooseChat (chat) {
        this.$router.push({name: 'chat', params: {chatId: chat.id}})
        this.activeChat(chat.id)
      }
    }
  }
</script>
<style lang="less" scoped="">
  .chat {
    margin: 0 12.5px;
    position: relative;
  }
  .mem-item {
    height: 40px;
    padding: 12.5px;
    margin: 0 -12.5px;
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
      &.chat {
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
