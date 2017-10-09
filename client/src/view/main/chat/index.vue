<template>
  <section class="chat">
    <!--对话部分-->
    <message></message>

    <!--内容输入区-->
    <contentedit></contentedit>
  </section>
</template>
<script>
  import Message from './message'
  import Contentedit from './contentedit'
  export default {
    name: 'chat',
    components: {
      Message,
      Contentedit
    }
  }
</script>
<style lang="less">
  .chat {
    flex: 1;
    height: 100%;
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;
  }
</style>
