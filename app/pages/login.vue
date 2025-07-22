<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	email: undefined,
	password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
	const { data, error: fetchError } = await useFetch("/api/auth/login", {
		method: "POST",
		body: state,
	});

	if (fetchError.value) {
		const rawMessage = fetchError.value?.data?.statusMessage;
		let parsedDescription = undefined;

		try {
			const parsed = JSON.parse(rawMessage);
			parsedDescription = parsed.detail || parsed.message || parsed.error || parsed;
		}
		catch {
			parsedDescription = rawMessage || "Login error";
		}

		toast.add({
			title: "Error",
			description: parsedDescription,
			color: "error",
			icon: "i-lucide-flag-triangle-right",
		});
	}
	else {
		await navigateTo("/me");
	}
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<UCard>
			<template #header>
				<h1 class="text-2xl font-bold text-center">
					Login
				</h1>
				<p class="text-center text-gray-500">
					Please enter your credentials
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

			<template #footer>
				<div class="text-center">
					<p>No account?</p>
					<UButton
						label="Register"
						to="/register"
						size="lg"
					/>
				</div>
			</template>
		</UCard>
	</div>
</template>
