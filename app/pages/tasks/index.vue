<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>

<template>
	<div class="p-6 max-w-3xl mx-auto">
		<TasksList />
	</div>
</template>

<style scoped>

</style>
