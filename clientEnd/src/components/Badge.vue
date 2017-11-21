<template>
  <span class="uchat-badge" v-if="value > 0">{{ value > 99 ? '99+' : value }}</span>
</template>
<script>
  export default {
    name: 'badge',
    props: {
      value: {
        type: Number,
        default: 0
      }
    }
  }
</script>
<style lang="less" scoped="">
  .uchat-badge {
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    background-color: #fa5555;
    border-radius: 10px;
    color: #fff;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%)
  }
</style>
