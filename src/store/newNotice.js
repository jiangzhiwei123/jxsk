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
  noticeList: [],
  // 背景轮播图数组
  bannerArr:[],
  realBanner:[]
}
const mutations = {
  // 更新公告
  updateNotice(state, p) {
    state.noticeList = p
  },
  updateArray(state,t){
    state.bannerArr.push(t)
  },
  // 真正获取的banner
  updateReal(state,t){
    state.realBanner=t
  },
  // 清空banner
  clearBanner(state,t){
    state.bannerArr=t
  }
}
const actions = {
  // 公告部分
  async fetchNotice(context) {
    const notice = await NewNotice.getAll()
    context.commit('updateNotice', notice.data)
  },
  // banner背景图部分
  async fetchBanner({commit,state}) {
    const res = await Http.get({
      url:'/file/loadBanner'
    })
    commit('clearBanner',[])
    for(let i in res.data){
      commit('updateArray',res.data[i].url)
    }
    commit('updateReal',state.bannerArr)
  }
}

export default {
  actions,
  mutations,
  state
}
