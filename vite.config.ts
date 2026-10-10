import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.TELEGRAM_BOT_TOKEN': JSON.stringify(env.TELEGRAM_BOT_TOKEN || ''),
      'import.meta.env.TELEGRAM_CHAT_ID': JSON.stringify(env.TELEGRAM_CHAT_ID || ''),
      'import.meta.env.TELEGRAM_GROUP_URL': JSON.stringify(env.TELEGRAM_GROUP_URL || ''),
      'import.meta.env.TELEGRAM_BOT_USERNAME': JSON.stringify(env.TELEGRAM_BOT_USERNAME || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});