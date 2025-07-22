<script setup lang="ts">
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;
</script>

<template>
	<section
		id="intro"
		class="scroll-mt-20 py-10"
	>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
				<div class="text-center md:text-left space-y-4">
					<h1>
						<div class="text-5xl font-bold">
							DoDash
						</div>
						<div class="text-2xl text-gray-500">
							Your tasks. Your Dashboard.
						</div>
					</h1>

					<p class="text-gray-500 text-lg">
						DoDash is a modern web application for managing your tasks efficiently.
						Designed to help you organize, track, and complete your to-dos with an intuitive dashboard interface.
						Perfect for individuals and teams looking to boost productivity and stay on top of their work.
					</p>

					<USlideover
						title="What is DoDoes API?"
						description="DoDoes API is a modern RESTful service for managing to-do tasks, users, and authentication.
						Designed for seamless integration with web apps, mobile clients, or automation tools."
						close-icon="i-lucide-arrow-right"
					>
						<UButton
							label="What is DoDoes API?"
						/>

						<template #body>
							<section class="py-10">
								<UContainer>
									<div class="space-y-6">
										<!-- Website -->
										<UCard>
											<template #header>
												<h2 class="text-xl font-semibold">
													DoDoes API Website
												</h2>
											</template>

											<p class="text-gray-500">
												The main landing page for DoDoes API, offering an overview and access to developer tools.
											</p>

											<template #footer>
												<div class="flex justify-center">
													<UButton
														:to="apiBaseUrl"
														size="lg"
														color="primary"
														target="_blank"
													>
														Website
													</UButton>
												</div>
											</template>
										</UCard>

										<!-- Swagger -->
										<UCard>
											<template #header>
												<h2 class="text-xl font-semibold">
													DoDoes API Swagger
												</h2>
											</template>

											<p class="text-gray-500">
												Interactive REST API documentation generated automatically from OpenAPI.
											</p>

											<template #footer>
												<div class="flex justify-center">
													<UButton
														:to="`${apiBaseUrl}/docs`"
														size="lg"
														variant="outline"
														target="_blank"
													>
														Swagger
													</UButton>
												</div>
											</template>
										</UCard>

										<!-- Redoc -->
										<UCard>
											<template #header>
												<h2 class="text-xl font-semibold">
													DoDoes API Redoc
												</h2>
											</template>

											<p class="text-gray-500">
												A modern, user-friendly OpenAPI documentation alternative with clean design and structure.
											</p>

											<template #footer>
												<div class="flex justify-center">
													<UButton
														:to="`${apiBaseUrl}/redoc`"
														size="lg"
														variant="outline"
														target="_blank"
													>
														Redoc
													</UButton>
												</div>
											</template>
										</UCard>

										<!-- OpenAPI -->
										<UCard>
											<template #header>
												<h2 class="text-xl font-semibold">
													DoDoes API OpenAPI JSON
												</h2>
											</template>

											<p class="text-gray-500">
												The raw OpenAPI specification in JSON format, ready to use in developer tools and integrations.
											</p>

											<template #footer>
												<div class="flex justify-center">
													<UButton
														:to="`${apiBaseUrl}/openapi.json`"
														size="lg"
														variant="outline"
														target="_blank"
													>
														OpenAPI JSON
													</UButton>
												</div>
											</template>
										</UCard>
									</div>
								</UContainer>
							</section>
						</template>
					</USlideover>
				</div>
			</div>
		</UContainer>
	</section>
</template>

<style scoped>

</style>
