const path = require("path");
const createVueLoaderOptions = require("./vue-loader.config");

const isDev = process.env.NODE_ENV === "development";

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const config = {
  target: "web",
  entry: path.join(__dirname, "../client/main.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "../public"),
    //publicPath: "http://127.0.0.1:8088/public/"
    publicPath: "/public/"
  },
  // import Vue from 'vue' 所用的环境
  // 说明：alias配置import时的相对路径方式(可自定义)
  //      extensions可省略的后缀名
  resolve: {
    alias: {
      // vue$: "vue/dist/vue.esm.js",
      // "@": resolve("client")
    },
    extensions: ["*", ".js", ".vue", ".json", ".styl", ".sass"]
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.scss$/,
        //loaders: ["style", "css", "scss"],
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        //loaders: ["style", "css", "sass"],
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: createVueLoaderOptions(isDev)
      },
      // {
      //   test: /\.vue$/,
      //   loader: "vue-loader",
      //   options: {
      //     loaders: {
      //       // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
      //       // the "scss" and "sass" values for the lang attribute to the right configs here.
      //       // other preprocessors should work out of the box, no loader config like this necessary.
      //       scss: ["vue-style-loader", "css-loader", "sass-loader"],
      //       sass: [
      //         "vue-style-loader",
      //         "css-loader",
      //         "sass-loader?indentedSyntax"
      //       ]
      //     }
      //     // other vue-loader options go here
      //   }
      // },
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
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "resources/[path][name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
