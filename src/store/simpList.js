import mpx, { createStore } from '@mpxjs/core'
import User from '../api/user'
import Http from '../api/http'
import SimpleActive from '../api/loadSimple'
/*
 * todo
 * 这里是拆分store的例子
 */
const state = {
  // 显示的列表
  simpleList: [],
  // 显示的页数
  pageCount:1

}
const mutations = {
  // 更新缩略活动
  updateSimple(state, p) {
    state.simpleList = p
  },
  // 更新页数
  updatePage(state, p) {
    state.pageCount += p
  }
}
const actions = {
  // 缩略发布的活动部分
  async fetchSimple(context,{type,rows,page}) {
    const simple = await Http.get({
      url:'/activity/loadSimpleActivityInfo',
      data:{
        rows,
        page
      }
    })
    if (type === '') {
      context.commit('updateSimple', simple.data)
    } else if (type === '企业') {
      context.commit('updateSimple', simple.data.filter(item => item.plateName === '企业'))
    } else if (type === '校园') {
      context.commit('updateSimple', simple.data.filter(item => item.plateName === '校园'))
    }
  },
  async activePro({ commit }, { name, id ,rows,page}) {
    const res = await Http.get({
      url: '/activity/loadSimpleActivityInfo',
      data: {
        proviceId: id,
        plateName: name,
        rows,
        page
      }
    })
    console.log(88888888888, res.data)
    await commit('updateSimple', res.data)
  }
}

export default {
  actions,
  mutations,
  state
}
