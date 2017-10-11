<template>
  <div class="content">
    <router-view name="content"></router-view>
  </div>
</template>
<script>
  import Chat from './chat'
  export default {
    name: 'content',
    components: {
      Chat
    }
  }
</script>
<style scoped>
  .content {
    flex: 1;
    height: 100%;
    background-color: #eeeeee;
  }
</style>
