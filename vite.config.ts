import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"), // Point d'entrée principal
			},
		},
	},
	server: {
		fs: {
			allow: ["."], // Permet d'accéder au sous-projet remove_bg
		},
	},
});
