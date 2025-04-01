<script setup lang="ts">
import { ref, computed } from 'vue'
import { utilService } from '@/services/util-service'
import type { NoteType } from '@/types/note'

const emit = defineEmits<{
  (e: 'addNote', noteData: any): void
}>()

const type = ref<NoteType>('NoteTxt')
const titleTxt = ref('')
const info = ref('')

const setType = (newType: NoteType) => {
  type.value = newType
}

const onAddNote = () => {
  if (!titleTxt.value && !info.value) return

  const note: any = {
    type: type.value,
    titleTxt: titleTxt.value,
  }

  if (type.value === 'NoteTxt') {
    note.info = { txt: info.value }
  } else if (type.value === 'NoteImg' || type.value === 'NoteVideo') {
    note.info = { url: info.value }
  } else if (type.value === 'NoteTodos') {
    const todos = info.value.split(',').map((txt: string) => ({
      id: utilService.makeId(),
      txt: txt.trim(),
      isDone: false,
    }))
    note.info = { todos }
  }

  emit('addNote', note)
  titleTxt.value = ''
  info.value = ''
}

const placeholderByType = computed(() => {
  switch (type.value) {
    case 'NoteTxt':
      return "What's on your mind..."
    case 'NoteImg':
      return 'Enter image URL...'
    case 'NoteVideo':
      return 'Enter video URL...'
    case 'NoteTodos':
      return 'Enter comma separated list...'
    default:
      return ''
  }
})
</script>

<!-- <template>
  <section class="note-add">
    <form @submit.prevent="onAddNote">
      <input type="text" class="title" placeholder="Note title" v-model="titleTxt" />
      <input type="text" class="content" :placeholder="placeholderByType" v-model="info" />

      <div class="actions-container">
        <div class="add-actions">
          <button type="button" @click="setType('NoteTxt')">
            <img src="@/assets/bx-text.svg" alt="text" />
          </button>
          <button type="button" @click="setType('NoteImg')">
            <img src="@/assets/bx-image.svg" alt="image" />
          </button>
          <button type="button" @click="setType('NoteVideo')">
            <img src="@/assets/bxl-youtube.svg" alt="youtube" />
          </button>
          <button type="button" @click="setType('NoteTodos')">
            <img src="@/assets/bx-list-ul.svg" alt="list" />
          </button>
        </div>

        <button type="submit">
          <img src="@/assets/bx-plus.svg" alt="plus" />
        </button>
      </div>
    </form>
  </section>
</template> -->

<template>
  <section class="note-add">
    <form @submit.prevent="onAddNote">
      <input
        type="text"
        class="title"
        placeholder="Note title"
        :value="titleTxt"
        @input="(e) => titleTxt = (e.target as HTMLInputElement).value"
      />
      <input
        type="text"
        class="content"
        :placeholder="placeholderByType"
        :value="info"
        @input="(e) => info = (e.target as HTMLInputElement).value"
      />

      <div class="actions-container">
        <div class="add-actions">
          <button type="button" @click="setType('NoteTxt')">
            <img src="@/assets/bx-text.svg" alt="text" />
          </button>
          <button type="button" @click="setType('NoteImg')">
            <img src="@/assets/bx-image.svg" alt="image" />
          </button>
          <button type="button" @click="setType('NoteVideo')">
            <img src="@/assets/bxl-youtube.svg" alt="youtube" />
          </button>
          <button type="button" @click="setType('NoteTodos')">
            <img src="@/assets/bx-list-ul.svg" alt="list" />
          </button>
        </div>

        <button type="submit">
          <img src="@/assets/bx-plus.svg" alt="plus" />
        </button>
      </div>
    </form>
  </section>
</template>


<style scoped>
.actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions-container button {
  padding: 5px;
  display: flex;
}

.note-add {
  color: #817e80;
  display: flex;
  justify-content: center;
}

.note-add form {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-radius: 10px;
  transition: all 200ms;
  box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent,
    0 2px 15px rgba(0, 0, 0, 0.3);
}

.note-add button {
  cursor: pointer;
  background: transparent;
  border: none;
}

.note-add button:hover {
  background: rgb(145 145 145 / 20%);
  border-radius: 50%;
}

.note-add input,
.note-filter input,
.note-filter select {
  padding: 0.5rem;
  height: 2rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  /* cursor: pointer; */
}

.note-add .add-actions {
  width: 10rem;
  display: flex;
  /* gap: 0.5rem; */
}

.note-add .add-actions button {
  padding: 5px;
    display: flex;
}

.note-add .add-actions button:hover {
  background: rgb(145 145 145 / 20%);
  border-radius: 50%;
}


@media screen and (max-width: 768px) {
  .note-add form {
    display: block;
    width: 85%;
  }

  .note-add form input,
  .note-add form input {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .note-filter {
    width: 85%;
    flex-direction: column;
    gap: 0.5rem;
  }

  .note-filter input,
  .note-filter select {
    display: block;
  }

  .note-card button {
    opacity: 1;
  }
}
</style>