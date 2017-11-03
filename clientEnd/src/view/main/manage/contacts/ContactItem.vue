<template>
  <div class="mem-item contact" :class="[isActive ? 'active' : '']">
    <img class="portrait" :src="avatar">
    <div :class="['desc', contactType]">
      <template v-if="contactType === 'chatting'">
        <p class="name">{{ contactMsg.name }}</p>
        <p class="speak" v-html="lastText"></p>
      </template>
      <template v-if="contactType === 'contact'">
        <p class="name">{{ contactMsg.name }}</p>
      </template>
    </div>
  </div>
</template>
