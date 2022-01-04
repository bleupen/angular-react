const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { ProvidePlugin } = require('webpack');
const fg = require("fast-glob");

module.exports = {
    mode: 'development',
    entry: ['./src'].concat(fg.sync(['ng/index.js', 'ng/**/*.js']).map(p => `./${p}`)),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Informer Web Reporting', template: 'index.html' }),
        new CopyPlugin({
            patterns: [
                { from: "lib", to: "lib" },
            ],
        }),
        new ProvidePlugin({
            'window.jQuery': 'jquery',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'ng'),
                use: [
                    {
                        loader: 'angularjs-template-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, 'ng')
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'ng'),
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: 'development'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};