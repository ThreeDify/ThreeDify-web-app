const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
  const env = dotenv.config().parsed || { API_URL: process.env.API_URL };

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  const isDevMode = process.env.NODE_ENV !== 'production';

  return {
    target: 'web',
    entry: ['./src/index.js', './src/Themes/App.scss'],
    mode: process.env.NODE_ENV || 'development',
    devServer: {
      publicPath: '/dist/',
      port: process.env.PORT,
      historyApiFallback: true,
      contentBase: ['./', './public'],
    },
    devtool: isDevMode ? 'source-map' : '',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: require('./babel.config.json'),
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevMode,
              },
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: require('sass'),
                sassOptions: {
                  includePaths: ['./node_modules'],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/dist/',
      filename: `[name].bundle${!isDevMode ? '.[hash]' : ''}.js`,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.s?css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name].bundle${!isDevMode ? '.[hash]' : ''}.css`,
      }),
      new HtmlWebpackPlugin({
        inject: false,
        title: 'ThreeDify',
        scriptLoading: 'defer',
        filename: path.join(__dirname, 'public', 'index.html'),
        template: path.join(__dirname, 'src', 'index.html'),
      }),
    ],
  };
};
