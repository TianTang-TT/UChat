<template>
  <section class="dialogs-container">
    <!--对方名称-->
    <div class="title" @click="addDialog">
      UChat～(与{{ chatInfo.chatName }}的聊天)
    </div>
    <!--已发送对话-->
    <div class="dialogs" ref="dialogs">
      <message v-for="dialog in dialogs" key :messageContent="dialog"></message>
    </div>
  </section>
</template>
<script>
  import Message from './Message'
  export default {
    name: 'dialogs',
    components: {
      Message
    },
    props: {
      chatInfo: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        dialogs: [
          {type: 'system', content: '开始聊天'},
          {type: 'self', speaker: '惊蛰', content: 'this is content'},
          {speaker: '天棠', content: 'this is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is content'},
          {speaker: '天棠', content: 'this is content'},
          {speaker: '天棠', content: 'this is content'},
          {type: 'system', content: 'this is a message from system'},
          {type: 'self', speaker: '惊蛰', content: 'this is content this is content this is content this is content this is content this is content this is content this is content this is content this is content this is content this is content '},
          {type: 'self', speaker: '惊蛰', content: 'this is content'},
          {speaker: '天棠', content: 'this is content'}
        ]
      }
    },
    methods: {
      addDialog () {
        this.dialogs.push({
          type: Date.now(),
          content: '测试对话'
        })
        this.$nextTick(() => {
          this.$refs['dialogs'].scrollTop = this.$refs['dialogs'].scrollHeight
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .dialogs-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-bottom: 1px solid #d6d6d6;
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      text-align: center;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #d6d6d6;
    }
    .dialogs {
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px 0 20px;
      overflow-y: scroll;
    }
  }
</style>
