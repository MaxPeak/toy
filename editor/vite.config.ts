import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        name => ({
          importName: name,
          path: `@/common-components`
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@bc": resolve(__dirname, "src/business-component")
    },
  }
})
