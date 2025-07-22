export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const token = getCookie(event, "token");

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: "No authentication token provided",
		});
	}

	try {
		const user = await $fetch(`${config.public.apiBaseUrl}/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return user;
	}
	catch (error: any) {
		throw createError({
			statusCode: error?.response?.status || 500,
			statusMessage: JSON.stringify(error?.response?._data || "Server error"),
		});
	}
});
