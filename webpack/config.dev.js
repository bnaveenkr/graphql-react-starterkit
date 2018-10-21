require('@babel/polyfill');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const buildPath = path.resolve(__dirname, '../dist');
const srcPath = path.resolve(__dirname, '../src', 'client');
const nodeModulesPath = path.join(__dirname, '../node_modules');
const commonModulesPath = path.resolve(__dirname, '../src', 'common');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
    require('./webpack-isomorphic-tools')); // eslint-disable-line global-require

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins || []);

const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    mode: 'development',
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3000/',
            path.join(commonModulesPath, 'fonts', 'fonts.scss'),
            path.join(srcPath, 'index'),
        ],
    },
    output: {
        path: buildPath,
        filename: '[name].[hash].js',
        publicPath: 'http://localhost:3000/',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.scss'],
        modules: [nodeModulesPath, commonModulesPath],
    },
    resolveLoader: {
        modules: [nodeModulesPath],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: nodeModulesPath,
            include: [srcPath, commonModulesPath],
            use: [{
                loader: 'babel-loader',
                options: babelLoaderQuery,
            }, {
                loader: 'eslint-loader',
            }],
        }, {
            test: /\.css$/,
            include: [srcPath, commonModulesPath, nodeModulesPath],
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.scss$/,
            include: [srcPath, commonModulesPath, nodeModulesPath],
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                },
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: [
                        autoprefixer({ browsers: ['last 2 versions'] }),
                    ],
                },
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded',
                    sourceMapContents: true,
                    includePaths: [path.resolve(commonModulesPath, 'styles')],
                    data: '@import "' + path.resolve(commonModulesPath, 'styles/theme.scss') + '";',
                },
            }],
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'application/font-woff',
            },
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'application/font-woff',
            },
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'application/octet-stream',
            },
        }, {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'application/octet-stream',
            },
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'image/svg+xml',
                includePaths: [path.resolve(commonModulesPath, 'media')],

            },
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.(graphql|gql)$/,
            exclude: nodeModulesPath,
            loader: 'graphql-tag/loader',
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('images'),
            loader: 'url-loader',
            options: {
                limit: 10240,
                includePaths: [path.resolve(commonModulesPath, 'media')],
            },
        }],
    },
    plugins: [
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: '"development"',
                },
            },
        }),
        webpackIsomorphicToolsPlugin.development(),
    ],
    devServer: {
        hot: true,
        publicPath: 'http://localhost:3000/',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};
