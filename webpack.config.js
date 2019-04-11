"use strict";
var webpack = require("webpack");
var ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
module.exports = env => {
  return {
    entry: {
      app: "./index.js"
    },
    output: {
      path: __dirname + "/dist", // `dist` is the destination
      filename: "bundle.js",
      publicPath: "/dist/"
    },
    module: {
      rules: [
        {
          test: /\.js$/, //Check for all js files
          use: [
            {
              loader: "babel-loader",
              options: { babelrcRoots: [".", "../"] }
            }
          ],
          exclude: /(node_modules|bower_compontents)/
        },
        {
          test: /\.(css|sass|scss)$/, //Check for sass or scss file names
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                publicPath:
                  env && env.production ? "/playground/dist/" : "dist/"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true // webpack@2.x and newer
              }
            }
          ]
        }
      ]
    },
    //To run development server
    devServer: {
      contentBase: __dirname
    }
  };
};
