import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: './lib',
      include: ['./src']
    }),
    nodePolyfills()
    // typescript({
    //   target: 'es5',
    //   rootDir: resolve('src/'),
    //   declaration: true,
    //   declarationDir: resolve('lib'),
    //   exclude: resolve('node_modules/**'),
    //   allowSyntheticDefaultImports: true,
    // }),
  ],
  server: {
    port: 8000,
  },
  build: {
    outDir: 'lib',
    cssTarget: 'chrome61',
    lib: {
      entry: resolve('src/index.ts'),
      name: '@b2network/b2-wallet-kit',
      fileName: 'b2-wallet-kit',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'viem', 'wagmi'],
      output: {
        globals: {
          react: 'react',
          viem: 'viem',
          wagmi: 'wagmi',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
