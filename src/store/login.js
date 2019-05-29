import mpx, { createStore } from '@mpxjs/core'
import Http from '../api/http'
/**
 * todo
 * store全部拆开
 * 不同类型的东西放在不同的文件
 * 比如用户信息和省份数据，不是一类东西，就拆开
 * 这里是store模板
 * 怎么引入，看general.js
 */
const state = {

}
const mutations = {}
const actions = {
  // 获取用户身份
  // async fetchUser(context) {
  //   /**
  //    * todo
  //    * wx.request 全部改用Http类
  //    */
  //   const res = await Http.get({
  //     url: '/user/loadUserInfo'
  //   })
  //   await context.commit('updateUser', res.data.data.userType)
  // }
}

export default {
  actions,
  mutations,
  state
}
