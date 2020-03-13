/**=========================================
 * fileName: server.js
 * discription: koa服务端渲染自定义配置文件
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 ===========================================*/

/**
 * 引入koa框架
 */
const Koa = require("koa");
const send = require("koa-send");
const app = new Koa();
const path = require("path");

pageRouter = require("./routers/dev-ssr");

/**
 * 定义全局常量
 */
const IS_DEV_ENV = process.env.NODE_ENV === "development"; //是否是开发环境
const HOST = process.env.HOST || "0.0.0.0"; //server IP
const PORT = process.env.PORT || 8089; // server PORT

/**
 * koa中间件:记录服务端请求及异常抛出
 */
app.use(async (ctx, next) => {
  try {
    console.log(`请求路径:${ctx.path}`);
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    if (IS_DEV_ENV) {
      ctx.body = err.message;
    } else {
      ctx.body = "请稍后再试...";
    }
  }
});

app.use(async (ctx, next) => {
  if (ctx.path === "/favicon.ico") {
    await send(ctx, "/favicon.ico", { root: path.join(__dirname, "../") });
  } else {
    await next();
  }
});

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

app.listen(PORT, HOST, () => {
  console.log(`服务器地址:${HOST}:${PORT}`);
});
