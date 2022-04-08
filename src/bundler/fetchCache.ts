import esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

export const fetchCache = (inputCode: string) => {
	return {
		name: 'fetchCache',
		setup: (build: esbuild.PluginBuild) => {
			build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
				return {
					loader: 'jsx',
					contents: inputCode,
				}
			})

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const cachedResult = await localForage.getItem<esbuild.OnLoadResult>(
					args.path
				)

				if (cachedResult) {
					return cachedResult
				}
			})

			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)
				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'")

				const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `
				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				}

				await localForage.setItem(args.path, result)

				return result
			})

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				}

				await localForage.setItem(args.path, result)

				return result
			})
		},
	}
}
