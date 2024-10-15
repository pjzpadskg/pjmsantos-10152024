<script setup lang="ts">
import type { Task } from '../composables/Task';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: 'edit-task', task: Task): void;
  (e: 'delete-task', id: string): void;
}>();

function editTask() {
  emit('edit-task', props.task)
}

function deleteTask() {
  emit('delete-task', props.task.id)
}
</script>


<template>
  <div class="task-card">
    <h3>{{ task.name }}</h3>
    <p v-if="task.description">{{ task.description }}</p>
    <button @click="editTask">Edit</button>
    <button @click="deleteTask">Delete</button>
  </div>
</template>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
