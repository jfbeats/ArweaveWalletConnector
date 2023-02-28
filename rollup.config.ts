import typescript, { RollupTypescriptOptions } from '@rollup/plugin-typescript'
import ttypescript from 'ttypescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { RollupOptions } from 'rollup'



export default (args: { [key: string]: true | undefined }) => {
	
	const getParam = (param: string) => {
		if (!args[param]) { return }
		delete args[param]
		return true
	}
	
	const getConfig = (options: RollupOptions) => {
		const out = Array.isArray(options.output) ? options.output[0].dir : options.output?.dir
		
		return {
			...options,
			plugins: [
				typescript({
					tsconfig: './tsconfig.json',
					typescript: ttypescript,
					declaration: out === 'lib',
					outDir: out,
					declarationDir: out,
					exclude: 'rollup.config.ts',
				}),
				resolve(),
				commonjs(),
			],
		} as RollupOptions
	}
	
	const buildOptions: (RollupOptions | undefined)[] = [
		getParam('browser') && getConfig({ input: 'src/index.ts', output: { dir: 'lib', format: 'esm' } }),
		getParam('node') && getConfig({ input: 'src/node/index.ts', output: { dir: 'lib/node', format: 'esm' } }),
	]
	
	return buildOptions.filter((e): e is NonNullable<typeof e> => !!e)
}
