<script setup lang="ts">
import { onUpdated, computed } from 'vue'
import Isotope from 'isotope-layout'
import NotePreview from '@/components/NotePreview.vue'
import type { Note } from '@/types/note'

// const props = defineProps<{
//     note: Note
//     color?: string
// }>()
const props = defineProps<{ notes: Note[] }>()
const emit = defineEmits<{
    (e: 'noteRemoved', id: string): void
    (e: 'updateColor', color: string, id: string): void
    (e: 'cloneNote', id: string): void
    (e: 'pinNote', id: string): void
    (e: 'changeTitle', title: string, id: string): void
    (e: 'changeTxt', txt: string, id: string): void
    (e: 'changeTodo', content: string, todoId: string, id: string): void
    (e: 'markCheckBox', mark: boolean, todoId: string, id: string): void
}>()

const pinnedNotes = computed(() => props.notes.filter(n => n.isPinned))
const notPinnedNotes = computed(() => props.notes.filter(n => !n.isPinned))

const forward = (event: string, ...args: any[]) => {
    emit(event as any, ...args)
}



// onUpdated(() => {
//     setTimeout(() => {
//         new Isotope('.pinned-notes', {
//             itemSelector: '.note-card',
//             masonry: { gutter: 15 },
//         })
//         new Isotope('.other-notes', {
//             itemSelector: '.note-card',
//             masonry: { gutter: 15 },
//         })
//     }, 100)
// })

onUpdated(() => {
    setTimeout(() => {
        const pinnedEl = document.querySelector('.pinned-notes')
        const otherEl = document.querySelector('.other-notes')

        if (pinnedEl) {
            new Isotope(pinnedEl, {
                itemSelector: '.note-card',
                masonry: { gutter: 15 },
            })
        }

        if (otherEl) {
            new Isotope(otherEl, {
                itemSelector: '.note-card',
                masonry: { gutter: 15 },
            })
        }
    }, 100)
})
</script>

<template>
    <section class="notes-list">
        <div v-if="pinnedNotes.length">
            <h2>PINNED</h2>
            <ul class="notes-area pinned-notes">
                <li v-for="note in pinnedNotes" :key="note.id" class="note-card" :class="note.style?.backgroundColor">
                    <NotePreview :note="note" :color="note.style?.backgroundColor"
                        @markCheckBox="forward('markCheckBox', $event, note.id)"
                        @changeTodo="forward('changeTodo', $event, note.id)"
                        @changeTxt="forward('changeTxt', $event, note.id)"
                        @changeTitle="forward('changeTitle', $event, note.id)" @pinNote="emit('pinNote', note.id)"
                        @cloneNote="emit('cloneNote', note.id)" @noteRemoved="emit('noteRemoved', note.id)"
                        @updateColor="forward('updateColor', $event, note.id)" />
                </li>
            </ul>
        </div>

        <div v-if="notPinnedNotes.length">
            <h2>OTHERS</h2>
            <ul class="notes-area other-notes">
                <li v-for="note in notPinnedNotes" :key="note.id" class="note-card"
                    :class="note.style?.backgroundColor">
                    <NotePreview :note="note" :color="note.style?.backgroundColor" @markCheckBox="forward('markCheckBox', $event, note.id)"
                        @changeTodo="forward('changeTodo', $event, note.id)"
                        @changeTxt="forward('changeTxt', $event, note.id)"
                        @changeTitle="forward('changeTitle', $event, note.id)" @pinNote="emit('pinNote', note.id)"
                        @cloneNote="emit('cloneNote', note.id)" @noteRemoved="emit('noteRemoved', note.id)"
                        @updateColor="forward('updateColor', $event, note.id)" />
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>

.notes-list {
    margin-top: 2rem;
}

.notes-list li {
    list-style-type: none;
}

.notes-list button {
    cursor: pointer;
    background: transparent;
    border: none;
}

.notes-list h2 {
    text-align: center;
    color: #534f4f;
}

.notes-area {
    align-items: start;
    margin: 2rem 5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 0;
}

.pinned-notes .note-card header button {
    opacity: 1;
}

.note-card {
    border-radius: 10px;
    background-color: lightyellow;
    transition: all 200ms;
    margin-bottom: 15px;
    width: calc(25% - 15px);
}

.note-card:hover {
    z-index: 2;
    transform: scale(1.05);
    box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent,
        0 2px 15px rgba(0, 0, 0, 0.3);
}

.note-card button {
    opacity: 0;
}

.note-card:hover button {
    opacity: 1;
}

.pinned-notes .note-card header button {
    opacity: 1;
}

@media screen and (max-width: 992px) {
    .note-card {
        width: calc(33% - 15px);
    }
}

@media screen and (max-width: 768px) {
    .note-card {
        width: calc(50% - 15px);
    }


    .note-card button {
        opacity: 1;
    }
}

@media screen and (max-width: 576px) {
    .note-card {
        width: 100%;
    }
}
</style>