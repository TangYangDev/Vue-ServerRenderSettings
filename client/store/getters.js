/**
 * fileName: getters.js
 * discription: getters配置文件
 * author: TangYang
 * date: 2020-03-11
 * Copyright (C) 2020 Private
 */

export default {
  systemName: (state) => {
    return `${state.sysPrefixName}${state.sysSuffixName}`
  }

}
