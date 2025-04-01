<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import NoteTxt from '@/components/NoteTxt.vue'
import NoteImg from '@/components/NoteImg.vue'
import NoteVideo from '@/components/NoteVideo.vue'
import NoteTodos from '@/components/NoteTodos.vue'
import type { Note, NoteType } from '@/types/note'
import { showMsg } from '@/services/userMsg'
const COLOR_OPTIONS = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'darkBlue',
    'purple',
    'pink',
    'brown',
    'gray',
] as const

type ColorOption = typeof COLOR_OPTIONS[number]

const props = defineProps<{
    note: Note
}>()

const emit = defineEmits<{
    (e: 'noteRemoved', noteId: string): void
    (e: 'updateColor', color: ColorOption, noteId: string): void
    (e: 'cloneNote', noteId: string): void
    (e: 'pinNote', noteId: string): void
    (e: 'changeTitle', title: string, noteId: string): void
    (e: 'changeTxt', txt: string, noteId: string): void
    (e: 'changeTodo', content: string, todoId: string, noteId: string): void
    (e: 'markCheckBox', mark: boolean, todoId: string, noteId: string): void
}>()

// const cmpMap: Record<NoteType, any> = {
//     NoteTxt,
//     NoteImg,
//     NoteVideo,
//     NoteTodos,
// }

const cmpMap: Record<string, any> = {
    'NoteTxt': NoteTxt,
    'NoteImg': NoteImg,
    'NoteVideo': NoteVideo,
    'NoteTodos': NoteTodos,
}

// const title = ref(props.note.titleTxt)
const clickedColorPalette = ref(false)
const colors = COLOR_OPTIONS

// const pinIconSrc = computed(() =>
//     props.note.isPinned
//         ? '/src/assets/pin-full.svg'
//         : '/src/assets/pin-empty.svg'
// )

const pinIconSrc = computed(() =>
    props.note.isPinned
        ? new URL('@/assets/pin-full.svg', import.meta.url).href
        : new URL('@/assets/pin-empty.svg', import.meta.url).href
)

// const removeNote = (noteId: string) => emit('noteRemoved', noteId)
const removeNote = (noteId: string) => {
    emit('noteRemoved', noteId)
    showMsg('Note deleted', 'error')
}
const togglePalette = () => clickedColorPalette.value = !clickedColorPalette.value

const updateColor = (color: ColorOption, noteId: string) => {
    clickedColorPalette.value = false
    emit('updateColor', color, noteId)
}

const cloneNote = (noteId: string) => {
    emit('cloneNote', noteId)
    showMsg('Note duplicated', 'info')
}

const pinNote = (noteId: string) => {
    const isNowPinned = !props.note.isPinned
    emit('pinNote', noteId)
    showMsg(`Note ${isNowPinned ? 'pinned' : 'unpinned'}`, 'info')
}
const changeTitle = (title: string, noteId: string) => emit('changeTitle', title, noteId)
const changeTxt = (txt: string, noteId: string) => emit('changeTxt', txt, noteId)
const changeTodo = (content: string, todoId: string) =>
    emit('changeTodo', content, todoId, props.note.id)

const markCheckBox = (mark: boolean, todoId: string) =>
    emit('markCheckBox', mark, todoId, props.note.id)
</script>

<template>
    <section class="note-preview" :class="note.style?.backgroundColor">
        <header>
            <!-- <input type="text" v-model="title" @input="changeTitle(title, note.id)"> -->
            <input type="text" :value="props.note.titleTxt"
                @input="(e) => changeTitle((e.target as HTMLInputElement).value, note.id)">
            <button @click="pinNote(note.id)">
                <img :src="pinIconSrc" alt="pin">
            </button>
        </header>

        <div class="mainCmp">
            <!-- <component :is="cmpMap[note.type]" :info="note.info" @markCheckBox="markCheckBox" @changeTodo="changeTodo"
                @changeTxt="changeTxt($event, note.id)" /> -->

            <component v-if="cmpMap[note.type]" :is="cmpMap[note.type]" :info="note.info" @markCheckBox="markCheckBox"
                @changeTodo="changeTodo" @changeTxt="changeTxt($event, note.id)" />
            <div v-else>
                <p style="color: red">Unknown type: {{ note.type }}</p>
            </div>
        </div>

        <div class="actions">
            <button @click="removeNote(note.id)">
                <img src="/src/assets/bx-trash-alt.svg" alt="trash">
            </button>
            <button @click="togglePalette">
                <img src="/src/assets/bx-palette2.svg" alt="palette">
            </button>

            <div class="color-container" v-if="clickedColorPalette">
                <div v-for="color in colors" :key="color" class="color" :class="color"
                    @click="updateColor(color, note.id)" />
            </div>

            <button @click="cloneNote(note.id)">
                <img src="/src/assets/bx-copy2.svg" alt="duplicate">
            </button>
        </div>
    </section>
</template>

<style scoped>
.color-container {
    z-index: 1;
    padding: 8px 9px 3px;
    white-space: nowrap;
    background: #fff;
    position: absolute;
    top: 85%;
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 32%);
    border-radius: 6px;
    cursor: pointer;
}

.color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    margin: 3px;
}

.red {
    background-color: #f28b82;
}

.orange {
    background-color: #fabc05;
}

.yellow {
    background-color: #fff375;
}

.green {
    background-color: #cbff90;
}

.teal {
    background-color: #a7ffeb;
}

.blue {
    background-color: #caf0f8;
}

.darkBlue {
    background-color: #aecbfa;
}

.purple {
    background-color: #d7aefb;
}

.pink {
    background-color: #fdcfe8;
}

.brown {
    background-color: #e6c9a8;
}

.gray {
    background-color: #e8eaed;
}

.note-preview {
    border-radius: 8px;
}

.note-preview header {
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    display: flex;
    justify-content: space-between;
}

.note-preview header button {
    padding: 0.5em;
}

.note-preview header button:hover {
    background: rgb(145 145 145 / 20%);
    border-radius: 50%;
}

.note-preview .mainCmp {
    padding: 1rem;
}

.note-preview input {
    background-color: transparent;
    border: none;
    outline: 0;
}

.note-preview .actions {
    display: flex;
    position: relative;
    justify-content: center;
    padding-bottom: 0.5rem;
}

.note-preview .actions button,
.note-preview button {
    background-color: transparent;
    border: none;
    outline: 0;
    display: flex;
}

.note-preview .actions button:hover {
    background: rgb(145 145 145 / 20%);
    border-radius: 50%;
}

.note-preview .actions button {
    padding: 0.5em;
}
</style>