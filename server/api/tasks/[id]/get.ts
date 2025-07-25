export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const token = getCookie(event, "token");
	const id = getRouterParam(event, "id");

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: "No authentication token provided",
		});
	}

	if (!id) {
		throw createError({ statusCode: 400, statusMessage: "Task ID is required" });
	}

	try {
		const task = await $fetch(`${config.public.apiBaseUrl}/tasks/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return task;
	}
	catch (error: any) {
		throw createError({
			statusCode: error?.response?.status || 500,
			statusMessage: JSON.stringify(error?.response?._data || "Server error"),
		});
	}
});
