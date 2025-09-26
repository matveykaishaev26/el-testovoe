<script lang="ts" setup>
import type { Order } from "../../../types";

const props = defineProps<{
  data: Order[];
}>();
</script>

<template>
  <el-table :data="props.data" style="width: 100%" border stripe>
    <el-table-column prop="g_number" label="G Number">
      <template #default="{ row }">
        {{ row.g_number }}
      </template>
    </el-table-column>
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Изменено" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="total_price" label="Цена" />
    <el-table-column prop="discount_percent" label="Скидка %" />
    <el-table-column prop="is_cancel" label="Отменен">
      <template #default="{ row }">
        <el-tag :type="row.is_cancel ? 'danger' : 'success'">
          {{ row.is_cancel ? "Да" : "Нет" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="cancel_dt" label="Дата отмены" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="oblast" label="Регион" />
  </el-table>
</template>
