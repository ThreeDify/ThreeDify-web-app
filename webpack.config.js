const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed || { "API_URL": process.env.API_URL };

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.js",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
      publicPath: "http://localhost:3000/dist/",
      hotOnly: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
