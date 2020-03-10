/**
 * fileName: postcss.config.js
 * discription: 优化编译后css插件
 * author: TangYang
 * date: 2020-03-09
 * Copyright (C) 2020 Private
 */
const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [autoprefixer()]
};
