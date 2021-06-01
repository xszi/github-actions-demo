import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],

    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
    },

    server: {
        port: 7000,
        open: true,
        host: 'localhost',
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },

    build: {
        outDir: 'build'
    }
})
