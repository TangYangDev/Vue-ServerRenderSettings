/**
 * fileName: vue-loader.config.js
 * discription:  vue loader基础配置文件 新增配置
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

module.exports = (isDev) => {
  if (isDev) {
    return {
      loaders: {
        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        // the "scss" and "sass" values for the lang attribute to the right configs here.
        // other preprocessors should work out of the box, no loader config like this necessary.
        scss: ["vue-style-loader", "css-loader", "sass-loader"],
        sass: [
          "vue-style-loader",
          "css-loader",
          "sass-loader?indentedSyntax"
        ]
      },
      // other vue-loader options go here
      preserverWhitepace: true, //控制标签内的空格
      extractCSS: true //vue 热开发更新的功能
    }
  } else {
    return {
      loaders: {
        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        // the "scss" and "sass" values for the lang attribute to the right configs here.
        // other preprocessors should work out of the box, no loader config like this necessary.
        scss: ["vue-style-loader", "css-loader", "sass-loader"],
        sass: [
          "vue-style-loader",
          "css-loader",
          "sass-loader?indentedSyntax"
        ]
      }
    }
  }
}
