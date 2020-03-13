/**=========================================
 * fileName: server-entry.js
 * discription: 服务器入口自定义配置文件
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 ===========================================*/

import createApp from "./create-app";

/**
 * @description 通过解耦方式创建promise对象,每个单独实例对象存放在堆中
 * @param {object} context
 */
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    // if (context.user) {
    //   store.state.user = context.user;
    // }

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new Error("no component matched"));
      }
      resolve(app);
      // Promise.all(
      //   matchedComponents.map(Component => {
      //     if (Component.asyncData) {
      //       return Component.asyncData({
      //         route: router.currentRoute,
      //         router,
      //         store
      //       });
      //     }
      //   })
      // ).then(data => {
      //   //context.meta = app.$meta();
      //   //context.state = store.state;
      //   context.router = router;
      //   resolve(app);
      // });
    });
  });
};
