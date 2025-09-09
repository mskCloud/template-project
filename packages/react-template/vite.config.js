import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), UnoCSS()],
    server: {
        host: true,
        port: 8866,
        proxy: {
            '/api': {
                target: '',
                changeOrigin: true,
                rewrite: (path) => path,
            },
        },
    },
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
        rollupOptions: {},
    },
})
