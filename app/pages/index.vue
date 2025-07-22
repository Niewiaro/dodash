<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const items = ref<AccordionItem[]>([
	{
		label: "Creating To-Dos",
		icon: "i-lucide-list-plus",
		content: "Create tasks with deadlines, priorities, and statuses using a simple and powerful API.",
	},
	{
		label: "Exploring API Capabilities",
		icon: "i-lucide-terminal",
		content: "Discover full API documentation, test endpoints live, and generate clients with OpenAPI.",
	},
	{
		label: "Managing Your Tasks",
		icon: "i-lucide-settings",
		content: "Update, complete, or delete tasks securely with flexible endpoints and access control.",
	},
]);
</script>

<template>
	<main>
		<section
			id="intro"
		>
			<UContainer>
				<div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
					<div class="flex-1 order-1 text-center lg:text-left">
						<h1>
							<div class="text-5xl font-bold">
								DoDash
							</div>
							<div class="text-2xl text-gray-500 mt-2">
								Your tasks. Your Dashboard.
							</div>
						</h1>

						<p class="text-gray-500 text-lg mt-4">
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
								size="lg"
								class="mt-4"
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
					<div class="flex-1 order-2">
						<NuxtImg
							src="/connection.jpg"
							alt="Cool, isn't it? This is particles."
							sizes="xs:100vw, sm:667px"
							format="webp"
						/>
					</div>
				</div>
			</UContainer>
		</section>

		<section
			id="More"
		>
			<UContainer>
				<h1 class="text-center pt-20">
					<div class="text-5xl font-bold">
						More About DoDash
					</div>
					<div class="text-2xl text-gray-500 mt-2">
						See how DoDash can support your development workflow and productivity.
					</div>
				</h1>
				<div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
					<div class="flex-1 order-2 lg:order-1">
						<NuxtImg
							src="/more.jpg"
							alt="more"
							sizes="xs:100vw, sm:667px"
							format="webp"
						/>
					</div>
					<div class="flex-1 order-1 lg:order-2">
						<UAccordion :items="items" />
					</div>
				</div>
			</UContainer>
		</section>
	</main>
</template>

<style scoped>

</style>
