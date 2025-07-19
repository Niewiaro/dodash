<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
	{
		label: "Guide",
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
]);
</script>

<template>
	<UNavigationMenu
		highlight
		:items="items"
		class="w-full justify-center"
	/>
</template>
