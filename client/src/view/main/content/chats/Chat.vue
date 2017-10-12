<template>
  <section class="chat" v-if="chatInfo.chatName == '惊蛰'">
    <!--对话部分-->
    <dialogs :chatInfo="chatInfo"></dialogs>

    <!--内容输入区-->
    <contentedit></contentedit>
  </section>
</template>
<script>
  import Dialogs from './dialogs'
  import Contentedit from './contentedit'
  export default {
    name: 'chat',
    components: {
      Dialogs,
      Contentedit
    },
    props: {
      chatInfo: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="less">
  .chat {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
