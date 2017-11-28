<template>
  <!--联系人列表-->
  <div class="contacts">
    <div class="mem-item contact"
         v-for="contact in contacts"
         key
         @click="chooseContact(contact)"
         :class="[contact.id === currentContact ? 'active' : '']">
      <img class="portrait" :src="contact.avatar">
      <div class="desc contact">
        <p class="name">{{ contact.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'contacts',
    computed: {
      ...mapState(['socket', 'userInfo']),
      ...mapState('contacts', ['contacts', 'currentContact'])
    },
    methods: {
      ...mapActions('contacts', ['activeContact']),
      chooseContact (contact) {
        this.$router.push({name: 'contacts', params: {contactId: contact.id}})
        this.activeContact(contact.id)
      },
      startChart (contact) {
        // 不能跟自己聊天
        if (contact.id === this.userInfo.id) {
          this.$message.warning('你是有多寂寞啊想跟自己聊天！')
          return
        }
        this.socket.emit('requestChat', contact, res => {
          if (res.code === 0) {
            this.$message.error(res.message)
          } else if (res.code === 1) {
            this.$message.success(res.message)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .mem-item {
    height: 40px;
    padding: 12.5px;
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    display: flex;
    .portrait {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    .desc {
      flex: 1;
      width: 1%;
      margin-left: 10px;
      height: 100%;
      &.contact {
        .name {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          font-size: 16px;
        }
      }
    }
    &.active {
      background-color: #3a3f45;
    }
  }
</style>
