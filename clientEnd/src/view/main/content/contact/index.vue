<template>
  <section class="contact-detail">
    <div class="avatar-container">
      <img :src="contactInfo.avatar" class="avatar-detail">
    </div>
    <div class="contact-msg">
      <p class="msg-item" v-for="(item, key) in contactInfo" v-if="key !== 'avatar'">
        <span class="label">{{ key + ':' }}</span>
        <span class="value">{{ item }}</span>
      </p>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'contact-detail',
    props: {
      contactId: {
        type: String
      }
    },
    computed: {
      ...mapGetters('contacts', ['contactInfo'])
    }
  }
</script>
<style lang="less" scoped="">
  .contact-detail {
    padding: 100px;
    .avatar-container {
      border-bottom: 1px solid darkgrey;
      text-align: center;
      padding-bottom: 50px;
      .avatar-detail {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }
    .contact-msg {
      margin-top: 20px;
      .msg-item {
        display: flex;
        margin: 20px;
        .label {
          width: 100px;
          text-align: justify;
        }
        .value {
          flex: 1;
          white-space: nowrap;
          textoverflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
</style>
