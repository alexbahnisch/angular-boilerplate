"use strict";
const fs = require("fs");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const {ContextReplacementPlugin} = require("webpack");


let packageJson = JSON.parse(fs.readFileSync("./package.json"));
let name = `${packageJson.name}-${packageJson.version}${process.env.MIN ? ".min" : ""}`;
let plugins = [
  new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.resolve(__dirname, "./src")),
  new ExtractTextPlugin(`${name}.css`)
];

if (process.env.MIN) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
} else {
  plugins.push(new ExtractTextPlugin("styles.css"))
}

module.exports = {
  entry: path.resolve(__dirname, `./src/package/index.ts`),
  output: {
    path: path.resolve(__dirname, "./dist/package/"),
    filename: `zzz.js`
  },
  devtool: process.env.MIN ? "source-map" : undefined,
  resolve: {
    extensions: [".html", ".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.html/,
        loader: "raw-loader"
      }
    ]
  },
  plugins: plugins
};
