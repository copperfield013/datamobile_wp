var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode    : "production",
    entry: {
        "main"      : path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        inline: true,
        port: 3000,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};