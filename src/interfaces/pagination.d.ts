export interface Pagination<T = any> {
  current: number
  total: number
  size: number
  items: T[]
}
