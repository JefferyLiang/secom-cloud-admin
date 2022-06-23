import { UserModule } from '@/store/modules/user'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Message, MessageBox } from 'element-ui'

interface AxiosRequestOption {
  auth?: boolean
  timeout?: number
}

export class AxiosRequest {
  private client: AxiosInstance;
  private shouldAuth: boolean;
  constructor(basePath: string, option: AxiosRequestOption = {}) {
    this.shouldAuth = option.auth || false
    this.client = axios.create({
      baseURL: this.getBasePath(basePath),
      timeout: option.timeout || 5000
    })
    this.client.interceptors.request.use(
      (config) => {
        if (this.shouldAuth && UserModule.token) {
          config.headers.Authorization = `Bearer ${UserModule.token}`
        }
        console.log(config)
        return config
      },
      (error) => {
        Promise.reject(error)
      })
    this.client.interceptors.response.use(
      resp => {
        if (resp.status === 401) {
          MessageBox.confirm(
            '登录好像已经过期了，尝试重新登录',
            '提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            UserModule.ResetToken()
            location.reload()
          })
        }
        const data = resp.data
        if (data.code !== 200) {
          Message({
            message: data.msg || 'Error',
            type: 'error',
            duration: 3 * 10000
          })
        } else {
          return data
        }
      },
      (error) => {
        Promise.reject(error)
      }
    )
  }

  private getBasePath(basePath: string): string {
    const API_BASE: string = process.env.VUE_APP_BASE_API || ''
    return `${API_BASE.endsWith('/') ? API_BASE.substring(0, API_BASE.length - 1) : API_BASE}${basePath}`
  }

  private makeRequest(path: string, method: string, config: AxiosRequestConfig = {}) {
    return this.client.request(
      Object.assign(
        config,
        { url: path, method: method }
      )
    )
  }

  public get(path: string, config: AxiosRequestConfig = {}) {
    return this.makeRequest(
      path,
      'GET',
      config
    )
  }

  public post(path: string, data: any, config: AxiosRequestConfig = {}) {
    return this.makeRequest(
      path,
      'POST',
      Object.assign(config, { data: data })
    )
  }

  public put(path: string, data: any, config: AxiosRequestConfig = {}) {
    return this.makeRequest(
      path,
      'PUT',
      Object.assign(config, { data: data })
    )
  }

  public delete(path: string, config: AxiosRequestConfig = {}) {
    return this.makeRequest(
      path,
      'DELETE',
      config
    )
  }
}
