/**
 * fileName: mutations.js
 * discription: mutations配置文件
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

export default {
  updateTime: (state, {
    currentDate
  }) => {
    state.currentDate = currentDate
  },
  updateSysemName: (state, {
    sysPrefixName,
    sysSuffixName
  }) => {
    state.sysPrefixName = sysPrefixName;
    state.sysSuffixName = sysSuffixName;
  }
}
