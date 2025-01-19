import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	base: "",
	plugins: [react()],
	root: "src",
	publicDir: "../public",
	build: {
		rollupOptions: {
			input: {
				main: "./src/index.html", // Point d'entrée principal
				remove_bg: "./src/remove_bg/index.html", // Point d'entrée secondaire
			},
		},
		assetsDir: "assets",
		outDir: "../dist", // Dossier de sortie
		emptyOutDir: true, // Vide le dossier de sortie avant de construire
	},
	server: {
		fs: {
			allow: ["."], // Permet d'accéder au sous-projet remove_bg
		},
	},
	resolve: {
		alias: {
			remove_bg: resolve(__dirname, "remove_bg"), // Alias pour le sous-projet remove_bg
		},
	},
});
