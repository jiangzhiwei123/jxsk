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
  // 我的收藏里查看收藏的列表
  collectList: []
}
const mutations = {
  updateCollect(state, c) {
    state.collectList = c
  }
}
const actions = {
  // 用户点击收藏的时候
  async changeCollect(context, { activeId, isSave }) {
    await Http.post({
      url: `/favorites/saveOrDelFavoritesHistory`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        activityId: activeId,
        isSave: isSave
      }
    })
    console.log(2222222222222222)
  },
  // 查看用户收藏
  async lookCollect(context) {
    const res = await Http.get({
      url: `/activity/myFavoritesHistory`
      // success: res => {
      //   this.collectList = res.data.data
      //   console.log(this.collectList)
      // }
    })
    console.log('cccccccccccccccccc', res)
    context.commit('updateCollect', res.data)
  }
}

export default {
  actions,
  mutations,
  state
}
