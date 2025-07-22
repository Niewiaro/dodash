<script setup lang="ts">
const { data: user, pending, error } = await useLazyFetch("/api/users/me");
</script>

<template>
	<div>
		<div v-if="pending">
			Loading...
		</div>
		<div v-else-if="error">
			<p style="color: red">
				Error: {{ error.data.statusMessage }}
			</p>
			<NuxtLink to="/login">Login</NuxtLink>
		</div>
		<div v-else>
			<p><strong>Email:</strong> {{ user.email }}</p>
			<p><strong>First name:</strong> {{ user.first_name }}</p>
			<p><strong>Last name:</strong> {{ user.last_name }}</p>
			<p><strong>ID:</strong> {{ user.id }}</p>
		</div>
	</div>
</template>

<style scoped>

</style>
