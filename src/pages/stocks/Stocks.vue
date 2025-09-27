<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { type PaginatedResponse,  type Stock } from "../../types";
import { computed } from "vue";
import Filters from "../../components/common/Filters.vue";
import Pagination from "../../components/common/Pagination.vue";
import { useFilters } from "../../hooks/useFilters";
import TableSkeleton from "../../components/common/TableSkeleton.vue";
import StocksChart from "./components/StocksChart.vue";
import StocksTable from "./components/StocksTable.vue";
import TableError from "../../components/common/TableError.vue";
import { usePage } from "../../hooks/usePage";
import { getStocks } from "../../api/stocks";
import { getFormattedDate } from "../../utils/date";

const LIMIT = 15;
const start = new Date();
start.setDate(start.getDate());
const DEFAULT_START_DATE = getFormattedDate(start);

const end = new Date(); // сегодня
const DEFAULT_END_DATE = getFormattedDate(end);

const { page, handlePageChange } = usePage();

const { filters } = useFilters(LIMIT, DEFAULT_START_DATE, DEFAULT_END_DATE);
const queryKey = computed(() => ["stocks", filters.limit, filters.startDate, filters.endDate, page.value]);
const { isPending, isFetching, data, error, refetch } = useQuery<PaginatedResponse<Stock[]>>({
  queryKey: queryKey,
  queryFn: () => getStocks(filters.limit, page.value, filters.startDate, filters.endDate),
  refetchOnWindowFocus: false,
});
</script>

<template class="flex flex-col items-center w-full gap-5">
  <Filters :filters="filters" :limit="LIMIT" @refetch="refetch" />
  <StocksChart :data="data?.data || []" v-if="!isPending && !isFetching" />
  <TableError :error="error?.message || JSON.stringify(error)" v-if="error" />
  <TableSkeleton :rows="filters.limit || LIMIT" v-else-if="isPending || isFetching" />
  <StocksTable v-else :data="data?.data || []" />
  <Pagination
    @change="handlePageChange"
    v-if="!isPending && data?.meta?.total && data.meta.total > LIMIT"
    :page="page"
    :limit="filters.limit || LIMIT"
    :total="data?.meta.total || 0"
  />
</template>
