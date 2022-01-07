const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ProvidePlugin } = require('webpack');
const fg = require("fast-glob");

module.exports = (_env, argv) => {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && 'cheap-module-source-map',
        mode: isDevelopment ? 'development' : 'production',
        entry: fg.sync(['ng/index.js', 'ng/**/*.js']).map(p => `./${p}`).concat(['./src']),
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'assets/js/[name].[contenthash:8].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ title: 'Informer Web Reporting', template: 'index.html', inject: true }),
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
                },
                {
                    test: /.js/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: 'development'
                        }
                    }
                },
                {
                    test: /.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack']
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    loader: require.resolve('file-loader'),
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
};