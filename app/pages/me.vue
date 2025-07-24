<script setup lang="ts">
const { data: user, pending, error } = await useLazyFetch("/api/users/me");
</script>

<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<UCard>
			<template #header>
				<div class="text-center space-y-1">
					<h1 class="text-2xl font-bold">
						<template v-if="pending">
							Loading...
						</template>
						<template v-else-if="error">
							Error
						</template>
						<template v-else>
							Welcome, {{ user.first_name }}
						</template>
					</h1>
					<p class="text-gray-500 text-sm">
						<template v-if="pending">
							Please wait while we load your data
						</template>
						<template v-else-if="error">
							Something went wrong while fetching your profile
						</template>
						<template v-else>
							Here's your profile information
						</template>
					</p>
				</div>
			</template>

			<div class="p-6">
				<template v-if="pending">
					<div class="flex justify-center">
						<UIcon
							name="i-heroicons-arrow-path-20-solid"
							class="animate-spin w-6 h-6 text-gray-500"
						/>
					</div>
				</template>

				<template v-else-if="error">
					<p class="text-red-500 text-center">
						{{ error.data?.statusMessage || error.message }}
					</p>
				</template>

				<template v-else>
					<div class="space-y-4">
						<div class="flex justify-between items-center">
							<span class="font-medium text-gray-600">Email:</span>
							<span class="bg-gray-500 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-50">
								{{ user.email }}
							</span>
						</div>
						<div class="flex justify-between items-center">
							<span class="font-medium text-gray-600">First Name:</span>
							<span class="bg-gray-500 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-50">
								{{ user.first_name }}
							</span>
						</div>
						<div class="flex justify-between items-center">
							<span class="font-medium text-gray-600">Last Name:</span>
							<span class="bg-gray-500 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-50">
								{{ user.last_name }}
							</span>
						</div>
						<div class="flex justify-between items-center">
							<span class="font-medium text-gray-600">User ID:</span>
							<span class="bg-gray-500 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-50">
								{{ user.id }}
							</span>
						</div>
					</div>
				</template>
			</div>

			<template #footer>
				<div
					v-if="error"
					class="text-center"
				>
					<UButton
						label="Login"
						to="/login"
						color="primary"
						icon="i-lucide-log-in"
						variant="soft"
						size="lg"
					/>
				</div>
				<div
					v-else-if="!pending"
					class="text-center"
				>
					<UButton
						label="Logout"
						to="/logout"
						color="warning"
						icon="i-lucide-log-out"
						variant="soft"
						size="lg"
					/>
				</div>
			</template>
		</UCard>
	</div>
</template>
