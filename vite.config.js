import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: '/math-hide-and-seek/',
    server: {
        port: 5173,
        host: true
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts'
    }
});
