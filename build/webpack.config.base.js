/**
 * fileName: webpack.config.base.js
 * discription: webpack 基础配置文件 新增
 * author: TangYang
 * date: 2020-03-10
 * Copyright (C) 2020 Private
 */

const path = require("path");
const createLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE.ENV === 'development';

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


const config = {
  entry: {
    app: "./client/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../public"),
    publicPath: "/",
    filename: "build[hash:8].js"
  },
  // import Vue from 'vue' 所用的环境
  // 说明：alias配置import时的相对路径方式(可自定义)
  //      extensions可省略的后缀名
  resolve: {
    alias: {
      'vue$': "vue/dist/vue.esm.js",
      '@': resolve('client')
    },
    extensions: ["*", ".js", ".vue", ".json", ".styl", ".sass"]
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: createLoaderOptions(isDev) //{
        //   loaders: {
        //     // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        //     // the "scss" and "sass" values for the lang attribute to the right configs here.
        //     // other preprocessors should work out of the box, no loader config like this necessary.
        //     scss: ["vue-style-loader", "css-loader", "sass-loader"],
        //     sass: [
        //       "vue-style-loader",
        //       "css-loader",
        //       "sass-loader?indentedSyntax"
        //     ]
        //   }
        // other vue-loader options go here
        //}
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          limit: 1024,
          name: "resources/[path][name].[hash:8].[ext]"
        }
      }
    ]
  }
};

module.exports = config;
