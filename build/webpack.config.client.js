/**=========================================
 * fileName: webpack.config.client.js
 * discription: 客户端启动自定义配置文件
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 ===========================================*/
/**
 * 插件及配置文件的引入
 */
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const VueClientPlugin = require("vue-server-renderer/client-plugin");

/**
 * 全局常量
 */
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const defaultPluins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: IS_DEVELOPMENT ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, "template.html")
  }),
  new VueClientPlugin()
];

const devServer = {
  port: 8088,
  host: "0.0.0.0",
  overlay: {
    errors: true
  },
  //headers: { "Access-Control-Allow-Origin": "*" },
  historyApiFallback: {
    index: "/public/index.html"
  },
  // proxy: {
  //   '/api': 'http://127.0.0.1:3333',
  //   '/user': 'http://127.0.0.1:3333'
  // },
  hot: true
};

let config;

if (IS_DEVELOPMENT) {
  config = merge(baseConfig, {
    devtool: "#cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            "vue-style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            "stylus-loader"
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, "../client/main.js"),
      vendor: ["vue"]
    },
    output: {
      filename: "[name].[chunkhash:8].js",
      publicPath: cdnConfig.host
    },
    module: {
      rules: [
        {
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
        }
      ]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin("styles.[contentHash:8].css"),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor"
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "runtime"
      }),
      new webpack.NamedChunksPlugin()
    ])
  });
}

// config.resolve = {
//   alias: {
//     model: path.join(__dirname, "../client/model/client-model.js")
//   }
// };

module.exports = config;
