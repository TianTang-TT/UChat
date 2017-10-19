<template>
  <div class="emoji-container">
    <div class="tab">
      <section :class="['emoji-list', currentEmoji.size]" :data-type="currentEmoji.type">
        <img v-for="i in currentEmoji.total"
             @click="chooseEmoji(currentEmoji.type, i)"
             :src="require(`assets/img/${currentEmoji.type}/${i}.gif`)"
             :data-type="currentEmoji.type"
             :data-num="i">
      </section>
    </div>
    <ul class="selector clearfix">
      <li class="selector-li" v-for="emoji in emojis" :data-type="emoji.type">
        <img :src="emoji.icon" @click="switchEmojiTab(emoji)">
      </li>
    </ul>
  </div>
</template>
<script>
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
        emojis: {
          qq: {
            type: 'qq',
            size: 'small',
            icon: require('assets/img/qq/1.gif'),
            total: 75
          },
          tsj: {
            type: 'tsj',
            size: 'common',
            icon: require('assets/img/tsj/1.gif'),
            total: 18
          }
        },
        currentEmojiType: 'qq'
      }
    },
    computed: {
      currentEmoji () {
        return this.emojis[this.currentEmojiType]
      }
    },
    methods: {
      hideTab (e = window.event) {
        if (!this.$el.contains(e.target)) {
          this.hideHandler()
        }
      },
      switchEmojiTab (emoji) {
        this.currentEmojiType = emoji.type
      },
      chooseEmoji (type, name) {
        // 构造img标签并插入到当前的输入区
        let img = `<img src=${require('assets/img/' + type + '/' + name + '.gif')} type="emoji">`

        this.hideHandler(img)
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
