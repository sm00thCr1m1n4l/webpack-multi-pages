const path = require('path');
const pathConfig = require('./pathConfig');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const getDistPath = require('./utils').getDistPath;
module.exports = [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname,'../src')],
        options: {
            presets: ['latest']
        }
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    minimize: true,
                    sourceMap: process.env.NODE_ENV === "development"
                }
            }],

        })
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/[name].[hash].[ext]',
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/[name].[hash].[ext]'
        }
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [{
                loader: "css-loader", options: {
                    minimize: true,
                    sourceMap: process.env.NODE_ENV === "development"
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: process.env.NODE_ENV === "development"
                }
            }, {
                loader: 'postcss-loader'
            }
            ]
        })
    },
    {
        test: /\.ejs$/,
        use: [
            {
                loader: 'ejs-loader',
                query: {
                    variable: 'data',
                    interpolate: '\\{\\%(.+?)\\%\\}',
                    evaluate: '\\[\\[(.+?)\\]\\]'
                }
            },

        ]
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            sourceMap: process.env.NODE_ENV === "development",
            extract: process.env.NODE_ENV !== "development",
            transformToRequire: {
                video: 'src',
                source: 'src',
                img: 'src',
                image: 'xlink:href'
            }
        }
    },
    // {
    //     test: /\.ejs$/,
    //     loader: 'ejs-html-loader',
    //     options: {
    //         title: 'The Ant: An Introduction',
    //         production: process.env.ENV === 'production'
    //     }
    // }
]