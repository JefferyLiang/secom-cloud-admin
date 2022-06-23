import { AxiosRequest } from '@/utils/axios'

const request = new AxiosRequest('/devices/v1/deviceOs', { auth: true })

export const listWithFilter = (page: number, pageSize = 10) => request.get('', {
  params: { page, pageSize }
})
