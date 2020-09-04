const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	devtool: 'sourcemap',
	stats: 'errors-only',
	entry: {
		'app': './src/app'
	},
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: 'js/[name].js'
	},
	plugins: [
		new SizePlugin(),
		new CopyWebpackPlugin([
			{
				from: './src',
				ignore: ['*.js']
			},
			{
				from: './public'
			}
		])
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: false,
					compress: true,
					output: {
						beautify: false,
						indent_level: 0
					}
				}
			})
		]
	},

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					'raw-loader'
				]
			}
		]
	}
};
