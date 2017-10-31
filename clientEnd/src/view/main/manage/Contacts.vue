<template>
  <!--联系人列表-->
  <div class="contacts">
    <contact
      contact-type="contact"
      v-for="contact in contacts"
      key
      :isActive="contact.id === currentContact"
      @click.native="chooseContact(contact)"
      :contact-msg="contact"></contact>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'contacts',
    computed: {
      ...mapState('contacts', ['contacts', 'currentContact'])
    },
    methods: {
      ...mapActions('contacts', ['activeContact']),
      chooseContact (contact) {
        this.$router.push({name: 'contacts', params: {contactId: contact.id}})
        this.activeContact(contact.id)
      }
    }
  }
</script>
