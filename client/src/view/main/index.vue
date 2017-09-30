<template>
  <div id="main">
    <manage></manage>
    <chat></chat>
  </div>
</template>
<script>
  import Manage from './manage'
  import Chat from './chat'

  export default {
    name: 'main',
    components: {
      Manage,
      Chat
    }
  }
</script>
<style lang="less">
  #main {
    position: relative;
    height: 100%;
  }
</style>
