export interface TableColumn {
  prop: string
  label: string
}

export type FetchDataFunc<T = any> = (page: number, pageSize: number) => Promise<{
  total: number
  current: number
  size: number
  items: T[]
}>
