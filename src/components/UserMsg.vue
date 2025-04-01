<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventBus, type UserMsg } from '@/services/event-bus-service'

const msg = ref<UserMsg | null>(null)

const showMsg = (newMsg: UserMsg) => {
  msg.value = newMsg
  setTimeout(() => {
    msg.value = null
  }, 3000)
}

onMounted(() => {
    eventBus.on('show-msg', showMsg)
})

onUnmounted(() => {
    eventBus.off('show-msg', showMsg)
})

function saveContent(content: string) {
    console.log('Clicked content:', content)
}
</script>

<template>
    <transition name="toast">
      <section v-if="msg" class="user-msg" :class="msg.type">
        <span>{{ msg.txt }}</span>
        <span v-if="msg.content" @click="saveContent(msg.content)">
          {{ msg.content }}
        </span>
      </section>
    </transition>
  </template>

<style scoped>
/* .user-msg {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: #f0f0f0;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    z-index: 1000;
    cursor: pointer;
    transition: all 0.3s ease;
} */

.user-msg {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: #f0f0f0;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  z-index: 1000;
  cursor: pointer;
  animation: jumpIn 500ms ease-out;
}

@keyframes jumpIn {
  0% {
    transform: translateX(-50%) translateY(100%) scale(0.9);
    opacity: 0;
  }
  70% {
    transform: translateX(-50%) translateY(-5%) scale(1.02);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

.toast-enter-active {
  animation: jumpIn 0.25s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}

.user-msg.success {
    background-color: #c8f7c5;
}

.user-msg.error {
    background-color: #f8d7da;
}

.user-msg.info {
    background-color: #d1ecf1;
}
</style>