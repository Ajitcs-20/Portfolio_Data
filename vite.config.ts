import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Determine base path for GitHub Pages
  // Replace with your actual repository name if using project pages
  const base = process.env.GITHUB_PAGES === 'true' ? '/Portfolio_Data/' : '/';
  
  return {
    base,
    plugins: [react()],
    define: {
      // Polyfill process.env for the app code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    build: {
      outDir: 'dist',
    }
  };
});