<template>
  <div :class="['speaking', messageContent.type]">
    <span v-if="messageContent.type==='system'">
      {{ messageContent.content }}
    </span>
    <template v-else>
      <img src="~assets/img/1.jpg" class="speak-portrait">
      <p class="speak-user">{{ messageContent.speaker }}</p>
      <p class="speak-content">{{ messageContent.content }}</p>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'dialog',
    props: {
      messageContent: {
        type: Object,
        required: true
      }
    }
  }
</script>
