import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'
import generalStore from '../store/general'

mpx.use(mpxFetch)
// const baseUrl
mpx.xfetch.interceptors.request.use(function (config) {
  let base = 'https://course-api.heiye9.com'
  if (config.url[0] === '/') {
    config.url = base + config.url
  }
  // 也可以返回promise
  console.log(config)
  return config
})
mpx.xfetch.interceptors.response.use(function (res) {
  console.group(res.requestConfig.method, res.requestConfig.url)
  console.log(res)
  console.groupEnd()
  // if (res.data.error_code === 1002) {
  //   wx.reLaunch({ url: '/pages/login' })
  // }
  // 也可以返回promise
  return res.data
})

export default class Http {
  static async request (method = 'GET', url, header = {}, data = {}) {
    const options = {
      url,
      method,
      data,
      header: Object.assign(header, {
        'Authorization': `Bearer ${generalStore.state.token}`,
        'Content-Type': 'application/json; charset=utf-8'
      })
    }

    const res = await mpx.xfetch.fetch(options)

    if (res.success) {
      return res
    } else {
      console.error(method, url, data, res)
      // throw this.requestException(res)
    }
  }

  static get ({ url, header = {}, data = {} }) {
    return this.request('GET', url, header, data)
  }

  static put ({ url, header = {}, data = {} }) {
    return this.request('PUT', url, header, data)
  }

  static post ({ url, header = {}, data = {} }) {
    return this.request('POST', url, header, data)
  }

  static patch ({ url, header = {}, data = {} }) {
    return this.request('PATCH', url, header, data)
  }

  static delete ({ url, header = {}, data = {} }) {
    return this.request('DELETE', url, header, data)
  }
}
