/**
 * fileName: monitor.js
 * discription: 
 * 1、监听vuex事件配置文件
 * 2、此文件用户程序入口监听
 * 3、当重新createStore()时，注意监听内容
 * author: TangYang
 * date: 2020-03-12
 * Copyright (C) 2020 Private
 */


/**
 * @typedef monitor
 * @param {object} store
 * @author TangYang
 * @description 监听state mutations actions 事件
 */
const monitor = (store) => {

  /**
   * @typedef watch
   * @callback param:state
   * @callback param:newValue
   * @author TangYang
   * @description store.state watch 监听事件
   */
  store.watch((state) => {
    //console.log(state.currentDate)
  }, (newValue) => {})



  /**
   * @typedef subscribe 订阅
   * @callback param:mutations,state
   * @author TangYang
   * @description mutations监听事件
   */
  store.subscribe((mutations, state) => {
    //console.log(mutations.type);
    //console.log(mutations.payload);
  })



  /**
   * @typedef subscribeAction
   * @callback param:actions,state
   * @author TangYang
   * @description actions 监听事件
   */
  store.subscribeAction((actions, state) => {

  })
}
export default monitor
