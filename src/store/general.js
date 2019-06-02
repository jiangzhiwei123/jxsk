import mpx, { createStore } from '@mpxjs/core'
import User from '../api/user'
// import Province from '../api/province'
// import NewNotice from '../api/newNotice'
// import LoadUserInfo from '../api/loadUser'
// import SimpleActive from '../api/loadSimple'
import Http from '../api/http'
import provinceStore from './province'
import newNoticeStore from './newNotice'
import simpleListStore from './simpList'
import user from './user'
import active from './active'
import collect from './collect'

const store = createStore({
  state: {
    ...provinceStore.state,
    ...newNoticeStore.state,
    ...simpleListStore.state,
    ...user.state,
    ...active.state,
    ...collect.state,
    imgUrl: [],
    // 地区code集合
    codeArr: [],
    // 标签
    label: [],
    // 标签的选中的集合
    idArr: [],
    // 认证图片
    identify: '',
    token: wx.getStorageSync('token'),
    // token: 'b6bc6789-aeb9-4f79-a79d-daa7120ccd5a',
    // 地区部分显示内容
    address: '地区',
    // 传过去的code
    addressCode: '',
    // 资源类型
    activeType: '',
    LabelArr: '',
    // 点击活动类型
    clickType: '',
    // 设备高度
    phoneHeight: '',
    // 设备宽度
    phoneWidth: '',
    // 显示选择地区的名字
    provinceName: []
    // 改善
    // login变形
    // 学生企业 发布页面不同
    // title上面加上类型
  },
  mutations: {
    ...provinceStore.mutations,
    ...newNoticeStore.mutations,
    ...simpleListStore.mutations,
    ...user.mutations,
    ...active.mutations,
    ...collect.mutations,
    // 更新标签
    updateLabelArr(state, p) {
      state.LabelArr = p
    },
    updateclickType(state, p) {
      state.clickType = p
    },
    // 更新设备高度
    updateHeight(state, p) {
      state.phoneHeight = p
    },
    // 更新设备宽度
    updateWidth(state, p) {
      state.phoneWidth = p
    },
    // 更新标签
    updateLabel(state, l) {
      state.label = l
    },
    // 选择地区
    selectItem(state, code) {
      const index = state.provinces.findIndex(item => {
        return item.code === code
      })
      if (state.codeArr.length < 6 || state.provinces[index].selected) {
        state.provinces[index].selected = !state.provinces[index].selected
        if (state.provinces[index].selected) {
          state.codeArr.push(code)
          state.provinceName.push(state.provinces[index].name)
        } else {
          state.codeArr = state.codeArr.filter(item => item !== code)
          state.provinceName = state.provinceName.filter(item => item !== code)
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '最多只能选择6个地区',
          success(res) {
            if (res.confirm) {
            } else if (res.cancel) {
              // store.mutations.clearCode()
            }
          }
        })
      }
    },
    // token过期 刷新
    // 地区 头像返回带出数据
    // 分享 完成
    // 网络请求给loading
    // 监听 限制 弹窗 完成
    // 图片点击放大预览 完成
    // 底部定位 完成
    // 重构
    // 优化  1.记录设备的大小 做出相应布局变化 2.下拉刷新 3.loading 4.多提示
    // 更新地区名
    updateAddress(state, add) {
      state.address = add
    },
    // 更新code
    updateAddressCode(state, addCode) {
      state.addressCode = addCode
    },
    // 更新token
    updateToken(state, t) {
      state.token = t
      wx.setStorageSync('token', t)
    },
    // 更新labelTypeA
    upLabelTypeA(state, t) {
      state.token = t
    },
    // getToken(state) {
    //   state.token = wx.getStorageSync('token')
    // },
    // 选择标签
    selectLabel(state, id) {
      const labelIndex = state.label.findIndex(item => {
        return item.id === id
      })
      if (state.idArr.length < 6 || state.label[labelIndex].isCheck) {
        state.label[labelIndex].isCheck = !state.label[labelIndex].isCheck
        if (state.label[labelIndex].isCheck) {
          state.idArr.push(id)
        } else {
          state.idArr = state.idArr.filter(item => item !== id)
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '最多只能选择6个标签',
          success(res) {
            if (res.confirm) {
            } else if (res.cancel) {
              // store.mutations.clearCode()
            }
          }
        })
      }
    },
    //  清空用户选择的地区
    clearProvinceName(state, p) {
      state.provinceName = []
    },
    // 清除地区code集合
    clearCode(state) {
      state.codeArr = []
    },
    clearId(state) {
      state.idArr = []
    },
    // 添加图片
    addImg(state, url) {
      if (state.imgUrl.length < 2) {
        state.imgUrl.push(url)
      }
    },
    // 添加认证图片
    addIdentify(state, url) {
      state.identify = url
    },
    // 清除认证图片
    clearIdentify(state) {
      state.identify = ''
    },
    // 清除图片
    clearImg(state) {
      state.imgUrl = []
    }
  },
  getters: {},
  actions: {
    // 用户注册 以后再登录就能拿到token
    async loginRegister({ commit }) {
      const code = (await mpx.login()).code
      const userInfo = (await mpx.getUserInfo({ lang: 'zh_CN' }))
      const iv = userInfo.iv
      const encryptedData = userInfo.encryptedData
      const res = await Http.post({
        url: '/login/register',
        data: {
          code,
          iv,
          encryptedData
        }
      })
      commit('updateToken', res.data)
      wx.redirectTo({
        url: '../pages/getPhone'
      })
    },
    // 登录获取token
    async fetchToken({ commit }) {
      const code = (await mpx.login()).code
      const res = await Http.post({
        url: '/login/register',
        data: {
          code
        }
      })
      console.log(44444444444, res)
      commit('updateToken', res.data)
    // wx.redirectTo({
    //   url: '../pages/login'
    // })
    },
    /**
     * todo
     * 拆分的store这样引入
     * 同样的还有state、mutations
     */
    ...provinceStore.actions,
    ...newNoticeStore.actions,
    ...simpleListStore.actions,
    ...user.actions,
    ...active.actions,
    ...collect.actions,
    // 注册获取token
    // async fetchRegist({ commit }) {
    //   const code = (await mpx.login()).code
    //   const userInfo = (await mpx.getUserInfo())
    //   const iv = userInfo.iv
    //   const encryptedData = userInfo.encryptedData
    //   const res = await Http.post({
    //     url: '/login/register',
    //     data: {
    //       code,
    //       iv,
    //       encryptedData
    //     }
    //   })
    //   await commit('updateToken', res.data)
    //   console.log(2222222222222222222222222222222222, res.data)
    //   wx.redirectTo({
    //     url: '../pages/getPhone'
    //   })
    // },
    // getData({ commit }) {
    //   // var _this = this
    //   wx.login({
    //     success(res) {
    //       console.log(11, res.code)
    //       if (res.code) {
    //         wx.getUserInfo({
    //           lang: 'zh_CN',
    //           success: e => {
    //             console.log(22, e)
    //             //  const e = res.detail
    //             // 发起网络请求
    //             wx.request({
    //               method: 'post',
    //               url: `http://47.101.56.46:8080/login/register`,
    //               header: {
    //                 'Content-Type': 'application/json'
    //                 // 'Authorization' :'b6bc6789-aeb9-4f79-a79d-daa7120ccd5a'
    //               },
    //               data: {
    //                 code: res.code,
    //                 iv: e.iv,
    //                 encryptedData: e.encryptedData
    //               },
    //               success: res => {
    //                 // console.log('我打印的数据是' + res.data.data)
    //                 commit('updateToken', res.data.data)
    //                 wx.redirectTo({
    //                   url: '../pages/getPhone'
    //                 })
    //               }
    //             })
    //           }
    //         })
    //       } else {
    //         console.log('登录失败！' + res.errMsg)
    //       }
    //     }
    //   })
    // },
    // 获取请求的token
    // async getData(context) {
    //   console.log(1111)
    //   const res = await User.register()
    //   console.log(res)
    //   context.commit('updateToken', res.data)
    //   // store.actions.getData()
    //   wx.switchTab({
    //     url: '../pages/index'
    //   })
    // },
    // 获取地区数据
    // 获取手机号接口
    // async fetch(context) {
    //   const notice = await NewNotice.getAll()
    //   console.log(123456789, notice)
    //   context.commit('updateNotice', notice.data)
    // },

    // 获取公告
    // 获取标签数据
    async fetchLabel(context, type) {
      const res = await Http.get({
        url: '/label/loadAllLabel',
        data: {
          labeltype: type
        }
      })
      const b = await res.data.map(item => {
        item.isCheck = false
        return item
      })
      context.commit('updateLabel', b)
    }
  }
})
// store.state.token = wx.getStorageSync('token')
export default store
