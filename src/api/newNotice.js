import Http from './http'
import mpx from '@mpxjs/core'

export default class NewNotice {
  static async getAll() {
    const res = await Http.get({ url: '/notice/loadNewNotice' })
    // console.log(333, res)
    return res
  }
}
