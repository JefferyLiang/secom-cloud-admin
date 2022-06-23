import request from '@/utils/request'
import { AxiosRequest } from '@/utils/axios'
import { getToken } from '@/utils/cookies'

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

const axiosRequest = new AxiosRequest('/accounts/v1/users', { auth: true })

export const userLogin = (data: any) => axiosRequest.post('/login', data)

export const userInfo = () => axiosRequest.get('/info', {
  headers: {
    Authorization: `Breaer ${getToken()}`
  }
})
