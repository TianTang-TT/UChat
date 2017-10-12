<template>
  <!--联系人列表-->
  <div class="contacts">
    <contact
      contact-type="contact"
      v-for="contact in contacts"
      key
      @click.native="chooseContact(contact)"
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
          {id: 1, name: '惊蛰', avatar: Avatar},
          {id: 2, name: '天棠', avatar: Avatar}
        ]
      }
    },
    methods: {
      chooseContact (contact) {
        this.$router.push({name: 'contacts', params: {contactId: contact.id}})
      }
    }
  }
</script>
