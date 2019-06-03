import Http from './http'
import mpx from '@mpxjs/core'

export default class SimpleActive {
  static async getAll() {
    const res = await Http.get({ url: '/activity/loadSimpleActivityInfo' })
    console.log(444555666, res)
    return res
  }
}
