const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
	output: {
		path: path.resolve(__dirname + '/dist/'),
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: __dirname,
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.css$/,
				loader: 'style!less!css'
			}
		]
	},
	optimization: {
		minimize : true,
		sourceMap : false,
		mangle: true,
		compress: {
			warnings: false
		}
	}
};


module.exports = [
	merge(config, {
		entry: path.resolve(__dirname + '/src/plugin.js'),
		output: {
			filename: 'cheetah-form.min.js',
			libraryTarget: 'window',
			library: 'CheetahForm',
		}
	}),
	merge(config, {
		entry: path.resolve(__dirname + '/src/formGenerator.vue'),
		output: {
			filename: 'cheetah-form.js',
			libraryTarget: 'umd',
			library: 'cheetah-form',
			umdNamedDefine: true
		}
	})
];
