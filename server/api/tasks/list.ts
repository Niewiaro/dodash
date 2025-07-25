export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const token = getCookie(event, "token");

	if (!token) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	try {
		const res = await $fetch(`${config.public.apiBaseUrl}/tasks/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	}
	catch (error: any) {
		throw createError({
			statusCode: error?.response?.status || 500,
			statusMessage: JSON.stringify(error?.response?._data || "Failed to fetch tasks"),
		});
	}
});
