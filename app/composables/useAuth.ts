export const useAuth = () => {
	const user = useState("auth_user", () => null);
	const loading = useState("auth_loading", () => false);

	const register = async (payload: {
		email: string;
		first_name: string;
		last_name: string;
		password: string;
	}) => {
		try {
			loading.value = true;
			await $fetch("/api/auth/register", {
				method: "POST",
				body: payload,
			});

			await login({ email: payload.email, password: payload.password });
		}
		catch (error: any) {
			throw createError({ statusCode: error?.response?.status || 500, statusMessage: JSON.stringify(error?.response?._data || "Registration failed") });
		}
		finally {
			loading.value = false;
		}
	};

	// Login
	const login = async (payload: {
		email: string;
		password: string;
	}) => {
		try {
			loading.value = true;
			await $fetch("/api/auth/login", {
				method: "POST",
				body: payload,
			});
			await fetchUser();
			await navigateTo("/me");
		}
		catch (error: any) {
			throw createError({ statusCode: error?.response?.status || 401, statusMessage: JSON.stringify(error?.response?._data || "Invalid credentials") });
		}
		finally {
			loading.value = false;
		}
	};

	// User details
	const fetchUser = async () => {
		try {
			loading.value = true;
			const data = await $fetch("/api/users/me");
			user.value = data;
		}
		catch (err) {
			user.value = null;
		}
		finally {
			loading.value = false;
		}
	};

	// Logout
	const logout = async () => {
		await $fetch("/api/auth/logout", { method: "POST" });
		user.value = null;
		await navigateTo("/login");
	};

	const isAuthenticated = computed(() => !!user.value);

	return {
		user,
		loading,
		isAuthenticated,
		fetchUser,
		login,
		logout,
		register,
	};
};
