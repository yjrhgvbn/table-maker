/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption, defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const files = readdirSync('./plugin')

const filesObject: Record<string, string> = {}
for (const file of files) {
	if (file !== 'index.ts') filesObject[`plugin/${file}`] = `./plugin/${file}`
}
export default defineConfig(({ mode }) => ({
	build: {
		rollupOptions: {
			input: {
				index: 'index.html',
				...filesObject
			},
			output: {
				manualChunks: {
					react: ['react', 'react-dom', 'react-router-dom'],
					material: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers']
				}
			}
		}
	},
	plugins: [
		tsconfigPaths(),
		react(),
		...(mode === 'test'
			? []
			: [
					eslintPlugin(),
					VitePWA({
						registerType: 'autoUpdate',
						includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png', 'icons/*.svg'],
						manifest: {
							theme_color: '#BD34FE',
							icons: [
								{
									src: '/android-chrome-192x192.png',
									sizes: '192x192',
									type: 'image/png',
									purpose: 'any maskable'
								},
								{
									src: '/android-chrome-512x512.png',
									sizes: '512x512',
									type: 'image/png'
								}
							]
						}
					}),
					visualizer({
						template: 'treemap',
						open: false,
						gzipSize: true,
						filename: 'analyse.html'
					}) as PluginOption
			  ])
	]
}))
