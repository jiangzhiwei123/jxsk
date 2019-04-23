import Base from './base'
import Http from './http'
import mpx from '@mpxjs/core'
import generalStore from '../store/general'

export default class User extends Base {
  static async getInfo () {
    const res = await Http.get({ url: '/v1/user' })
    return res.data
  }

  static async getCount () {
    const res = await Http.get({ url: '/v1/user/count' })
    return res.data
  }

  static async register () {
    const { code } = await mpx.login()
    console.log(await mpx.getUserInfo({ withCredentials: true }))
    const { encryptedData, iv } = await mpx.getUserInfo({ withCredentials: true })
    console.log(code.code)
    const data = {
      encrypted_data: encryptedData,
      code,
      iv,
      type: 200
    }
    const res = await this.post({ url: '/v1/client/register', data })
    return res.data
  }

  static async login () {
    const { code } = await mpx.login()
    const data = { code, type: 200 }
    const res = await this.post({ url: '/v1/token', data })
    if (res.error_code === 0) {
      generalStore.commit('updateToken', res.data.token)
    }
    return res
  }

  static async updateUserinfo (username, password) {
    const res = await this.post({ url: '/v1/user', data: { username, password } })
    if (res.success) {
      return res
    }
  }
}
