const { ForkCheckerPlugin } = require('awesome-typescript-loader')

module.exports = () => ({
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: ['awesome-typescript', 'angular2-template'],
			exclude: /node_modules/,
		}],
	},
	plugins: [
		new ForkCheckerPlugin(),
	],
})
