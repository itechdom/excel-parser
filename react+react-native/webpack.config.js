"use strict";
var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    crudService: "./crud-service/crud-service.js",
    authService: "./auth-service/auth-service.js",
    mediaService: "./media-service/media-service.js",
    adminService: "./admin-service/admin-service.js",
    socketService: "./socket-service/socket-service.js",
    formsService: "./forms-service/forms-service.js",
    index: "./index.js"
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "[name].js",
    publicPath: "/lib/",
    library: ["react-services", "[name]"],
    libraryTarget: "umd"
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
        test: /\.json$/,
        loader: "json-loader" //JSON loader
      }
    ]
  },
  //To run development server
  devServer: {
    contentBase: __dirname
  }
};
