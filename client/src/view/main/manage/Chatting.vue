<template>
  <!--当前聊天-->
  <div class="chatting">
    <contact
      contact-type="chatting"
      v-for="contact in contacts"
      key
      @click.native="chooseContact(contact)"
      :contact-msg="contact">
    </contact>
  </div>
</template>
<script>
  import Avatar from 'assets/img/1.jpg'
  export default {
    name: 'chatting',
    data () {
      return {
        contacts: [
          {name: '惊蛰', avatar: Avatar, text: '测试文字'},
          {name: '天棠', avatar: Avatar, text: '说过一句话'}
        ]
      }
    },
    methods: {
      chooseContact (chatting) {
        this.$router.push({name: 'chatting', params: {userName: chatting.name}})
      }
    }
  }
</script>
