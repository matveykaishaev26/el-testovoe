<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getSales } from "../../api/sales";
import { type PaginatedResponse, type Sale } from "../../types";
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, watch } from "vue";

const LIMIT = 15;
const router = useRouter();
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);

const filters = reactive({
  startDate: (route.query.startDate as string) || "2024-01-01",
  endDate: (route.query.endDate as string) || "2025-01-01",
  limit: Number(route.query.limit) || LIMIT,
});
watch(
  filters,
  (newFilters) => {
    // Создаем новый объект с параметрами запроса
    const newQueryParams: Record<string, string | number> = {
      page: "1", // При изменении фильтров всегда сбрасываем на первую страницу
    };

    // Добавляем только те параметры, которые отличаются от значений по умолчанию
    if (newFilters.startDate !== "2024-01-01") {
      newQueryParams.startDate = newFilters.startDate;
    }
    if (newFilters.endDate !== "2025-01-01") {
      newQueryParams.endDate = newFilters.endDate;
    }
    if (newFilters.limit !== LIMIT) {
      newQueryParams.limit = newFilters.limit;
    }

    // Обновляем URL
    router.push({
      query: newQueryParams,
    });
    refetch();
  },
  { deep: true }
);

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
  // Добавляем все фильтры в queryKey
  queryKey: ["sales", page.value, { ...filters }],
  placeholderData: (previousData) => previousData,
  refetchOnWindowFocus: false,

  queryFn: () => getSales(filters.limit, page.value, filters.startDate, filters.endDate),
});
</script>

<template class="flex flex-col items-center w-full gap-5">
  <div class="flex w-full gap-4">
    <el-date-picker
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
      v-model="filters.startDate"
      type="date"
      placeholder="Дата от"
    />
    <el-date-picker
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
      v-model="filters.endDate"
      type="date"
      placeholder="Дата до"
      :disabled-date="
        (time: { getTime: number; }) => {
          if (filters.startDate) {
            return time.getTime < new Date(filters.startDate).getTime();
          }
          return false;
        }
      "
    />

    <el-select v-model="filters.limit" placeholder="Лимит" clearable>
      <el-option label="15" :value="15" />
      <el-option label="35" :value="35" />
      <el-option label="50" :value="50" />
    </el-select>
  </div>

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
  <el-pagination
    v-if="!isPending && data?.meta?.total && data.meta.total > LIMIT"
    background
    layout="prev, pager, next, jumper"
    :current-page="page"
    :page-size="filters.limit || LIMIT"
    :total="data?.meta.total || 0"
    @current-change="handlePageChange"
  />
</template>
