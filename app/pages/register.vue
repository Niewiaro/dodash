<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
	middleware: "guest",
});

const schema = z.object({
	email: z.string().email("Invalid email"),
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	email: undefined,
	first_name: undefined,
	last_name: undefined,
	password: undefined,
});

const toast = useToast();
const { login } = useAuth();

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		await $fetch("/api/auth/register", {
			method: "POST",
			body: state,
		});

		await login(state.email!, state.password!);

		await navigateTo("/me");
	}
	catch (error: any) {
		let parsedDescription: string | undefined;

		try {
			const raw = typeof error?.statusMessage === "string" ? error.statusMessage : "Registration failed";
			const parsed = JSON.parse(raw);
			parsedDescription = parsed.detail || parsed.message || parsed.error || parsed;
		}
		catch {
			parsedDescription = "Registration failed";
		}

		toast.add({
			title: "Error",
			description: parsedDescription,
			color: "error",
			icon: "i-lucide-alert-triangle",
		});
	}
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<UCard>
			<template #header>
				<h1 class="text-2xl font-bold text-center">
					Register
				</h1>
				<p class="text-center text-gray-500">
					Please enter your details
				</p>
			</template>

			<UForm
				:schema="schema"
				:state="state"
				class="p-10 space-y-4"
				@submit="onSubmit"
			>
				<UFormField
					label="Email"
					name="email"
					size="lg"
				>
					<UInput v-model="state.email" />
				</UFormField>

				<UFormField
					label="First name"
					name="first_name"
					size="lg"
				>
					<UInput
						v-model="state.first_name"
						type="first_name"
					/>
				</UFormField>

				<UFormField
					label="Last name"
					name="last_name"
					size="lg"
				>
					<UInput
						v-model="state.last_name"
						type="last_name"
					/>
				</UFormField>

				<UFormField
					label="Password"
					name="password"
					size="lg"
				>
					<UInput
						v-model="state.password"
						type="password"
					/>
				</UFormField>

				<UButton
					type="submit"
					size="lg"
				>
					Submit
				</UButton>
			</UForm>
		</UCard>
	</div>
</template>
