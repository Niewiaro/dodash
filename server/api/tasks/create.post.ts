export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const config = useRuntimeConfig();
	const token = getCookie(event, "token");

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
		});
	}

	if (!body.description) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing task description",
		});
	}

	try {
		const response = await $fetch(`${config.public.apiBaseUrl}/tasks/`, {
			method: "POST",
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
			statusMessage: JSON.stringify(error?.response?._data || "Failed to create task"),
		});
	}
});
