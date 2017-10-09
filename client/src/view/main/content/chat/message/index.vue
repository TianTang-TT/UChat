<template>
  <section class="message">
    <!--对方名称-->
    <div class="title">
      UChat～(当前在线人数：<span class="count">0</span>人）
    </div>
    <!--已发送对话-->
    <div class="dialogs">
      <div class="speaking">
        <img src="~assets/img/1.jpg" class="speak-portrait">
        <p class="speak-user">惊蛰</p>
        <p class="speak-content">this is content</p>
      </div>
      <div class="speaking">
        <img src="~assets/img/1.jpg" class="speak-portrait">
        <p class="speak-user">惊蛰</p>
        <p class="speak-content">this is content，this is content，this is content</p>
      </div>
      <div class="speaking system">
        <span>这是一条系统消息</span>
      </div>
      <div class="speaking">
        <img src="~assets/img/1.jpg" class="speak-portrait">
        <p class="speak-user">惊蛰</p>
        <p class="speak-content">this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，</p>
      </div>
      <div class="speaking self">
        <img src="~assets/img/1.jpg" class="speak-portrait">
        <p class="speak-user">惊蛰</p>
        <p class="speak-content">this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，</p>
      </div>
      <div class="speaking self">
        <img src="~assets/img/1.jpg" class="speak-portrait">
        <p class="speak-user">惊蛰</p>
        <p class="speak-content">this is content</p>
      </div>
      <div class="speaking self">
        <img src="~assets/img/1.jpg" class="speak-portrait">
        <p class="speak-user">惊蛰</p>
        <p class="speak-content">this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，this is content，</p>
      </div>
    </div>

  </section>
</template>
<script>
  export default {
    name: 'message'
  }
</script>
<style lang="less">
  .message {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-bottom: 1px solid #d6d6d6;
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      text-align: center;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #d6d6d6;
    }
    .dialogs {
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px 0 20px;
      overflow: auto;
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
    }
  }
</style>
