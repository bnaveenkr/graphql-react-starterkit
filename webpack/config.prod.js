const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const discardComments = require('postcss-discard-comments');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const srcPath = path.resolve(__dirname, '../src', 'client');
const nodeModulesPath = path.join(__dirname, '../node_modules');
const commonModulesPath = path.resolve(__dirname, '../src', 'common');
const buildPath = path.resolve(__dirname, '../dist');

const isomorphicConfig = require('./webpack-isomorphic-tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig);


module.exports = {
    bail: true,
    devtool: 'source-map',
    mode: 'production',
    context: path.resolve(__dirname, '..'),
    entry: [
        path.resolve(srcPath, 'index'),
        path.resolve(commonModulesPath, 'fonts/fonts.scss'),
    ],
    output: {
        path: buildPath,
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        publicPath: '/static/',
    },
    resolve: {
        extensions: ['.js', '.css', '.scss'],
        modules: [nodeModulesPath, commonModulesPath],
    },
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            include: [srcPath, commonModulesPath],
        }, {
            test: /\.js$/,
            include: [srcPath, commonModulesPath],
            exclude: nodeModulesPath,
            use: ['babel-loader'],
        }, {
            test: /\.css$/,
            include: [srcPath, commonModulesPath, nodeModulesPath],
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.scss$/,
            include: [srcPath, commonModulesPath, nodeModulesPath],
            use: [{
                loader: MiniCssExtractPlugin.loader,
            },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        sourceMap: false,
                        minimize: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({ browsers: ['last 2 versions'] }),
                            discardComments({ removeAll: true }),
                        ],
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
                        outputStyle: 'expanded',
                        // sourceMapContents: true,
                        includePaths: [path.resolve(commonModulesPath, 'styles')],
                        data: '@import "' + path.resolve(commonModulesPath, 'styles/theme.scss') + '";',
                    },
                }],
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                },
            }],
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                },
            }],
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                },
            }],
        }, {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                },
            }],
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: ['file-loader'],
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml',
                    includePaths: [path.resolve(commonModulesPath, 'media')],
                },
            }],
        }, {
            test: /\.json$/,
            include: commonModulesPath,
            use: [{
                loader: 'json-loader',
            }],
        }, {
            test: /\.(graphql|gql)$/,
            exclude: nodeModulesPath,
            loader: 'graphql-tag/loader',
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    includePaths: [path.resolve(commonModulesPath, 'media')],
                },
            }],
        }],
    },
    plugins: [
        new CleanPlugin(
            [buildPath, 'webpack-assets.json', 'webpack-stats.json'],
            { root: path.resolve(__dirname, '..') }
        ),
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: '"production"',
                },
            },
        }),
        new UglifyJsPlugin({
            uglifyOptions:{
                compress: {
                    warnings: false,
                },
                mangle: false,
                ie8: false,
                output: {
                    comments: false,
                }
            }
        }),
        new MiniCssExtractPlugin(),
        webpackIsomorphicToolsPlugin,
    ],
};
