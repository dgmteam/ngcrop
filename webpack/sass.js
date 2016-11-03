const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (externalStyle) => ({
	module: {
		loaders: [{
			test: /\.scss/,
			loaders: ['css-to-string', 'css?-minimize', 'resolve-url', 'sass?sourceMaps'],
			exclude: externalStyle,
		},
		{
			test: /\.scss/,
			loader: ExtractTextPlugin.extract(['css', 'resolve-url', 'sass?sourceMap']),
			include: externalStyle,
		}, {
			test: /\.css/,
			loader: ExtractTextPlugin.extract(['css', 'resolve-url']),
			include: externalStyle,
		}],
	},

	plugins: [
		new ExtractTextPlugin('[name].css'),
	],
})
