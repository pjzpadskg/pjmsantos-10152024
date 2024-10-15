/* KanbanBoard */
<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../composables/Task';
import TaskForm from './TaskForm.vue';
import TaskCard from './TaskCard.vue';

const tasks = ref<Task[]>([
  {
    id: '1',
    name: 'Task 1',
    description: 'Description 1',
    status: 'TO DO'
  },
  {
    id: '2',
    name: 'Task 2',
    status: 'IN PROGRESS'
  },
  {
    id: '3',
    name: 'Task 3',
    status: 'DONE'
  }
]);

const editingTask = ref<Task | null>(null);
const isAddingTask = ref<boolean>(false);
const statuses = ['TO DO', 'IN PROGRESS', 'DONE'];

function tasksByStatus(status: string): Task[] {
  return tasks.value.filter(task => task.status === status)
}

function saveTask(task: Task): void {
  const existingIndex = tasks.value.findIndex(t => t.id === task.id);
  if (existingIndex !== -1) {
    tasks.value[existingIndex] = task;
  } else {
    task.id = Date.now().toString()
    tasks.value.push(task)
  }
  editingTask.value = null;
  isAddingTask.value = false;
}

function editTask(task: Task): void {
  editingTask.value = { ...task };
  isAddingTask.value = false;
};

function deleteTask(taskId: string): void {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
};

function startNewTask(): void {
  editingTask.value = null;
  isAddingTask.value = true;
}
</script>

<template>
  <button @click="startNewTask">Add New Task</button>
  <TaskForm
      v-if="isAddingTask"
      :initialTask="null"
      @save-task="saveTask"
    />

  <div class="kanban-board">

    <div class="column"
      v-for="status in statuses"
      :key="status">

      <h2>{{ status }}</h2>

      <TaskForm
      v-if="editingTask && editingTask.status === status"
      :initialTask="editingTask"
      @save-task="saveTask"/>

      <TaskCard
        v-for="task in tasksByStatus(status)"
        :key="task.id"
        :task="task"
        @edit-task="editTask"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-around;
}
.column {
  width: 30%;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
