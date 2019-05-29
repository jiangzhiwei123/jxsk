import mpx, { createStore } from '@mpxjs/core'
import Http from '../api/http'
import store from './general'
/**
 * todo
 * store全部拆开
 * 不同类型的东西放在不同的文件
 * 比如用户信息和省份数据，不是一类东西，就拆开
 * 这里是store模板
 * 怎么引入，看general.js
 */
const state = {
  dataList: [],
  // 单个活动id
  taskId: '',
  // 合作伙头像
  imgArray: [],
  widthImg: ''
}
const mutations = {
  // 更新task页面的数据
  updateDatalist(state, t) {
    state.dataList = t
  },
  // 更新活动id
  updateActiveId(state, t) {
    state.taskId = t
  },
  // 更新合作伙伴头像
  updateImg(state, t) {
    state.imgArray = t
  }
}
const actions = {
  // 根据传入的id获取详情页面
  async taskData(context, id) {
    let res = await Http.get({
      url: '/activity/loadParticularsActivityInfo',
      data: {
        id: id
      }
    })
    console.log(666666666666666, res)
    // 更新详情数据
    context.commit('updateDatalist', res.data)
    // 更新详情id
    context.commit('updateActiveId', res.data.id)
    // 更新合作头像
    if (res.data.partnerIcons.length === 1) {
      store.state.widthImg = 80
    } else {
      store.state.widthImg = 60
    }
    context.commit('updateImg', res.data.partnerIcons)
    console.log(res.data.id)
  },
  // 用户转发
  async ShareActive(context, delId) {
    await Http.post({
      url: `/activity/forwardActivity`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: delId
      }
    })
    console.log(444444444444444)
  },
  // 用户删除
  async delActive(context, delId) {
    await Http.post({
      url: `/activity/deleteActivity`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: delId
      }
    })
  },
  // 用户下架
  async downActive(context, dowmId) {
    await Http.post({
      url: `/activity/remove`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: dowmId
      }
    })
  }

}

export default {
  actions,
  mutations,
  state
}
