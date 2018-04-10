"use strict";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const webpack = require("webpack");


// noinspection JSUnresolvedFunction
let plugins = [
  new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.resolve(__dirname, "../src")),
  new CopyWebpackPlugin([
    {from: "../src/assets/css", to: "css"},
    {from: "../src/assets/fonts", to: "fonts"},
    {from: "../src/assets/img", to: "img"},
    {from: "../src/assets/js", to: "js"}
  ]),
  new ExtractTextPlugin("styles.css"),
  new HtmlWebpackPlugin({
    template: "../src/assets/index.html"
  })
];

if (process.env.NODE_ENV !== "production") {
  plugins.push(
    new LiveReloadPlugin({appendScriptTag: true})
  );
}

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    "polyfills": path.resolve(__dirname, "../src/app/polyfills.ts"),
    "vendor": path.resolve(__dirname, "../src/app/vendor.ts"),
    "app": path.resolve(__dirname, "../src/app/main.ts"),
  },
  output: {
    path: path.resolve(__dirname, "../dist/app/"),
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/app/"),
    port: 8082
  },
  resolve: {
    alias: {
      "package": path.resolve(__dirname, "../src/package")
    },
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          "awesome-typescript-loader",
          "angular2-template-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      }
    ]
  },
  plugins: plugins
};
