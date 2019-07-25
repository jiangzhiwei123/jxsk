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
    // 获取地区数据名字
    const provinces = await Province.getAll()
    // 在最前面添加一个不限地区
    // const newProvinces = provinces.data.unshift({ code: 10, name: '全国', provinceName: null, cityName: null })
    const newProvinces = provinces.data
    console.log(3333333333, newProvinces)
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
