import Http from './http'
import mpx from '@mpxjs/core'

export default class LoadUserInfo {
  static async getAll() {
    const res = await Http.get({ url: '/user/loadUserInfo' })
    console.log(3333333333333, res)
    return res
  }
}
