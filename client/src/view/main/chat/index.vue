<template>
  <section class="chat">
    <!--对话部分-->
    <dialogs></dialogs>

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
    }
  }
</script>
<style lang="less">
  .chat {
    margin-left: 300px;
    background-color: #eeeeee;
    position: relative;
  }
</style>
