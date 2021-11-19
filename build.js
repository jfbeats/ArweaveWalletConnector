import { build } from 'esbuild'
import rimraf from 'rimraf'

const clean = async () => {
	return new Promise(resolve => {
		rimraf('./dist', () => resolve())
	})
}

export const runBuild = async (doClean = false) => {
	if (doClean) await clean()

	build({
		entryPoints: ['./src/index.ts'],
		minify: false,
		bundle: true,
		platform: 'browser',
		target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
		outfile: './dist/index.js',
		sourcemap: true
	}).catch((e) => {
		console.log(e)
		process.exit(1)
	})

	build({
		entryPoints: ['./src/index.ts'],
		minify: true,
		bundle: true,
		platform: 'browser',
		target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
		outfile: './dist/index.min.js',
		sourcemap: true
	}).catch((e) => {
		console.log(e)
		process.exit(1)
	})
}
runBuild(true)