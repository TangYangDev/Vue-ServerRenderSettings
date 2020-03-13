/**=========================================
 * fileName: create-app.js
 * discription: 避免多次渲染app对象自定义配置文件
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 ===========================================*/

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

//自定义配置文件 导入
import createRouter from "./router/router.js";
import createStore from "./store/store.js";

//全局css样式导入
import "./assets/style/global.styl";
import "./assets/style/style.sass";

//监听导入
//import monitorVuex from "./monitor/monitor";

Vue.use(VueRouter);
Vue.use(Vuex);

/**
 * @description 通过解耦方式创建vue对象,每个单独实例对象存放在堆中
 * @param null
 * @returns {object} {app, router, store}
 */
export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
};
