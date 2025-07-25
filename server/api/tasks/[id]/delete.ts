export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const token = getCookie(event, "token");
	const id = event.context.params?.id;

	if (!token) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}
	if (!id) {
		throw createError({ statusCode: 400, statusMessage: "Missing todo ID" });
	}

	try {
		await $fetch(`${config.public.apiBaseUrl}/tasks/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return { success: true };
	}
	catch (error: any) {
		throw createError({
			statusCode: error?.response?.status || 500,
			statusMessage: JSON.stringify(error?.response?._data || "Delete failed"),
		});
	}
});
