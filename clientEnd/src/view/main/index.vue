<template>
  <div id="main">
    <manage></manage>
    <content-detail></content-detail>
  </div>
</template>
<script>
  import Manage from './manage'
  import Content from './content'

  export default {
    name: 'main',
    components: {
      Manage,
      'content-detail': Content
    }
  }
</script>
<style lang="less">
  #main {
    height: 100%;
    display: flex;
  }
</style>
