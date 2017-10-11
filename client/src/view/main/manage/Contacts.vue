<template>
  <!--联系人列表-->
  <div class="contacts">
    <contact
      contact-type="contact"
      v-for="contact in contacts"
      key
      @click.native="chooseContact"
      :contact-msg="contact"></contact>
  </div>
</template>
<script>
  import Avatar from 'assets/img/1.jpg'
  export default {
    name: 'contacts',
    data () {
      return {
        contacts: [
          {name: '惊蛰', avatar: Avatar, text: '测试文字'}
        ]
      }
    },
    methods: {
      chooseContact (contact) {
        console.log(contact)
      }
    }
  }
</script>
