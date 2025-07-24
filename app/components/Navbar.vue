<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

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

	if (isAuthenticated.value) {
		return [
			...baseItems,
			{
				label: user.value?.first_name || "Me",
				icon: "i-lucide-user",
				to: "/me",
			},
			{
				label: "Logout",
				icon: "i-lucide-log-out",
				click: async () => {
					await logout();
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
