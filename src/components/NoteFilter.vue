<script setup lang="ts">
import { ref } from 'vue'

interface FilterOption {
    value: '' | 'NoteTxt' | 'NoteImg' | 'NoteVideo' | 'NoteTodos'
    txt: string
}

const emit = defineEmits<{
    (e: 'setFilter', type: FilterOption['value']): void
    (e: 'setSearch', keyword: string): void
}>()

const filterType = ref<FilterOption['value']>('')
const searchKeyword = ref<string>('')

const options: FilterOption[] = [
    { value: '', txt: 'All' },
    { value: 'NoteTxt', txt: 'Text Notes' },
    { value: 'NoteImg', txt: 'Image Notes' },
    { value: 'NoteVideo', txt: 'Video Notes' },
    { value: 'NoteTodos', txt: 'List Notes' },
]

// if (filterBy.value) {
//   result = result.filter(note => note.type === filterBy.value)
// }

const setFilter = () => {
    emit('setFilter', filterType.value)
}
// const setFilter = () => {
//   console.log('Emitting filter:', filterType.value)
//   emit('setFilter', filterType.value)
// }

const searchByKeyword = () => {
    emit('setSearch', searchKeyword.value.trim())
}
</script>

<template>
    <section class="note-filter">
        <input type="text" v-model="searchKeyword" placeholder="Search" @input="searchByKeyword" />
        <select class="select" @change="setFilter" v-model="filterType">
            <option v-for="option in options" :value="option.value">
                {{ option.txt }}
            </option>
        </select>
    </section>
</template>

<style scoped>

.note-filter {
    margin: 0 auto;
    margin-top: 2rem;
    width: 20rem;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
    /* background-color: #add8e6b9; */
    border-radius: 10px;
    transition: all 200ms;
    box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent,
      0 2px 15px rgba(0, 0, 0, 0.3);
  }
  
  .note-filter input {
    height: 2rem;
    border: 0.5px solid gray;
    border-radius: 5px;
  }
  
  .note-filter select {
    border: 0.5px solid gray;
    border-radius: 5px;
  }

  .note-filter input,
  .note-filter select {
    padding: 0 0.5rem;
    height: 2rem;
    border: 0.5px solid gray;
    border-radius: 5px;
  }
  



@media screen and (max-width: 768px) {
    .note-filter {
        width: 85%;
        flex-direction: column;
        gap: 0.5rem;
    }

    .note-filter input,
    .note-filter select {
        display: block;
    }
}
</style>