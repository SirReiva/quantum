const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const figlet = require('figlet');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    stats: {
        errors: true
    },
    mode: isProd ? 'production' : 'development',
    optimization: {
        usedExports: true,
    },
    entry: './src/index.tsx',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.(ts|js)x?$/,
                loader: 'templates-url-webpack',
                exclude: /node_modules/,
                include: [resolve(__dirname, 'src')]
            }, {
                test: /\.(ts|js)x$/,
                loader: 'style-url-webpack-as-string',
                exclude: /node_modules/,
                include: [resolve(__dirname, 'src')]
            }, {
                test: /\.s?css$/,
                use: [
                    /*{
                        loader: MiniCssExtractPlugin.loader
                    },*/
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ],
                exclude: /node_modules/
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: ["html-loader"]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Quantum App',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new CopyPlugin([
            { from: './src/static/*', to: 'static', flatten: true },
        ]),
        new CleanWebpackPlugin()
    ],
};

if (isProd) {
    config.optimization = {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
        ],
    };
    /*config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true,
    }));*/
    figlet('Quantum\n Project', function(err, data) {
        console.clear();
        if (data) console.log(data);
    });
} else {
    config.plugins.push(new EventHooksPlugin({
        beforeCompile: () => {
            figlet('Quantum\n Project', function(err, data) {
                console.clear();
                if (data) console.log(data);
            });
        }
    }));
    config.devtool = 'source-map'
    config.devServer = {
        port: 8080,
        compress: true,
        overlay: true
    };
}

module.exports = config;