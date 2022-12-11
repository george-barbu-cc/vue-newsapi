import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "spa-vue-newsapi",
  plugins: [vue()],
  server: {
    watch: {
      usePolling: true,
    },
    port: 3001,
    strictPort: true,
    hot: true,
  },
  preview: {
    port: 5000,
  },

  resolve: {
    /**
     * This is where you define your path shortcuts.
     * Basically, you can abreviate your paths by defining an alias.
     */
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "index.css") return "assets/style.css";
          return `assets/[name].[ext]`;
        },
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
      },
    },
  },
});
