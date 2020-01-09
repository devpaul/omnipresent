import { resolve } from 'path';

const config: import('webpack').Configuration = {
	mode: 'production',
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	output: {
		path: resolve(__dirname, 'output')
	},
	optimization: {
		splitChunks: false
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: 'raw-loader'
			},
			{
				test: /present-core/,
				use: { loader: 'umd-compat-loader' }
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	}
};

export default config;
