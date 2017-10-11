<template>
  <div class="content">
    <router-view name="content"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'content'
  }
</script>
<style scoped>
  .content {
    flex: 1;
    height: 100%;
    background-color: #eeeeee;
  }
</style>
