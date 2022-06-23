<template>
  <el-row>
    <el-row>
      <el-col>
        <BaseTable :table-data="tableData" :columns="columns"/>
      </el-col>
    </el-row>
    <el-row class="m-t-10 m-b-10" type="flex" justify="center">
        <el-pagination :current-page="page" :page-size="pageSize" :total="total" />
    </el-row>
  </el-row>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import BaseTable from './BaseTable.vue'
import { FetchDataFunc, TableColumn } from './table'
import { PaginationMixin } from '@/mixins/pagination'

@Component({
  name: 'DefaultTableComponent',
  components: { BaseTable }
})
export default class DefaultTable extends mixins(PaginationMixin) {
  @Prop(Array) readonly columns!: TableColumn[]
  @Prop(Function) readonly fetchFunc!: FetchDataFunc
  private tableData: any[] = []

  mounted() {
    this.fetchDataWithPagination()
  }

  private async fetchDataWithPagination() {
    const data = await this.fetchFunc(this.getPage(), this.getPageSize())
    this.setTotal(data.total)
    this.setPageSize(data.size)
    this.tableData = data.items
  }
}
</script>
