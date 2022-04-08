import esbuild from 'esbuild-wasm'
import pkg from 'esbuild-wasm/package.json'
import { fetchCache } from './fetchCache'
import { resolvePath } from './resolvePath'

export const initialize = async () => {
	await esbuild
		.initialize({
			wasmURL: `https://www.unpkg.com/esbuild-wasm@${pkg.version}/esbuild.wasm`,
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
