/**=========================================
 * fileName: server-render.js
 * discription: 服务器自定义渲染配置文件
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 ===========================================*/

/**
 * 引入ejs文件解析框架
 */
const Ejs = require("ejs");

/**
 * @description 服务端渲染异步函数
 * @param {object} ctx 返回html内容
 * @param {object} render 渲染函数返回对象
 * @param {object} template 模版文件
 * @returns {object}
 */
module.exports = async (ctx, renderer, template) => {
  ctx.headers["Content-Type"] = "text/html";

  // const context = { url: ctx.path, user: ctx.session.user };
  //获取浏览器一些配置
  const context = { url: ctx.path };

  try {
    const appString = await renderer.renderToString(context);

    // if (context.router.currentRoute.fullPath !== ctx.path) {
    //   return ctx.redirect(context.router.currentRoute.fullPath);
    // }

    //const { title } = context.meta.inject();

    const html = Ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
      //title: title.text(),
      //initalState: context.renderState()
    });

    ctx.body = html;
  } catch (err) {
    console.log("render error", err);
    throw err;
  }
};
