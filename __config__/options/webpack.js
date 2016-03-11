import path from 'path';
import uglify from './uglify';
import webpack from 'webpack';
import {envar} from '../environ';

module.exports = {
	devtool: envar('development', 'source-maps'),
	plugins: [
		envar('development', function(){}, new webpack.optimize.UglifyJsPlugin(uglify)),
		new webpack.ProvidePlugin({
			jQuery: 'jquery'
		})
	],
	resolve: {
		root: [path.join(__dirname, 'node_modules')],
	},
	output: {
		filename: '[name].js',
		sourceMapFilename: '[name].map'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			{ test: /\.json$/, exclude: /node_modules/, loader: "json-loader" }
		]
	}
};