<template>
  <section class="contact-detail">
    <div class="avatar-container">
      <img :src="contactInfo.avatar" class="avatar-detail">
    </div>
    <div class="contact-msg">
      <p class="msg-item">
        <span class="label">微信号</span>
        <span class="value">{{ contactInfo.id }} </span>
      </p>
      <p class="msg-item">
        <span class="label">昵称</span>
        <span class="value">{{ contactInfo.name }} </span>
      </p>
      <button class="contcat-detail_request">发起聊天</button>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'contact-detail',
    props: {
      contactId: {
        type: String
      }
    },
    computed: {
      ...mapGetters('contacts', ['contactInfo'])
    }
  }
</script>
<style lang="less" scoped="">
  .contact-detail {
    padding: 100px;
    .avatar-container {
      border-bottom: 1px solid darkgrey;
      text-align: center;
      padding-bottom: 50px;
      .avatar-detail {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }
    .contact-msg {
      margin-top: 20px;
      .msg-item {
        display: flex;
        margin: 5px;
        line-height: 1.2;
        .label {
          color: dimgray;
          width: 50px;
          height: 24px;
          overflow: hidden;
          text-align: justify;
          &:after {
            content: '';
            width: 100%;
            display: inline-block;
            position: relative;
          }
        }
        .value {
          flex: 1;
          margin-left: 50px;
          white-space: nowrap;
          textoverflow: ellipsis;
          overflow: hidden;
        }
      }
      .contcat-detail_request {
        width: 260px;
        margin: 20px 100px;
        height: 40px;
        line-height: 40px;
        border: none;
        outline: none;
        border-radius: 5px;
        color: #fff;
        background-color: #3dce3d;
      }
    }
  }
</style>
