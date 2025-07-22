<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
	{
		label: "Home",
		icon: "i-lucide-house",
		to: "/",
	},
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
	{
		label: "GitHub",
		icon: "i-simple-icons-github",
		badge: "Niewiaro",
		to: "https://github.com/Niewiaro",
		target: "_blank",
	},
]);
</script>

<template>
	<UNavigationMenu
		highlight
		:items="items"
		class="w-full justify-center"
	/>
</template>
