<template>
  <section class="dialogs-container">
    <!--聊天名称-->
    <div class="title">
      <span class="chatting-name">{{ chatInfo.name }}</span>
      <div class="toolbar">
        <span class="tool add"></span>
        <span class="tool minus"></span>
      </div>
    </div>
    <!--已发送对话-->
    <div class="dialogs" ref="dialogs">
      <message v-for="dialog in chatInfo.dialogs" key :messageContent="dialog"></message>
    </div>
  </section>
</template>
<script>
  import Message from './Message'
  export default {
    name: 'dialogs',
    components: {
      Message
    },
    props: {
      chatInfo: {
        type: Object,
        required: true
      }
    },
    watch: {
      'chatInfo.dialogs.length' () {
        this.$nextTick(() => {
          this.$refs['dialogs'].scrollTop = this.$refs['dialogs'].scrollHeight
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .dialogs-container {
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
      position: relative;
      .toolbar {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: 0;
        .tool {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 15px 10px;
          position: relative;
          .minus () {
            &::before {
              background-color: darkgrey;
              display: inline-block;
              content: '';
              width: 100%;
              height: 4px;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%)
            }
          }
          &.minus {
            .minus();
          }
          &.add {
            .minus();
            &::after {
              background-color: darkgrey;
              display: inline-block;
              content: '';
              width: 4px;
              height: 100%;
              position: absolute;
              left: 50%;
              top: 0;
              transform: translateX(-50%)
            }
          }

        }
      }
    }
    .dialogs {
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px 0 20px;
      overflow-y: scroll;
    }
  }
</style>
