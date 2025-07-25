<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { getTask, deleteTask, completeTask } = useTasks();
const toast = useToast();

const task = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
	try {
		const data = await getTask(route.params.id as string);
		task.value = data;
	}
	catch (e) {
		toast.add({ title: "Failed to load task", color: "red", icon: "i-lucide-alert-triangle" });
	}
	finally {
		loading.value = false;
	}
});

const onDelete = async () => {
	try {
		await deleteTask(route.params.id as string);
		toast.add({ title: "Task deleted", color: "green", icon: "i-lucide-trash" });
		router.push("/tasks");
	}
	catch {
		toast.add({ title: "Delete failed", color: "red", icon: "i-lucide-alert-triangle" });
	}
};

const onComplete = async () => {
	try {
		await completeTask(route.params.id as string);
		toast.add({ title: "Task completed", color: "green", icon: "i-lucide-check" });
		task.value.is_completed = true;
	}
	catch {
		toast.add({ title: "Complete failed", color: "red", icon: "i-lucide-alert-triangle" });
	}
};
</script>

<template>
	<div class="max-w-xl mx-auto py-10 px-4">
		<UCard v-if="task && !loading">
			<template #header>
				<h2 class="text-2xl font-bold">
					{{ task.description }}
				</h2>
			</template>

			<div class="space-y-3">
				<div class="flex justify-between items-center">
					<span class="text-gray-500">ID</span>
					<UBadge
						color="neutral"
						variant="soft"
					>
						{{ task.id }}
					</UBadge>
				</div>

				<div class="flex justify-between items-center">
					<span class="text-gray-500">Status</span>
					<UBadge :color="task.is_completed ? 'success' : 'warning'">
						{{ task.is_completed ? "Completed" : "Pending" }}
					</UBadge>
				</div>

				<div
					v-if="task.completed_at"
					class="flex justify-between items-center"
				>
					<span class="text-gray-500">Completed at</span>
					<UBadge
						color="neutral"
						variant="soft"
					>
						{{ new Date(task.completed_at).toLocaleString() }}
					</UBadge>
				</div>

				<div
					v-if="task.due_date"
					class="flex justify-between items-center"
				>
					<span class="text-gray-500">Due Date</span>
					<UBadge
						color="neutral"
						variant="soft"
					>
						{{ new Date(task.due_date).toLocaleString() }}
					</UBadge>
				</div>

				<div class="flex justify-between items-center">
					<span class="text-gray-500">Priority</span>
					<UBadge
						:color="[3, 4].includes(task.priority) ? 'error' : task.priority === 2 ? 'warning' : 'info'"
						variant="soft"
					>
						{{ task.priority }}
					</UBadge>
				</div>
			</div>

			<template #footer>
				<div class="flex justify-end gap-2 flex-wrap">
					<UButton
						icon="i-lucide-check"
						color="success"
						variant="soft"
						label="Complete"
						:disabled="task.is_completed"
						@click="onComplete"
					/>

					<UButton
						icon="i-lucide-pencil"
						color="warning"
						variant="soft"
						label="Edit"
						@click="router.push(`/tasks/${task.id}/edit`)"
					/>

					<UButton
						icon="i-lucide-trash"
						color="error"
						variant="soft"
						label="Delete"
						@click="onDelete"
					/>
				</div>
			</template>
		</UCard>

		<div
			v-else
			class="text-center py-10"
		>
			<UIcon
				name="i-heroicons-arrow-path-20-solid"
				class="w-6 h-6 animate-spin text-gray-400"
			/>
		</div>
	</div>
</template>
