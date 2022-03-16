const path = require( 'path' );
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    context: __dirname,
    entry: './src/main.ts',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
				resolve: {
					extensions: [".js", ".jsx"]
				},
            },
			{
				test: /\.(ts|tsx)?$/,
				exclude: /node_modules/,
				use: "ts-loader",
				resolve: {
					extensions: [".ts", ".tsx"]
				},
			}
        ]
    },
	plugins: [
		new NodePolyfillPlugin()
	],
	resolve: {
		fallback: {
			"fs": false,
			"net": false
		}
	}
};