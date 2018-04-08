"use strict";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const {ContextReplacementPlugin} = require("webpack");


let plugins = [
  new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.resolve(__dirname, "./src")),
  new CopyWebpackPlugin([
    {from: "./src/assets/css", to: "css"},
    {from: "./src/assets/fonts", to: "fonts"},
    {from: "./src/assets/img", to: "img"},
    {from: "./src/assets/js", to: "js"}
  ]),
  new ExtractTextPlugin("styles.css"),
  new HtmlWebpackPlugin({
    template: "./src/assets/index.html"
  })
];

if (process.env.NODE_ENV !== "production") {
  plugins.push(
    new LiveReloadPlugin({appendScriptTag: true})
  );
}

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: path.resolve(__dirname, "./src/app/main.ts"),
  output: {
    path: path.resolve(__dirname, "./dist/app/"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/app/"),
    port: 8082
  },
  resolve: {
    alias: {
      "package": path.resolve(__dirname, "./src/package")
    },
    extensions: [".html", ".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.html/,
        loader: "raw-loader"
      },
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  plugins: plugins
};
