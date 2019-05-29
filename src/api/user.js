import Http from './http'
import mpx from '@mpxjs/core'

export default class User {
  static async register() {
    console.log(222)

    const { code } = await mpx.login()
    const { encryptedData, iv } = await mpx.getUserInfo({ withCredentials: true, 'lang': 'zh_CN' })
    const data = {
      encryptedData: encryptedData,
      code,
      iv
    }
    const res = await Http.post({ url: '/login/register', data })
    return res
  }
}
