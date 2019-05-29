import Http from './http'
import mpx from '@mpxjs/core'

export default class Province {
  static async getAll() {
    const res = await Http.get({ url: '/province/loadAllProvince' })
    // console.log(333, res)
    return res
  }
}
