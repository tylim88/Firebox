import * as esbuild from 'esbuild-wasm'
import { fetchCache } from './fetchCache'
import { resolvePath } from './resolvePath'

export const initialize = async () => {
	await esbuild
		.initialize({
			wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.14.30/esbuild.wasm', // use same version as your esbuild-wasm dependency
			worker: true,
		})
		.catch()
}

export const bundle = async (code: string) => {
	return esbuild.build({
		entryPoints: ['index.js'],
		bundle: true,
		write: false,
		plugins: [fetchCache(code), resolvePath()],
		minify: true,
	})
}
