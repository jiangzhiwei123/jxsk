import Province from '../api/province'
import mpx, { createStore } from '@mpxjs/core'
import Http from '../api/http'
/**
 * todo
 * 这里是拆分store的例子
 */
const state = {
  provinces: []
}
const mutations = {
  // 更新地区
  updateProvince(state, p) {
    state.provinces = p
  }
}
const actions = {
  async fetchProvince(context) {
    const provinces = await Province.getAll()
    const a = provinces.data.map(item => {
      item.selected = false
      return item
    })
    context.commit('updateProvince', a)
  }
}

export default {
  actions,
  mutations,
  state
}
