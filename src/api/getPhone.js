import Http from './http'
import mpx from '@mpxjs/core'

export default class GetPhone {
  static async getAll() {
    const res = await Http.get({ url: '/login/getPhone' })
    // console.log(333, res)
    return res
  }
}
