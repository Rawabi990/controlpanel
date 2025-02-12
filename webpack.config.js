const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        'app':    './src/index.js',
        'assets/js/banner': './src/assets/js/banner.js',
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'app'),
        filename: '[name].js',

    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },

          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
    
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              'postcss-loader',
              "sass-loader"
            ],

          },
          {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            exclude: /images/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name].[ext]',
            },
          },
        ]
    },
    
    devServer: {
        static: { directory: path.join(__dirname, './app') },
        compress: true,
        open: true,
        port: 9000,
        devMiddleware: {
            writeToDisk: true,
        },
      },

    plugins: [
        new OptimizeCSSAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: "assets/css/style.css"
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['app']
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'components/button.html',
            template: './src/components/button.html',
            chunks: ['app']
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'components/textfield.html',
            template: './src/components/textfield.html',
            chunks: ['app']
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'components/card.html',
            template: './src/components/card.html',
            chunks: ['app']
        }),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'components/banner.html',
            template: './src/components/banner.html',
            chunks: ['app', 'assets/js/banner']
        })

    ]

}
