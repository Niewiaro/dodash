export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const config = useRuntimeConfig();

	if (!body.email || !body.password) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing email or password",
		});
	}

	const formData = new URLSearchParams();
	formData.append("username", body.email);
	formData.append("password", body.password);
	formData.append("grant_type", "password");

	try {
		interface LoginResponse {
			access_token: string;
		}
		const res = await $fetch<LoginResponse>(`${config.public.apiBaseUrl}/auth/login`, {
			method: "POST",
			body: formData.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		setCookie(event, "token", res.access_token, {
			httpOnly: true,
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		return { success: true };
	}
	catch (error: any) {
		const message = error?.response?._data || "Login failed";
		throw createError({
			statusCode: error?.response?.status || 500,
			statusMessage: JSON.stringify(message),
		});
	}
});
