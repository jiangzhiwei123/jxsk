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
  pageCount:1,
  // 总页数
  totalPage:Number,
  // 后面是否还有更多
  isMore:false,
  // 是否加载
  isLoading:true
}
const mutations = {
  // 更新缩略活动
  updateSimple(state, p) {
    state.simpleList = p
  },
  // 更新页数
  updatePage(state, p) {
    state.pageCount += p
  },
  // 页数初始化
  clearPage(state) {
    state.pageCount = 1
  },
  // 更新总页数
  updateTotal(state, p) {
    state.totalPage = p
  },
  // 更新是否加载
  updateLoading(state, p) {
    state.isLoading = p
  },
  // 去重函数
  uniqArray(array){
    var data = []
    for(let i in array){
      if(data.indexOf(array[i])==-1){
        data.push(array[i])
      }
    }
    return data
    // console.log("哈哈哈")
  }
}
const actions = {
  // 缩略发布的活动部分
  // async fetchSimple(context,{type,rows,page}) {
  //   const simple = await Http.get({
  //     url:'/activity/loadSimpleActivityInfo',
  //     data:{
  //       rows,
  //       page
  //     }
  //   })
  //   if (type === '') {
  //     context.commit('updateSimple', simple.data)
  //   } else if (type === '企业') {
  //     context.commit('updateSimple', simple.data.filter(item => item.plateName === '企业'))
  //   } else if (type === '校园') {
  //     context.commit('updateSimple', simple.data.filter(item => item.plateName === '校园'))
  //   }
  // },
  async activePro({state, commit }, { name, id ,rows,page}) {
    const res = await Http.get({
      url: '/activity/loadSimpleActivityInfo',
      data: {
        proviceId: id,
        plateName: name,
        rows,
        page
      }
    })
    console.log(88888888888,state.simpleList.concat(res.data))
    // 更新活动列表
    await commit('updateSimple', state.simpleList.concat(res.data))
    // await commit('uniqArray ', state.simpleList)
    // await commit('updateSimple', res.data.concat(state.simpleList))
    // 更新总的页数
    await commit('updateTotal', Math.ceil(res.total/10))
    console.log(333333333333333333,state.totalPage)
    // 是否加载
    await commit('updateLoading',false)
  },
  async fetchSimple({state,commit}, type) {
    const simple = await SimpleActive.getAll()
    if (type === '') {
      commit('updateSimple', simple.data)
    } else if (type === '企业') {
      commit('updateSimple', simple.data.filter(item => item.plateName === '企业'))
    } else if (type === '校园') {
      commit('updateSimple', simple.data.filter(item => item.plateName === '校园'))
    }
    await commit('uniqArray ', state.simpleList)
    console.log(777888999)
  }
}

export default {
  actions,
  mutations,
  state
}
