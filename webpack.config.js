let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let webpack = require('webpack');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          //exclude: '/node_modules/'
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        },
        {
          test: /\.css$/,
        
            use: [
                  'style-loader',
                  'css-loader'
                ]
            
          }
        
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css"),
      new HtmlWebpackPlugin({
        title: 'My Beets App',
        template: './index.html'
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
};

module.exports = (env, options) => {
  let production = options.mode === 'production';

  conf.devtool = production ? false : 'eval-sourcemap';
  return conf;
} 