<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// Props
const props = defineProps<{
	task?: {
		id?: string;
		description?: string;
		priority?: number;
		due_date?: string | null;
	};
}>();

// Task actions
const { createTask, updateTask } = useTasks();

// Form schema
const schema = z.object({
	description: z.string().min(1, "Description is required"),
	priority: z.number().min(0).max(4),
	due_date: z
		.string()
		.optional()
		.refine(val => !val || !isNaN(Date.parse(val)), {
			message: "Invalid date",
		}),
});

type Schema = z.output<typeof schema>;

// Form state
const state = reactive<Partial<Schema>>({
	description: props.task?.description ?? "",
	priority: props.task?.priority ?? 2,
	due_date: props.task?.due_date ?? "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		const payload = {
			description: state.description!,
			priority: state.priority!,
			due_date: state.due_date || null,
		};
		if (props.task?.id) {
			await updateTask(props.task.id, payload);
			toast.add({ title: "Task updated", color: "green", icon: "i-lucide-check" });
			await navigateTo("/tasks");
		}
		else {
			await createTask(payload);
			toast.add({ title: "Task created", color: "green", icon: "i-lucide-check" });
		}
	}
	catch (error: any) {
		let parsedDescription: string | undefined;

		try {
			const raw = typeof error?.statusMessage === "string" ? error.statusMessage : "Task error";
			const parsed = JSON.parse(raw);
			parsedDescription = parsed.detail || parsed.message || parsed.error || parsed;
		}
		catch {
			parsedDescription = "Something went wrong";
		}

		toast.add({
			title: "Error",
			description: parsedDescription,
			color: "error",
			icon: "i-lucide-flag-triangle-right",
		});
	}
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<UCard>
			<template #header>
				<h1 class="text-2xl font-bold text-center">
					{{ props.task?.id ? "Edit Task" : "Task Create Form" }}
				</h1>
				<p class="text-center text-gray-500">
					{{ props.task?.id ? "Update the task details below." : "Please fill out the form to create a new task." }}
				</p>
			</template>

			<UForm
				:schema="schema"
				:state="state"
				class="p-10 space-y-4"
				@submit="onSubmit"
			>
				<UFormField
					label="Description"
					name="description"
					size="lg"
				>
					<UInput v-model="state.description" />
				</UFormField>

				<UFormField
					label="Priority"
					name="priority"
					size="lg"
				>
					<USlider
						v-model="state.priority"
						:step="1"
						:default-value="2"
						:min="0"
						:max="4"
					/>
				</UFormField>

				<UFormField
					label="Due Date"
					name="due_date"
					size="lg"
				>
					<UInput
						v-model="state.due_date"
						type="datetime-local"
					/>
				</UFormField>

				<UButton
					type="submit"
					size="lg"
				>
					Submit
				</UButton>
			</UForm>
		</UCard>
	</div>
</template>
