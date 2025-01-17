const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        'app': './src/index.js',
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'app'),
        filename: 'app.js'

    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
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
            use: [
               {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: "assets/fonts",
                }
               }
            ],
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

        })

    ]

}
