<template>
  <div class="mem-item contact">
    <img class="portrait" :src="contactMsg.avatar">
    <div :class="['desc', contactType]">
      <template v-if="contactType === 'chatting'">
        <p class="name">{{ contactMsg.name }}</p>
        <p class="speak">{{ contactMsg.text }}</p>
      </template>
      <template v-if="contactType === 'contact'">
        <p class="name">{{ contactMsg.name }}</p>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'contact',
    props: {
      contactType: {
        type: String,
        default: 'contact'
      },
      contactMsg: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="less">
  .mem-item {
    height: 40px;
    padding: 12.5px;
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    display: flex;
    .portrait {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    .desc {
      flex: 1;
      margin-left: 10px;
      height: 100%;
      &.contact {
        .name {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          font-size: 16px;
        }
      }
      &.chatting {
        .name {
          margin-top: 2px;
        }
        .speak {
          margin-top: 8px;
          opacity: .5;
        }
      }
    }
    &.active {
       background-color: #3a3f45;
     }
  }
</style>
