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
  // 用户类型
  userMold: '',
  teamData: '',
  infoList: [],
  userData:[],
  // 用户联系方式
  userContact:'',
  // 用户的练习类型
  contactType:''
}
const mutations = {
  // 更新用户
  updateUser(state, u) {
    state.userMold = u
  },
  // 更新用户合作时的数据
  updateTeam(state, u) {
    state.teamData = u
  },
  // 更新用户信息列表
  updateInfo(state, u) {
    state.infoList = u
  },
  updateContact(state, u) {
    state.userContact = u
  },
  updateContactType(state, u) {
    state.contactType = u
  }
  // 更用户信息

}
const actions = {
  // 获取用户信息
  // async fetchUser(context) {
  //   /**
  //    * todo
  //    * wx.request 全部改用Http类
  //    */
  //   const res = await Http.get({
  //     url: '/user/loadUserInfo'
  //   })
  //   console.log(444444444444444444444, res.data.data.userType)
  //   // await context.commit('updateUser', res.data.data.userType)
  // },
  // 用户点击合作的时候
  async StoreTeamWork(context, id) {
    const res = await Http.get({
      url: `/user/loadUserWechatByUserId`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        activityId: id
      }
    })
    context.commit('updateTeam', res)
    // context.commit('updateWx', res.wechat)
  },
  // 获取用户手机号/
  async fetchTel(context, { Div, DencryptedData }) {
    const code = (await mpx.login()).code
    // const userInfo = await mpx.getUserInfo()
    const iv = Div
    const encryptedData = DencryptedData
    await Http.post({
      url: '/login/getPhone',
      data: {
        code,
        iv,
        encryptedData
      }
    })
    wx.switchTab({
      url: '../pages/index'
    })
  },
  // 用户提交信息
  async changeInforma(context, { userName, wechat, rganization, position, qqNum, userIcon, userType, phone }) {
    const res = await Http.post({
      url: `/user/updateUserInfo`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userName,
        wechat,
        rganization: rganization || '',
        position: position || '',
        qqNum,
        userIcon,
        userType: userType || '',
        phone
      }
    })
    console.log(11111111111111111, res)
  },
  // 更改用户类型
  // async changeUserType(context, userType) {
  //   const res = await Http.post({
  //     url: `/user/updateUserInfo`,
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       userType
  //     }
  //   })
  //   console.log(11111111111111111, res)
  //   // context.commit('updateUser', res)
  // },
  // 根据id查询用户信息
  async requestImfor(context) {
    const res = await Http.get({
      url: '/user/loadUserInfo'
    })
    context.commit('updateInfo', res.data)
    if (res.data.userType === '游客') {
      context.commit('updateUser', '')
    } else {
      context.commit('updateUser', res.data.userType)
    }
  }
}

export default {
  actions,
  mutations,
  state
}
