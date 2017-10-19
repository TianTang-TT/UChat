<template>
  <div class="emoji-container">
    <div class="tab">
      <section class="emoji-list small" data-type="qq">
        <img src="~assets/img/qq/1.gif" data-type="qq" data-num="1">
        <img src="~assets/img/qq/1.gif" data-type="qq" data-num="1">
        <img src="~assets/img/qq/1.gif" data-type="qq" data-num="1">
      </section>
      <section class="emoji-list common" data-type="tsj">
        <img src="~assets/img/tsj/1.gif" data-type="tsj" data-num="1">
      </section>
    </div>
    <ul class="selector clearfix">
      <li class="selector-li" v-for="emoji in emojis" :data-type="emoji.type">
        <img :src="emoji.icon">
      </li>
    </ul>
  </div>
</template>
<script>
  import TSJ from 'assets/img/tsj/1.gif'
  import QQ from 'assets/img/qq/1.gif'
  export default {
    name: 'emoji',
    props: {
      hideHandler: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        emojiTabs: [{
          type: 'qq',
          size: 'small',
          icon: QQ
        }, {
          type: 'tsj',
          size: 'common',
          icon: TSJ
        }],
        currentEmoji: 'qq'
      }
    },
    methods: {
      hideTab (e = window.event) {
        if (!this.$el.contains(e.target)) {
          this.hideHandler()
        }
      }
    },
    created () {
      document.addEventListener('click', this.hideTab)
    },
    destroyed () {
      document.removeEventListener('click', this.hideTab)
    }
  }
</script>
<style lang="less" scoped="">
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
    .tab {
      height: 250px;
      .emoji-list {
        width: 100%;
        height: 250px;
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 0;
        bottom: 40px;
        overflow: auto;
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
</style>
