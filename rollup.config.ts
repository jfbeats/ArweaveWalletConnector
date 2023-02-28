import ttypescript from 'ttypescript'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { RollupOptions } from 'rollup'



export default async (args: { [key: string]: true | undefined }) => {
	const getParam = (param: string) => { if (!args[param]) { return } else { delete args[param]; return true } }
	const getConfig = async (options: RollupOptions) => {
		const outDir = Array.isArray(options.output) ? options.output[0].dir : options.output?.dir
		const declaration = outDir === 'lib'
		const optionsPluginsAwaited = await options.plugins || []
		const optionsPlugins = Array.isArray(optionsPluginsAwaited) ? optionsPluginsAwaited : [optionsPluginsAwaited]
		return {
			...options,
			plugins: [
				typescript({
					tsconfig: './tsconfig.json',
					typescript: ttypescript,
					outDir,
					declaration,
					include: 'src/**/*',
					exclude: 'rollup.config.ts',
				}),
				resolve(),
				commonjs(),
				...optionsPlugins,
			]
		} as RollupOptions
	}
	const buildArray: (RollupOptions | undefined)[] = [
		getParam('browser') && await getConfig({
			input: 'src/index.ts',
			output: { dir: 'lib', format: 'esm' },
		}),
		getParam('node') && await getConfig({
			input: 'src/node/index.ts',
			output: { dir: 'lib/node', format: 'esm' },
			external: ['ws', 'open'],
		}),
	]
	return buildArray.filter((e): e is NonNullable<typeof e> => !!e)
}
