<template>
  <section class="contentedit">
    <!--聊天工具-->
    <ul class="tools clearfix">
      <li class="tool-item emoji active"><i class="iconfont icon-face"></i>
        <div class="emoji-container">
          <div class="tab">
            <section class="emoji-list small" data-type="qq">

            </section>
            <section class="emoji-list common" data-type="tsj">

            </section>
          </div>
          <ul class="selector clearfix">
            <li class="selector-li" data-type="qq"><img src="~assets/img/qq/1.gif"></li>
            <li class="selector-li" data-type="tsj"><img src="~assets/img/tsj/1.gif"></li>
          </ul>
        </div>
      </li>
      <li class="tool-item printscreen" style="display: none">
        <i class="iconfont icon-scissors"></i>

      </li>
      <li class="tool-item upload">
        <i class="iconfont icon-folder">
          <input type="file" class="uploadImg">
        </i>
      </li>
    </ul>
    <!--输入框-->
    <div class="content">
      <p class="typeContent" contenteditable="true"></p>
      <button class="btn-send">发送(S)</button>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'contentedit'
  }
</script>
<style lang="less">
  .contentedit {
    width: 100%;
    height: 170px;
    position: absolute;
    bottom: 0;
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
        .emoji-container {
          width: 460px;
          height: 290px;
          box-sizing: border-box;
          position: absolute;
          top: -290px;
          left: -100px;
          background-color: #fff;
          border: 1px solid #dadada;
          border-radius: 2px;
          display: none;
          .emoji-list {
            padding: 10px;
            position: absolute;
            top: 0;
            bottom: 40px;
            overflow-y: scroll;
            img:hover {
              background-color: #dcdcdc;
            }
          }
          .common {
            display: none;
            img {
              width: 50px;
              height: 50px;
              margin: 0 4px;
            }
          }
          .small {
            img {
              width: 24px;
              height: 24px;
              margin: 0 4px;
            }
          }
          .selector {
            height: 40px;
            width: 100%;
            padding: 0 15px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #dadada;
            box-sizing: border-box;
            .selector-li {
              float: left;
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              img {
                width: 24px;
                height: 24px;
                vertical-align: middle;
              }
            }
            [data-type=tsj] img {
              width: 26px;
              height: 26px;
            }
          }
        }
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
          opacity: 0;
          cursor: pointer
        }
      }
    }
    .content {
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
        background-color: #eeeeee;
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
