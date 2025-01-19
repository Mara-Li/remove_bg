import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"), // Point d'entrée principal
				remove_bg: resolve(__dirname, "src", "remove_bg/index.html"), // Point d'entrée secondaire
			},
		},
	},
	server: {
		fs: {
			allow: ["."], // Permet d'accéder au sous-projet remove_bg
		},
	},
});
