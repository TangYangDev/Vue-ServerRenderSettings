/**
 * fileName: vue-loader.config.js
 * discription:  vue loader基础配置文件 新增配置
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */
const scssLoader = ["vue-style-loader", "css-loader", "sass-loader"];
const sassLoader = [
  "vue-style-loader",
  "css-loader",
  "sass-loader?indentedSyntax"
];

module.exports = isDev => {
  return {
    loaders: {
      scss: scssLoader,
      sass: sassLoader
    },
    preserverWhitepace: true, //控制标签内的空格
    extractCSS: !isDev, //vue 热开发更新的功能
    cssModules: {
      localIdentName: isDev
        ? "[path]-[name]-[hash:base64:5]"
        : "[hash: base64: 5]",
      camelCase: true
    }
  };
};
