<template>
  <el-table :data="tableData">
    <slot name="head" />
    <template v-for="(col, idx) in columns" >
      <el-table-column :key="idx"  :label="col.label" :prop="col.prop" />
    </template>
    <slot name="tail" />
  </el-table>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { TableColumn } from './table.d'

@Component
export default class BaseTable extends Vue {
  @Prop(Array) readonly tableData!: any[]
  @Prop(Array) readonly columns!: TableColumn[]
}
</script>
