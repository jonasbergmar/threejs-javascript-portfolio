import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

// vite.config.js
export default defineConfig({
  plugins: [glsl()],
  server: {
    host: "localhost",
    cors: "*",
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      input: "./src/main.js",
      output: {
        format: "iife", // IIFE format for Webflow compatibility
        name: "ThreeJSScene",
        entryFileNames: "main.js",
        inlineDynamicImports: true,
      },
    },
    outDir: "dist",
    cssCodeSplit: false,
  },
});
