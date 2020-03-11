/**
 * fileName: webpack.config.client.js
 * discription: webpack 客户端配置文件 新增
 * author: TangYang
 * date: 2020-03-10
 * Copyright (C) 2020 Private
 */

var path = require("path");
var webpack = require("webpack");

/** new Plugin add by Ty */
const ExtractPlugin = require("extract-text-webpack-plugin");
const HtmlWabpckPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge"); //合并webpack文件 工具

const baseConfig = require("./webpack.config.base");

const isProductionEnv = process.env.NODE_ENV === "production";

//访问IP地址配置
const devServer = {
  port: 8088,
  host: "localhost",
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/index.html'
  },
  hot: true
};

const defaultPluins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: isProductionEnv ? '"production"' : '"development"'
    }
  }),
  new HtmlWabpckPlugin({
    title: "vueProject",
    template: "index.html",
    filename: "index.html",
    inject: true
  })
];

let config;

/** 默认入口文件路径 */
const defaultEntry = "/client/main.js";

if (isProductionEnv) {
  config = merge(baseConfig, {
    entry: {
      app: path.join(
        __dirname,
        isProductionEnv ? `..${defaultEntry}` : `.${defaultEntry}`
      ), //打包/调试
      vendor: ["vue"]
    },
    output: {
      publicPath: "./",
      filename: "[name].[chunkhash:8].js"
    },
    module: {
      rules: [{
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: "vue-style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            "stylus-loader"
          ]
        })
      }]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin("styles.[contentHash:8].css"),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor"
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "runtime"
      })
    ])
  });
} else {
  config = merge(baseConfig, {
    devtool: "#cheap-module-eval-source-map",
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          "vue-style-loader", //vue 热开发更新的功能
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          "stylus-loader"
        ]
      }]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  });
}

module.exports = config;
