<script lang="ts" setup>
import type { Income } from "../../../types";
const props = defineProps<{
  data: Income[];
}>();
</script>

<template>
  <el-table :data="props.data" style="width: 100%" border stripe>
    <el-table-column prop="income_id" label="ID прихода">
      <template #default="{ row }">
        {{ row.income_id }}
      </template>
    </el-table-column>
    <el-table-column prop="number" label="Номер документа" />
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Изменено" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="quantity" label="Количество" />
    <el-table-column prop="total_price" label="Цена" />
    <el-table-column prop="date_close" label="Дата закрытия" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="nm_id" label="ID товара" />
  </el-table>
</template>
