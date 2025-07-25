export const useTasks = () => {
	const tasks = useState("tasks", () => [] as any[]);
	const loading = ref(false);

	// Pobierz wszystkie zadania
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

	// Pobierz jedno zadanie po ID
	const getTask = async (id: string) => {
		try {
			const res = await $fetch(`/api/tasks/${id}`);
			return res;
		}
		catch (e) {
			console.error(`Failed to load task ${id}:`, e);
			throw e;
		}
	};

	// Utwórz nowe zadanie
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

	// Zaktualizuj istniejące zadanie
	const updateTask = async (id: string, updatedData: {
		description: string;
		priority?: number;
		due_date?: string | null;
	}) => {
		await $fetch(`/api/tasks/${id}`, {
			method: "PUT",
			body: updatedData,
		});
		await fetchTasks();
	};

	// Usuń zadanie
	const deleteTask = async (id: string) => {
		await $fetch(`/api/tasks/${id}/delete`, { method: "DELETE" });
		await fetchTasks();
	};

	// Ukończ zadanie
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
