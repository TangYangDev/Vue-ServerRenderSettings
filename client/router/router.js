/**
 * fileName: router.js
 * discription:  路由渲染配置文件
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

import Router from 'vue-router'

import routes from './routes.js'

/**
 * @type function
 * @param null
 * @author TangYang
 * @description 用于服务端渲染，通过解耦的方式，每次渲染生成一个新的router对象
 */
export default () => {
  return new Router({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    // parseQuery(query) {
    //   //url参数
    // },
    // stringifyQuery(obj) {

    // },
    fallback: true
  })
}
