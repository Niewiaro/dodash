// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
		"@nuxt/ui",
		"@nuxtjs/google-fonts",
		"@compodium/nuxt",
	],
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	ui: {
		fonts: false,
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL || "http://localhost:8000",
		},
	},
	compatibilityDate: "2025-07-15",
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
	googleFonts: {
		families: {
			Roboto: true,
		},
	},
});
