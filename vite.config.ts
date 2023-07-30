import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import webfontDownload from 'vite-plugin-webfont-dl'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/jcr-website/",
  plugins: [
    {enforce: 'pre', ...mdx({jsxImportSource:"react"})},
    react(),
    viteCompression(),
    visualizer() as PluginOption,
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Alegreya&family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Bitter:ital@0;1&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap',
    ]),
  ],
})
