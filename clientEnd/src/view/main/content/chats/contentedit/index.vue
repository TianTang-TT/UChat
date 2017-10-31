<template>
  <section class="contentedit">
    <!--聊天工具-->
    <ul class="tools clearfix">
      <li class="tool-item emoji active" >
        <i class="iconfont icon-face" @click.stop="showEmojiTab"></i>
        <emoji v-if="emojiVisible" :hideHandler="hideEmojiTab"></emoji>
      </li>
      <li class="tool-item printscreen">
        <i class="iconfont icon-scissors"></i>
      </li>
      <li class="tool-item upload">
        <i class="iconfont icon-folder">
          <input
            type="file"
            class="uploadImg"
            @change="sendImg"
            accept=".png, .jpg, .jpeg, gif"
            ref="uploadImg">
        </i>
      </li>
    </ul>
    <!--输入框-->
    <div class="inputing">
      <p class="typeContent"
         ref="typeContent"
         contenteditable
         @keydown="contentEdit($event)">
      </p>
      <button class="btn-send" @click="sendMessage">发送(S)</button>
    </div>
  </section>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import { imgToCode, filterContent } from 'util'
  import Emoji from './Emoji'
  export default {
    name: 'contentedit',
    components: {
      Emoji
    },
    props: {
      chatInfo: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        emojiVisible: false
      }
    },
    computed: {
      ...mapState(['userName'])
    },
    methods: {
      ...mapActions('chatting', ['addDialog']),
      contentEdit (event) {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault()
          this.sendMessage()
        }
      },
      sendMessage () {
        let messages = this.$refs['typeContent'].innerHTML
        if (!(filterContent(messages).trim()).length) return
        this.addDialog({
          chattingId: this.chatInfo.id,
          dialog: {
            id: Date.now(),
            type: 'dialog',
            speaker: this.userName,
            content: imgToCode(messages)
          }
        })
        this.$refs['typeContent'].innerHTML = ''
      },
      sendImg () {
        let img = this.$refs['uploadImg'].files[0]
        if (!img) return
        if (!/(png|jpg|jpeg|gif)$/.test(img.type)) {
          alert('只能发送图片')
        }
      },
      showEmojiTab () {
        this.emojiVisible = !this.emojiVisible
      },
      hideEmojiTab (img) {
        if (img) {
          this.$refs['typeContent'].innerHTML += img
        }
        this.emojiVisible = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .contentedit {
    height: 170px;
    background-color: #fff;
    .tools {
      padding: 0 20px;
      .tool-item{
        float: left;
        height: 40px;
        line-height: 40px;
        padding-right: 16px;
        i {
          font-size: 25px;
          font-weight: 500;
        }
        &:hover i {
          color: #3caf36;
        }
      }
      .emoji {
        position: relative;
      }
      .upload {
        .icon-folder {
          position: relative;
          overflow: hidden;
          display: inline-block;
          *display: inline;
          *zoom: 1
        }
        input[type=file] {
          width: 100%;
          box-sizing: border-box;
          margin: 10px 0;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          opacity: 0;
          cursor: pointer;

        }
      }
    }
    .inputing {
      font-size: 0;
      text-align: right;
      .typeContent {
        width: 100%;
        height: 80px;
        padding: 0 30px 0 20px;
        text-align: left;
        border: none;
        outline: none;
        box-sizing: border-box;
        font-size: 15px;
        overflow: auto;
      }
      .btn-send {
        width: 70px;
        height: 25px;
        margin-top: 15px;
        margin-right: 20px;
        &:hover {
          background-color: #3caf36;
          outline: none;
          color: #fff;
          border: 1px solid;
          border-radius: 2px;
        }
      }
    }
  }
</style>
