/**
 * fileName: actions.js
 * discription: actions配置文件
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

export default {
  realTimeUpdate: (store, currentTime) => {
    setInterval(() => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
      const dateTime = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
      store.commit('updateTime', {
        currentDate: dateTime
      })
    }, currentTime.time)
  }
}
