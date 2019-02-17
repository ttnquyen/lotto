const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let options =
{
    entry: './js/main.js',
    output:
    {
        path: path.resolve(__dirname, 'release'),
        filename: 'main.js',
        publicPath: process.env.NODE_ENV == 'production' ? './' : '/',
    },
    module:
    {
        rules:
        [
            {
                test: /\.(js|jsx)(\?\S*)?$/,
                loader: 'babel-loader',
                query:
                {
                    presets: ['es2015', 'react'],
                }
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
                use:
                [
                    { loader: 'ifdef-loader', options: { PIXI: true, THREE: false }},
                ]
			},
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            },
            {
                test: /\.(vert|frag)$/,
                loader: 'raw-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        compress: true,
        disableHostCheck: true,
    },
    plugins:
    [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
        {
            template: 'index.html',
            inject: 'body',
        }),
    ],
    resolveLoader:
    {
        modules: [path.resolve('./node_modules')],
    },
    resolve:
    {
        modules: [path.resolve('./node_modules')],
    },
}
module.exports = options
