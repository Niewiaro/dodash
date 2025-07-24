export const useAuth = () => {
	const user = useState("auth_user", () => null);
	const loading = useState("auth_loading", () => false);

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

	// Login
	const login = async (email: string, password: string) => {
		try {
			await $fetch("/api/auth/login", {
				method: "POST",
				body: { email, password },
			});
			await fetchUser();
		}
		catch (error) {
			throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
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
	};
};
