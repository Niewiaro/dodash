export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const token = getCookie(event, "token");
	const id = getRouterParam(event, "id");
	const body = await readBody(event);

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
		});
	}

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: "Task ID is required",
		});
	}

	if (!body.description) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing task description",
		});
	}

	try {
		const response = await $fetch(`${config.public.apiBaseUrl}/tasks/${id}`, {
			method: "PUT",
			body,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	}
	catch (error: any) {
		throw createError({
			statusCode: error?.response?.status || 500,
			statusMessage: JSON.stringify(error?.response?._data || "Failed to update task"),
		});
	}
});
