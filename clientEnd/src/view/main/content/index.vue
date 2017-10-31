<template>
  <div class="content">
    <keep-alive>
      <router-view name="content"></router-view>
    </keep-alive>
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
    width: 1%;
    height: 100%;
    background-color: #eeeeee;
  }
</style>
