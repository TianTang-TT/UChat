<template>
  <div :class="['speaking', messageType]">
    <span v-if="messageContent.type==='system'">
      {{ messageContent.content }}
    </span>
    <template v-else>
      <img src="~assets/img/1.jpg" class="speak-portrait">
      <p class="speak-user">{{ messageContent.speaker }}</p>
      <p class="speak-content" v-html="messageDetail"></p>
    </template>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { codeToImg } from 'util'
  export default {
    name: 'message',
    props: {
      messageContent: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState(['userInfo']),
      messageType () {
        if (this.userInfo.id && (this.messageContent.speakerId === this.userInfo.id)) {
          return 'self'
        }
        return this.messageContent.type
      },
      messageDetail () {
        return codeToImg(this.messageContent.content)
      }
    }
  }
</script>
<style lang="less" scoped>
  .speaking {
    margin: 15px 0;
    position: relative;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    &.system {
      text-align: center;
      margin: 30px 0;
      span {
        color: #fff;
        background-color: #dcdcdc;
        font-size: 13px;
        border-radius: 3px;
        padding: 5px 20px;
      }
    }
    .speak-portrait {
      width: 40px;
      height: 40px;
      float: left;
      border-radius: 2px;
    }
    .speak-user {
      color: #a9a9a9;
      margin-left: 55px;
      margin-bottom: 2px;
      font-size: 14px;
      height: 16px;
      overflow: hidden;
    }
    .speak-content {
      display: inline-block;
      margin-left: 12px;
      padding: 8px;
      max-width: 70%;
      border-radius: 3px;
      box-sizing: border-box;
      background-color: #fff;
      word-wrap: break-word;
      line-height: 20px;
      &:before {
        content: '';
        width: 0;
        height: 0;
        border: 7px solid;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        left: 38px;
        top: 25px;
      }
      img {
        max-width: 99%;
      }
    }
    &.self {
      .speak-portrait {
        float: right;
      }
      .speak-user {
        margin-right: 55px;
        text-align: right;
      }
      .speak-content {
        margin-right: 12px;
        margin-left: 0;
        float: right;
        background-color: #b2e281;
        &:before {
          border-color: transparent transparent transparent #b2e281;
          right: 38px;
          left: initial;
        }
      }
    }
  }
</style>
