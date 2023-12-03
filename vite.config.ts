/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption, defineConfig } from 'vite'
import moduleList from 'vite-plugin-module-list'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const files = readdirSync('./plugin')

const filesObject: Record<string, string> = {}
for (const file of files) {
	if (file !== 'index.ts') filesObject[`plugin/${file}`] = `./plugin/${file}`
}
export default defineConfig(({ mode }) => ({
	test: {
		css: false,
		globals: true,
		environment: 'jsdom',
		clearMocks: true,
		coverage: {
			provider: 'istanbul',
			enabled: true,
			'100': true,
			reporter: ['text', 'lcov'],
			reportsDirectory: 'coverage'
		}
	},
	build: {
		rollupOptions: {
			input: {
				a: 'index.html',
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
		moduleList({
			rootPath: resolve('plugin'),
			outputPath: resolve('src/plugin/preset.ts'),
			includeExtensions: ['ts'],
			mode: {
				language: 'ts',
				dynamic: true
			}
		}),
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
