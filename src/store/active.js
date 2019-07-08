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
  firstNr:'1.需求资源描述 : ',
  secondNr:'2.时间限制 : ',
  thirdNr:'3.学校限制 : ',
  fourthNr:'4.其他限制 : ',
  fifthNr:'1.提供资源类型(资金或其他) : ',
  sixNr:'2.其他补充 : ',
  sevenNr:'1.活动内容 : ',
  dataList: [],
  // 单个活动id
  taskId: '',
  // 合作伙头像
  imgArray: [],
  widthImg: '',
  // 发布需求时的title
  supTitle: '',
  // 发布需求时需求的资源
  supNeed: '',
  // 发布需求时提供的资源
  supreSource: '',
  // 邀请码
  invite:Number,
  // 邀请码
  codeNum:''
}
const mutations = {
  // 更新需求文本框的内容
  updateFirst(state,t){
    state.firstNr=t
  },
  // 更新需求文本框的内容
  updateSecond(state,t){
    state.secondNr=t
  },
  // 更新需求文本框的内容
  updateThird(state,t){
    state.thirdNr=t
  },
  // 更新需求文本框的内容
  updateFourth(state,t){
    state.fourthNr=t
  },
  // 更新需求文本框的内容
  updateFifth(state,t){
    state.fifthNr=t
  },
  // 更新需求文本框的内容
  updateSix(state,t){
    state.sixNr=t
  },
  // 更新需求文本框的内容
  updateSeven(state,t){
    state.sevenNr=t
  },
  // 更新task页面的数据
  updateDatalist(state, t) {
    state.dataList = t
  },
  // 更新发布需求时的title
  updateSupTitle(state, t) {
    state.supTitle = t
  },
  // 更新发布需求的资源
  updateNeed(state, t) {
    state.supNeed = t
  },
  // 更新发布提供的资源
  updateSource(state, t) {
    state.supreSource = t
  },
  // 清空title 需求 提供的资源
  clearThree(state) {
    state.supTitle = ''
    state.supNeed = ''
    state.supreSource = ''
    state.firstNr = '1.需求资源描述 : '
    state.secondNr = '2.时间限制 : '
    state.thirdNr = '3.学校限制 : '
    state.fourthNr = '4.其他限制 : '
    state.fifthNr = '1.提供资源类型(资金或其他) : '
    state.sixNr = '2.其他补充 : '
    state.sevenNr = '1.活动内容 : '
  },
  // 更新活动id
  updateActiveId(state, t) {
    state.taskId = t
  },
  // 更新合作伙伴头像
  updateImg(state, t) {
    state.imgArray = t
  },
  // 更新邀请码
  updateInvite(state, t){
    state.invite = t
  },
  // 更新codeNum
  updateCodeNum(state, t){
    state.codeNum = t
  },
  // 清除邀请码
  clearInvite(state){
    state.invite = ''
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
  },
  // 邀请
  async userType(context, codeNum) {
    const res = await Http.get({
      url: `/minicode/${codeNum}`,
    })
    context.commit('updateInvite',res.data.codeType)
    context.commit('updateCodeNum',res.data.codeNum)
    console.log(555555555566666,state.invite)
    console.log(555555555566666,res.data.codeType)
  }

}

export default {
  actions,
  mutations,
  state
}
