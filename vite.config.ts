import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'
function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: './lib',
      include: ['./packages']
    })
    // typescript({
    //   target: 'es5',
    //   rootDir: resolve('packages/'),
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
    // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
    cssTarget: 'chrome61',
    lib: {
      entry: resolve('packages/index.ts'),
      name: 'b2-wallet-kit',
      fileName: 'b2-wallet-kit',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom','viem','wagmi'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'react',
          viem: 'viem',
          wagmi:'wagmi',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
