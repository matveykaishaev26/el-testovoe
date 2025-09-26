<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getSales } from "../../api/sales";
import { type PaginatedResponse, type Sale } from "../../types";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import Filters from "../../components/common/Filters.vue";
import Pagination from "../../components/common/Pagination.vue";
import { useFilters } from "../../hooks/useFilters";

const LIMIT = 15;
const router = useRouter();
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);

function handlePageChange(newPage: number) {
  router.push({
    query: {
      ...route.query,
      page: newPage.toString(),
    },
  });
  refetch();
}

const { isPending, isFetching, data, error, refetch } = useQuery<PaginatedResponse<Sale[]>>({
  queryKey: ["sales"],
  queryFn: () => getSales(filters.limit, 1, filters.startDate, filters.endDate),
  refetchOnWindowFocus: false,
});

const { filters } = useFilters(refetch, LIMIT);
</script>

<template class="flex flex-col items-center w-full gap-5">
  <Filters :limit="LIMIT" @refetch="refetch" />

  <div class="text-red-500" v-if="error">
    {{ error?.message || JSON.stringify(error) }}
  </div>

  <div class="w-full" v-else-if="isPending || isFetching">
    <el-skeleton class="w-full" :rows="filters.limit || LIMIT" animated />
  </div>

  <el-table v-else :data="data?.data" style="width: 100%" border stripe>
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

  <Pagination @change="handlePageChange" :page="page" :limit="filters.limit || LIMIT" :total="data?.meta.total || 0" />
</template>
