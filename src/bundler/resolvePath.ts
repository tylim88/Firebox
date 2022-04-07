import esbuild from 'esbuild-wasm'

export const resolvePath = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//handle root entry file
			build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
				return { path: 'index.js', namespace: 'a' } // use namespace other than file https://esbuild.github.io/plugins/#namespaces
			})
			// handle main file
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				}
			})
		},
	}
}
