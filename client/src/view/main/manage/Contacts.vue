<template>
  <!--联系人列表-->
  <div class="contacts">
    <div class="mem-item">
      <img class="portrait" src="~assets/img/1.jpg">
      <div class="desc">
        <p class="name">昵称</p>
        <p class="speak">过去的信息</p>
      </div>
    </div>
    <div class="mem-item active">
      <img class="portrait" src="~assets/img/1.jpg">
      <div class="desc">
        <p class="name">昵称</p>
        <p class="speak">过去的信息</p>
      </div>
    </div>
    <div class="mem-item">
      <img class="portrait" src="~assets/img/1.jpg">
      <div class="desc">
        <p class="name">昵称</p>
        <p class="speak">过去的信息</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'contacts'
  }
</script>
<style lang="less">
  .mem-item {
    height: 40px;
    padding: 12.5px;
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    .portrait {
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    .desc {
      margin-left: 50px;
    }
    &.active {
      background-color: #3a3f45;
    }
  }
</style>
