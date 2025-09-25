<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getSales } from "../../api/sales";
import type { Sale } from "../../types";

const { isPending, isFetching, isError, data, error } = useQuery<Sale[]>({
  queryKey: ["todos"],
  queryFn: () => getSales(10, 1, "2024-01-01", "2025-01-01"),
});
</script>

<template>
  <el-table :data="data" style="width: 100%" border stripe>
    <el-table-column prop="g_number" label="G Number" />
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Изменено" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="total_price" label="Цена" />
    <el-table-column prop="discount_percent" label="Скидка %" />
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
