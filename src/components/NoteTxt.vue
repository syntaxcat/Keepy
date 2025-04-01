<template>
    <section class="note-txt">
      <textarea
        ref="textarea"
        v-model="txt"
        @input="changeTxt"
      ></textarea>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    info: {
      txt: string;
    };
  }>();
  
  const emit = defineEmits<{
    (e: 'changeTxt', value: string): void;
  }>();
  
  const txt = ref(props.info.txt);
  const textarea = ref<HTMLTextAreaElement | null>(null);
  
  function changeTxt() {
    emit('changeTxt', txt.value);
    updateHeight();
  }
  
  function updateHeight() {
    if (!textarea.value) return;
    textarea.value.style.height = '0px';
    textarea.value.style.height = textarea.value.scrollHeight + 'px';
  }
  
  onMounted(() => {
    updateHeight();
  });
  
  watch(txt, () => {
    updateHeight();
  });
  </script>
  
  <style scoped>
  .note-txt textarea {
    outline: none;
    border: none;
    background-color: transparent;
    resize: none;
    font-family: Arial;
    width: 100%;
  }
  </style>