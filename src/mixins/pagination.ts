import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class PaginationMixin extends Vue {
  private page = 1
  private pageSize = 10
  private total = 0

  protected getPage(): number {
    return this.page
  }

  protected getPageSize(): number {
    return this.pageSize
  }

  protected getTotal(): number {
    return this.total
  }

  protected setPage(page: number) {
    this.page = page
  }

  protected setPageSize(pageSize: number) {
    this.pageSize = pageSize
  }

  protected setTotal(total: number) {
    this.total = total
  }
}
