<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../composables/Task';

const props = defineProps<{ initialTask: Task | null }>();
const emit = defineEmits<{ (e: 'save-task', task: Task): void }>();

const task = ref<Task>(
  props.initialTask || {
    id: '',
    name: '',
    description: '',
    status: 'TO DO'
});

const isEditing = !!props.initialTask;

function handleSubmit() {
  if (task.value.name.trim()) {
    emit('save-task', { ...task.value });
    task.value = { id: '', name: '', description: '', status: 'TO DO' };
  }
};
</script>


<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Task Name</label>
      <input
        id="name"
        v-model="task.name"
        maxlength="250"
        required
      />
    </div>

    <div>
      <label for="description">Task Description (Optional)</label>
      <textarea
        id="description"
        v-model="task.description"
        maxlength="1000"
      ></textarea>
    </div>

    <div>
      <label for="status">Task Status</label>
      <select v-model="task.status">
        <option value="TO DO">TO DO</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>
    </div>

    <button type="submit">{{ isEditing ? 'Update Task' : 'Create Task' }}</button>
  </form>
</template>
