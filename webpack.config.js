const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
  const env = dotenv.config().parsed || { API_URL: process.env.API_URL };

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: './src/index.js',
    mode: process.env.NODE_ENV || 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/dist/',
      filename: 'bundle.js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  };
};
