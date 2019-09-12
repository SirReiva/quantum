const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const MinifyPlugin = require("babel-minify-webpack-plugin");
//const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        chunkFilename: '[name].bundle.js',
        filename: 'bundle.js',
        path: __dirname + '/www'
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: ["html-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new CopyPlugin([
            { from: './src/static/*', to: 'static', flatten: true },
        ]),
        /*new MinifyPlugin(),*/
    ],
    /*optimization: {
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        })],
    },*/
}