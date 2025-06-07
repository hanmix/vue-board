import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/abstracts/variables" as *;
          @use "@/styles/abstracts/mixins" as *;
        `,
      },
    },
  },
});
