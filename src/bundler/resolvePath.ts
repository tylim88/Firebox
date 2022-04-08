import esbuild from 'esbuild-wasm'

export const resolvePath = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//handle root entry file
			build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
				return { path: 'index.js', namespace: 'a' } // use namespace other than file https://esbuild.github.io/plugins/#namespaces
			})
			// handle rel paths in module :  includes ./ || ../
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				console.log(1, { args })
				const url = new URL(args.path, `https://unpkg.com${args.resolveDir}/`)

				return {
					path: url.href,
					namespace: 'a',
				}
			})
			// handle main file
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				console.log(2, { args })
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				}
			})
		},
	}
}
