<template>
  <div class="app-container border">
    <DefaultTable :fetch-func="fetchDeviceOsWithFilter" :columns="columns"/>
  </div>
</template>

<script lang="ts">
import * as DeviceOsApi from '@/api/deviceOs'
import Component from 'vue-class-component'
import { Pagination } from '@/interfaces/pagination'
import { DeviceOs } from '@/interfaces/deviceOs'
import DefaultTable from '@/components/Table/DefaultTable.vue'
import { TableColumn } from '@/components/Table/table'
import Vue from 'vue'

@Component({
  name: 'DeivceOsListView',
  components: { DefaultTable }
})
export default class extends Vue {
  readonly columns : TableColumn[] = [
    {
      prop: 'id',
      label: 'id'
    }, {
      prop: 'name',
      label: '名称'
    }
  ]

  async fetchDeviceOsWithFilter(page: number, pageSize: number) {
    const { data } = await DeviceOsApi.listWithFilter(page, pageSize)
    return data as Pagination<DeviceOs>
  }
}
</script>
