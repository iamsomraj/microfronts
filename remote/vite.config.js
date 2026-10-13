import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    // The Vue host has no React Fast Refresh runtime, so skip it for exposed components.
    react({ exclude: [/node_modules/, /src\/components\//] }),
    federation({
      name: 'remote_app',
      dts: false,
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header.jsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: { origin: 'http://localhost:3001' },
  build: { target: 'esnext' },
});
