<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const hydrated = ref(false);
onMounted(() => {
	hydrated.value = true;
});

const { isAuthenticated, user, logout } = useAuth();

const items = computed<NavigationMenuItem[]>(() => {
	const baseItems: NavigationMenuItem[] = [
		{
			label: "Home",
			icon: "i-lucide-house",
			to: "/",
		},
		{
			label: "GitHub",
			icon: "i-simple-icons-github",
			badge: "Niewiaro",
			to: "https://github.com/Niewiaro",
			target: "_blank",
		},
	];

	if (!hydrated.value) {
		return baseItems;
	}

	if (isAuthenticated.value) {
		return [
			...baseItems,
			{
				label: "Tasks",
				icon: "i-lucide-list-checks",
				to: "/tasks",
			},
			{
				label: "Create Task",
				icon: "i-lucide-plus",
				to: "/tasks/create",
			},
			{
				label: user.value?.first_name || "Me",
				icon: "i-lucide-user",
				to: "/me",
			},
			{
				label: "Logout",
				icon: "i-lucide-log-out",
				onClick: async () => {
					await logout();
					navigateTo("/login");
				},
			},
		];
	}
	else {
		return [
			...baseItems,
			{
				label: "Register",
				icon: "i-lucide-clipboard-pen",
				to: "/register",
			},
			{
				label: "Login",
				icon: "i-lucide-log-in",
				to: "/login",
			},
		];
	}
});
</script>

<template>
	<UNavigationMenu
		highlight
		:items="items"
		class="w-full justify-center"
	/>
</template>
