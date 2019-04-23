import { createStore } from '@mpxjs/core'
import User from '../api/user'

const store = createStore({
  state: {
    statusBar: 0,
    customBar: 0,
    token: '',
    userinfo: null
  },
  mutations: {
    updateToken (state, k) {
      state.token = k
      // wx.setStorageSync('token', k)
    },
    updateUserinfo (state, userinfo) {
      console.log('update token')
      state.userinfo = userinfo
    }
  },
  actions: {
    async updateUserinfo ({ commit }) {
      const userinfo = await User.getInfo()
      commit('updateUserinfo', userinfo)
    }
  },
  getters: {
    statusBarHeight: state => state.statusBar + 'px',
    customBarHeight: state => state.customBar + 'px'

  }
})

wx.getSystemInfo({
  success: e => {
    console.log(e)
    store.state.statusBar = e.statusBarHeight
    store.state.customBar = e.platform === 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45
  }
})
// store.state.token = wx.getStorageSync('token')
export default store
