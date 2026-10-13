import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';

export default defineConfig(({ mode }) => {
  const { VITE_REMOTE_URL = 'http://localhost:3001' } = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      federation({
        name: 'host_app',
        dts: false,
        remotes: {
          remote_app: {
            type: 'module',
            name: 'remote_app',
            entry: `${VITE_REMOTE_URL}/remoteEntry.js`,
          },
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      }),
    ],
    build: { target: 'esnext' },
  };
});
