<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import NoteAdd from '@/components/NoteAdd.vue'
import NoteFilter from '@/components/NoteFilter.vue'
import NoteList from '@/components/NoteList.vue'
import type { Note } from '@/types/note'
import { noteService } from '@/services/note-service'
import { eventBus } from '@/services/event-bus-service'

const findNoteById = (id: string) => notes.value.find((n) => n.id === id)


const notes = ref<Note[]>([])
const filterBy = ref<string | null>(null)
const searchBy = ref<string>('')

const loadNotes = async () => {
    notes.value = await noteService.query()
}

onMounted(() => {
    loadNotes()
})

const setFilter = (val: string) => (filterBy.value = val)
const setSearch = (val: string) => (searchBy.value = val)

const deleteNote = async (id: string) => {
    await noteService.removeNote(id)
    loadNotes()
}

const updateColor = (color: string, id: string) => {
    const note = findNoteById(id)
    if (!note) return
    note.style = { backgroundColor: color }
    noteService.updateNote(note)
}

const cloneNote = async (id: string) => {
    // const note = await noteService.get(id)
    // await noteService.cloneNote(note)
    // loadNotes()
    const note = await noteService.get(id)
    if (!note) return
    await noteService.cloneNote(note)
    loadNotes()
}

const addNote = async (noteData: any) => {
    await noteService.addNote(noteData)
    eventBus.emit('show-msg', {
        txt: 'Note added!',
        type: 'success',
    })
    loadNotes()
}

const pinNote = async (id: string) => {
    const note = findNoteById(id)
    if (!note) return
    note.isPinned = !note.isPinned
    await noteService.updateNote(note)
    loadNotes()
}

const changeTitle = (title: string, id: string) => {
    const note = notes.value.find((n) => n.id === id)
    if (!note) return
    note.titleTxt = title
    noteService.updateNote(note) // ✅ Safe now
}

const changeTxt = (txt: string, id: string) => {
    const note = notes.value.find((n) => n.id === id)
    if (!note) return
    note.info.txt = txt
    noteService.updateNote(note) // ✅ Safe now
}

const changeTodo = (content: string, todoId: string, noteId: string) => {
    const note = findNoteById(noteId)
    const todo = note?.info.todos?.find((t: any) => t.id === todoId)
    if (todo) {
        todo.txt = content
        noteService.updateNote(note!)
    }
}

const markCheckBox = (mark: boolean, todoId: string, noteId: string) => {
    const note = findNoteById(noteId)
    const todo = note?.info.todos?.find((t: any) => t.id === todoId)
    if (todo) {
        todo.isDone = mark
        noteService.updateNote(note!)
    }
}

const notesToShow = computed(() => {
    let result = [...notes.value]

    if (searchBy.value) {
        const search = searchBy.value.toLowerCase()
        result = result.filter((note) => {
            if (note.titleTxt?.toLowerCase().includes(search)) return true
            if (note.type === 'NoteTxt') return note.info.txt?.toLowerCase().includes(search)
            if (note.type === 'NoteTodos') return note.info.todos?.some((t: any) => t.txt.toLowerCase().includes(search))
            return false
        })
    }

    if (filterBy.value) {
        result = result.filter((note) => note.type === filterBy.value)
    }

    return result
})
</script>

<template>
    <section class="note-app">
        <div class="header">
            <h1>Keepy</h1>
            <p class="sub-heading">Light as a thought 💭</p>
        </div>

        <NoteAdd @addNote="addNote" />
        <NoteFilter @set-filter="setFilter" @set-search="setSearch" />
        <NoteList :notes="notesToShow" @noteRemoved="deleteNote" @updateColor="updateColor" @cloneNote="cloneNote"
            @changeTitle="changeTitle" @changeTxt="changeTxt" @changeTodo="changeTodo" @markCheckBox="markCheckBox"
            @pinNote="pinNote" />

        <footer class="app-footer">
            <p>© {{ new Date().getFullYear() }} Keepy. Made with ❤️</p>
        </footer>
    </section>
</template>

<style scoped>
.note-app * {
    box-sizing: border-box;
}

.note-app .header {
    display: flex;
    justify-content: center;
    flex-direction: column;

    color: #534f4f;
    border-bottom: 1px solid #e0e0e0;
    background-color: #fafafa;
    margin-bottom: 2rem;
}

.note-app h1 {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
}

.note-app .sub-heading {
    display: flex;
    justify-content: center;
}

.app-footer {
    margin-top: auto;
    padding: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: #999;
    border-top: 1px solid #e0e0e0;
    background-color: #fafafa;
}
</style>
