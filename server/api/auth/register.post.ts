export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const config = useRuntimeConfig();

	try {
		const result = await $fetch(`${config.public.apiBaseUrl}/auth/register`, {
			method: "POST",
			body,
			headers: {
				"Content-Type": "application/json",
			},
		});

		return { success: true, data: result };
	}
	catch (error: any) {
		const statusCode = error?.response?.status || 500;
		const message = error?.response?._data || "Signup failed";
		throw createError({ statusCode, statusMessage: JSON.stringify(message) });
	}
});
