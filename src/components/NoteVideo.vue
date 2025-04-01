<script setup lang="ts">
import { defineProps } from 'vue';

// const _props = defineProps<{
//     info: {
//         url: string;
//     };
// }>();


// const props = defineProps<{
//   info: { url: string }
// }>()

defineProps<{ info: { url: string } }>()
</script>

<template>
    <section class="note-video">
        <iframe :src="info.url" frameborder="0"></iframe>
    </section>
</template>


<style scoped>
.note-video iframe {
    width: 100%;
}
</style>