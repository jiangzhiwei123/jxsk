// import Province from '../api/province'
import mpx, { createStore } from '@mpxjs/core'
// import User from '../api/user'
import Http from '../api/http'
// import provinceStore from './province'
import NewNotice from '../api/newNotice'
/**
 * todo
 * 这里是拆分store的例子
 */
const state = {
  noticeList: []
}
const mutations = {
  // 更新公告
  updateNotice(state, p) {
    state.noticeList = p
  }
}
const actions = {
  // 公告部分
  async fetchNotice(context) {
    const notice = await NewNotice.getAll()
    context.commit('updateNotice', notice.data)
  }
}

export default {
  actions,
  mutations,
  state
}
