<template>
  <section class="chat" v-if="chatInfo.id === currentChat">
    <!--对话部分-->
    <dialogs :chatInfo="chatInfo"></dialogs>

    <!--内容输入区-->
    <contentedit :chatInfo="chatInfo"></contentedit>
  </section>
</template>
<script>
  import { mapState } from 'vuex'
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
    },
    computed: {
      ...mapState('chatting', ['currentChat'])
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
