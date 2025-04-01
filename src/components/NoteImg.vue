<template>
    <section class="note-img">
      <img :src="info.url" alt="" />
    </section>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  // const _props = defineProps<{
  //   info: {
  //     url: string;
  //   };
  // }>();

//   const props = defineProps<{
//   info: { url: string }
// }>()

defineProps<{ info: { url: string } }>()
  </script>
  
  <style scoped>
  .note-img img {
    width: 100%;
  }
  </style>