/**
 * fileName: store.js
 * discription:  vuex配置文件
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

import Vuex from 'vuex'

import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const isDev = process.env.NODE_ENV === 'development'


/**
 * @type function
 * @param null
 * @author TangYang
 * @description 用于服务端渲染，通过解耦的方式，每次渲染生成一个新的vuex对象
 */
export default () => {
  return new Vuex.Store({
    strict: isDev, //禁止外部修改store数据
    state: defaultState,
    mutations,
    getters,
    actions,
    //加入Vuex模块配置
    modules: {},
    //加入Vuex插件
    plugins: [
      (store) => {

      }
    ]
  })
}
