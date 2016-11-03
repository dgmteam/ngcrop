const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLWebpackTemplate = require('html-webpack-plugin')
const root = require('./webpack/helpers').root(__dirname)
const devServer = require('./webpack/dev-server')
const typescript = require('./webpack/typescript')
const pug = require('./webpack/pug')
const sass = require('./webpack/sass')
const production = require('./webpack/production')

const DEV_PORT = 3000

module.exports = (env = {}) => {
	const context = root('./example')
	const entry = {
		example: './index.ts',
	}

	const output = {
		filename: '[name].js',
		chunkFilename: '[id].part.js',
		path: root('./build'),
		pathinfo: !env.prod, // should include path name comment for every import
	}

	const resolve = {
		extensions: ['.ts', '.js', '.json'],
	}

	const plugins = [
		new HTMLWebpackTemplate({
			template: 'index.html',
		}),

		/**
		 * get rid of critical import warning
		 * from https://github.com/angular/angular/issues/11580
		 */
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			root('./src') // location of your src
		),
	]

	const config = merge(
		{
			context,
			resolve,
			entry,
			output,
			plugins,
			devtool: 'source-map',
		},
		devServer(DEV_PORT),
		typescript(),
		pug(root('src/app')),
		sass(root('src/app/styles')),
		production(env)
	)

	return config
}
