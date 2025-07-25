<script setup lang="ts">
import TaskCreateForm from "~/components/TaskCreateForm.vue";

const route = useRoute();
const taskId = route.params.id as string;

const { getTask } = useTasks();
const task = ref();
const error = ref();

onMounted(async () => {
	try {
		task.value = await getTask(taskId);
	}
	catch (err: any) {
		error.value = err?.data?.message || "Failed to load task";
	}
});
</script>

<template>
	<div
		v-if="error"
		class="text-red-500 text-center mt-10"
	>
		<p>{{ error }}</p>
	</div>

	<div
		v-else-if="!task"
		class="text-center mt-10"
	>
		<p>Loading task...</p>
	</div>

	<div v-else>
		<TaskCreateForm :task="task" />
	</div>
</template>
