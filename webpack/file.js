const { removeEmpty } = require('./helpers')

module.exports = (env) => ({
	module: {
		loaders: [
		{
			test: /\.json$/,
			loader: 'json',
		}, {
			test: /\.(woff|woff2|ttf|eot|ico)$/,
			loader: env.dev ? 'url?name=assets/[name].[hash].[ext]' :
												'url?limit=50',
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: removeEmpty([
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
				env.prod ? 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' : undefined,
			]),
		}],
	},
})
