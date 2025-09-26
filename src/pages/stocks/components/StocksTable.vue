<script lang="ts" setup>
import type { Stock } from "../../../types";

const props = defineProps<{
  data: Stock[];
}>();
</script>

<template>
  <el-table :data="props.data" style="width: 100%" border stripe>
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Изменено" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="quantity" label="Количество" />
    <el-table-column prop="quantity_full" label="Полное количество" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="in_way_to_client" label="В пути к клиенту" />
    <el-table-column prop="in_way_from_client" label="В пути от клиента" />
    <el-table-column prop="price" label="Цена" />
    <el-table-column prop="discount" label="Скидка" />
    <el-table-column prop="is_supply" label="Поставка">
      <template #default="{ row }">
        <el-tag :type="row.is_supply ? 'success' : 'danger'">
          {{ row.is_supply ? "Да" : "Нет" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="is_realization" label="Реализация">
      <template #default="{ row }">
        <el-tag :type="row.is_realization ? 'success' : 'danger'">
          {{ row.is_realization ? "Да" : "Нет" }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
