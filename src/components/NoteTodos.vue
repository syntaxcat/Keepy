<script setup lang="ts">
import { computed } from 'vue'

interface Todo {
    id: string
    txt: string
    isDone: boolean
    createdAt?: number
}

interface NoteTodosInfo {
    todos: Todo[]
}

const props = defineProps<{
    info: NoteTodosInfo
}>()

const emit = defineEmits<{
    (e: 'changeTodo', content: string, todoId: string): void
    (e: 'markCheckBox', mark: boolean, todoId: string): void
}>()

const openTodos = computed(() =>
    props.info.todos.filter(todo => !todo.isDone)
)

const closeTodos = computed(() =>
    props.info.todos.filter(todo => todo.isDone)
)

const handleTodoChange = (event: Event, todoId: string) => {
    const target = event.target as HTMLTextAreaElement
    emit('changeTodo', target.value, todoId)
}

const handleCheckboxChange = (event: Event, todoId: string) => {
    const target = event.target as HTMLInputElement
    emit('markCheckBox', target.checked, todoId)
}
</script>

<template>
    <section class="note-todos">
        <div v-if="openTodos.length > 0">
            <ul>
                <li v-for="todo in openTodos" :key="todo.id">
                    <input type="checkbox" :checked="todo.isDone" @change="handleCheckboxChange($event, todo.id)">
                    <textarea :value="todo.txt" @change="handleTodoChange($event, todo.id)"></textarea>
                </li>
            </ul>
        </div>

        <div v-if="closeTodos.length > 0">
            <ul>
                <li v-for="todo in closeTodos" :key="todo.id" class="done">
                    <input type="checkbox" :checked="todo.isDone" @change="handleCheckboxChange($event, todo.id)">
                    {{ todo.txt }}
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.note-todos .done {
    text-decoration: line-through;
}

.note-todos ul {
    padding: 0;
}

.note-todos li {
    /* display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem; */

    display: flex;
  align-items: flex-start; 
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.note-todos input[type="checkbox"] {
  /* margin-top: 0.2rem;  */
  width: 18px;
  height: 18px;
}

.note-todos textarea {
    /* outline: none;
    border: none;
    background-color: transparent;
    resize: none;
    font-family: Arial;
    width: 100%; */

    outline: none;
    border: none;
    background-color: transparent;
    resize: none;
    font-family: Arial, sans-serif;
    width: 100%;
    min-height: 1.5rem;
    /* line-height: 1.5; */
    line-height: 1.4;
    padding: 0;
    margin: 0;
}


</style>