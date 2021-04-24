const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/pages/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }, module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.html$/i,
                loader: 'html-loader',
            }, {
                test: /\.(s*)css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                    'sass-loader',
                    'postcss-loader',
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader?name=./images/[name].[ext]' // сюда складывать изображения
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]' // сюда  складывать шрифты
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }), new MiniCssExtractPlugin()
    ]
};