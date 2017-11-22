<template>
  <!--当前聊天-->
  <div class="chat">
    <div class="chat-item-wrap"
         key
         v-for="chat in chats"
         @click="chooseChat(chat)"
         :class="[chat.id === currentChat ? 'active' : '']">
      <badge ></badge>
      <div class="chat-item contact">
        <badge :value="12"></badge>
        <img class="portrait" :src="defaultAvatar">
        <div class="desc chat">
          <p class="name">{{ chat.name }}</p>
          <p class="speak" v-html="lastWord(chat)"></p>
        </div>
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
    .chat-item-wrap {
      position: relative;
      margin: 12.5px;
      &.active .chat-item {
        background-color: #3a3f45;
      }
      .chat-item {
        padding: 12.5px;
        margin: -12.5px;
        height: 40px;
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
      }
    }
  }
</style>
