<script setup lang="ts">
const { tasks, loading, fetchTasks, deleteTask, completeTask } = useTasks();
const toast = useToast();

onMounted(() => {
	fetchTasks();
});

const onDelete = async (id: string) => {
	try {
		await deleteTask(id);
		toast.add({ title: "Deleted", color: "green", icon: "i-lucide-trash" });
	}
	catch {
		toast.add({ title: "Delete failed", color: "red", icon: "i-lucide-alert-triangle" });
	}
};

const onComplete = async (id: string) => {
	try {
		await completeTask(id);
		toast.add({ title: "Task completed", color: "green", icon: "i-lucide-check" });
	}
	catch {
		toast.add({ title: "Complete failed", color: "red", icon: "i-lucide-alert-triangle" });
	}
};
</script>

<template>
	<div>
		<h2 class="text-xl font-bold mb-4">
			Your Tasks
		</h2>

		<div
			v-if="loading"
			class="text-center py-10"
		>
			<UIcon
				name="i-heroicons-arrow-path-20-solid"
				class="w-6 h-6 animate-spin text-gray-400"
			/>
		</div>

		<div
			v-else-if="tasks.length === 0"
			class="text-center text-gray-500"
		>
			No tasks yet.
		</div>

		<div
			v-else
			class="space-y-4"
		>
			<UCard
				v-for="task in tasks"
				:key="task.id"
			>
				<div class="flex justify-between items-start">
					<div>
						<h3 class="text-lg font-medium">
							{{ task.description }}
						</h3>
						<div class="text-sm text-gray-500 space-x-2 mt-1">
							<UBadge :color="task.is_completed ? 'success' : 'warning'">
								{{ task.is_completed ? 'Done' : 'Pending' }}
							</UBadge>
							<UBadge
								v-if="task.due_date"
								color="neutral"
								variant="soft"
							>
								Due: {{ new Date(task.due_date).toLocaleString() }}
							</UBadge>
							<UBadge
								:color="[3, 4].includes(task.priority) ? 'error' : task.priority === 2 ? 'warning' : 'info'"
								variant="soft"
							>
								Priority: {{ task.priority }}
							</UBadge>
						</div>
					</div>

					<div class="flex gap-2">
						<UButton
							v-if="!task.is_completed"
							size="xs"
							color="success"
							variant="soft"
							icon="i-lucide-check"
							@click="onComplete(task.id)"
						/>
						<UButton
							size="xs"
							color="warning"
							variant="soft"
							icon="i-lucide-pencil"
							:to="`/tasks/${task.id}/edit`"
						/>
						<UButton
							size="xs"
							color="error"
							variant="soft"
							icon="i-lucide-trash"
							@click="onDelete(task.id)"
						/>
					</div>
				</div>
			</UCard>
		</div>
	</div>
</template>
