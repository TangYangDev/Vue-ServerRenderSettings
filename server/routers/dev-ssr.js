/**=========================================
 * fileName: dev-ssr.js
 * discription: 服务器环境,koa-router自定义配置文件
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 ===========================================*/
/**
 * 引入相关配置文件
 */
const Router = require("koa-router");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const MemoryFS = require("memory-fs");
const webpack = require("webpack");
const VueServerRenderer = require("vue-server-renderer");

const serverRender = require("./server-render");
const serverConfig = require("../../build/webpack.config.server");

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.warn(err));

  const bundlePath = path.join(
    serverConfig.output.path,
    "vue-ssr-server-bundle.json"
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, "utf-8"));
  console.log("新的bundle打包已完成!!!");
});

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = "服务器正在底层渲染,上传中...";
    return;
  }

  const clientManifestResp = await axios.get(
    "http://127.0.0.1:8088/public/vue-ssr-client-manifest.json"
  );

  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(
    path.join(__dirname, "../server.template.ejs"),
    "utf-8"
  );

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  });

  await serverRender(ctx, renderer, template);
};

const router = new Router();
router.get("*", handleSSR);

module.exports = router;
