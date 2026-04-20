import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/shared" as *;\n`,
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
