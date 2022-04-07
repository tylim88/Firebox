import esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

export const fetchCache = (inputCode: string) => {
	return {
		name: 'fetchCache',
		setup(build: esbuild.PluginBuild) {
			build.onLoad(
				{ filter: /(^index\.js$)/, namespace: 'a' },
				async (args: any) => {
					return {
						loader: 'jsx',
						contents: inputCode,
					}
				}
			)

			build.onLoad({ filter: /.*/, namespace: 'a' }, async (args: any) => {
				const cachedResult = await localForage.getItem<esbuild.OnLoadResult>(
					args.path
				)

				if (cachedResult) {
					return cachedResult
				} else {
					const { data } = await axios.get(args.path)

					const result: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents: data,
					}

					await localForage.setItem(args.path, result)

					return result
				}
			})
		},
	}
}
