<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

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
async function onSubmit(event: FormSubmitEvent<Schema>) {
	const { data, error: fetchError } = await useFetch("/api/auth/register", {
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
		await navigateTo("/login");
	}
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<UCard>
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
