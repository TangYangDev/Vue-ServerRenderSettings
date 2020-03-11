/**
 * fileName: routes.js
 * discription:  路由路径配置文件
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

import Login from '../views/login/Login.vue'
import Home from '../views/pages/Home.vue'

export default [

  {
    //默认路由
    path: '/',
    redirect: '/app'
  },
  {
    name: 'home',
    path: '/app',
    component: Home
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
]
