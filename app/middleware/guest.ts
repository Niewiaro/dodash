export default defineNuxtRouteMiddleware(async () => {
	if (import.meta.server) return;

	const { isAuthenticated, fetchUser } = useAuth();

	if (!isAuthenticated.value) {
		await fetchUser();
	}

	if (isAuthenticated.value) {
		return navigateTo("/me");
	}
});
