import Http from './http'
import mpx from '@mpxjs/core'

export default class SimpleActive {
  static async getAll() {
    const res = await Http.get({ url: '/activity/loadSimpleActivityInfo' })
    console.log(444, res)
    return res
  }
}
