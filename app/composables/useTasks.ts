export const useTasks = () => {
	const tasks = useState("tasks", () => [] as any[]);
	const loading = ref(false);

	// Fetch all tasks
	const fetchTasks = async () => {
		loading.value = true;
		try {
			const res = await $fetch("/api/tasks/list"); // proxy do GET /tasks/
			tasks.value = res;
		}
		catch (e) {
			console.error("Failed to load tasks:", e);
		}
		finally {
			loading.value = false;
		}
	};

	// Fetch a single task by ID
	const getTask = async (id: string) => {
		try {
			const res = await $fetch(`/api/tasks/${id}/get`);
			return res;
		}
		catch (e) {
			console.error(`Failed to load task ${id}:`, e);
			throw e;
		}
	};

	// Create a new task
	const createTask = async (taskData: {
		description: string;
		priority?: number;
		due_date?: string | null;
	}) => {
		await $fetch("/api/tasks/create", {
			method: "POST",
			body: taskData,
		});
		await fetchTasks();
	};

	// Update an existing task
	const updateTask = async (id: string, updatedData: {
		description: string;
		priority?: number;
		due_date?: string | null;
	}) => {
		await $fetch(`/api/tasks/${id}/put`, {
			method: "PUT",
			body: updatedData,
		});
		await fetchTasks();
	};

	// Delete a task
	const deleteTask = async (id: string) => {
		await $fetch(`/api/tasks/${id}/delete`, { method: "DELETE" });
		await fetchTasks();
	};

	// Mark a task as complete
	const completeTask = async (id: string) => {
		await $fetch(`/api/tasks/${id}/complete`, { method: "PUT" });
		await fetchTasks();
	};

	return {
		tasks,
		loading,
		fetchTasks,
		getTask,
		createTask,
		updateTask,
		deleteTask,
		completeTask,
	};
};
