<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { type Income, type PaginatedResponse } from "../../types";
import { computed } from "vue";
import Filters from "../../components/common/Filters.vue";
import Pagination from "../../components/common/Pagination.vue";
import { useFilters } from "../../hooks/useFilters";
import { usePage } from "../../hooks/usePage";
import IncomesTable from "./components/IncomesTable.vue";
import IncomesChart from "./components/IncomesChart.vue";
import TableSkeleton from "../../components/common/TableSkeleton.vue";
import { getIncomes } from "../../api/incomes";
import TableError from "../../components/common/TableError.vue";
const LIMIT = 15;
const { page, handlePageChange } = usePage();
const { filters } = useFilters();
const queryKey = computed(() => ["incomes", filters.limit, filters.startDate, filters.endDate, page.value]);
const { isPending, isFetching, data, error } = useQuery<PaginatedResponse<Income[]>>({
  queryKey: queryKey,
  queryFn: () => getIncomes(filters.limit, page.value, filters.startDate, filters.endDate),
  refetchOnWindowFocus: false,
});
</script>

<template class="flex flex-col items-center w-full gap-5">
  <Filters :filters="filters" :limit="LIMIT" />
  <IncomesChart :data="data?.data || []" v-if="!isPending && !isFetching" />
  <IncomesTable v-if="!isPending && !isFetching" :data="data?.data || []" />
  <TableError :error="error?.message || JSON.stringify(error)" v-if="error" />
  <TableSkeleton :rows="filters.limit || LIMIT" v-else-if="isPending || isFetching" />
  <Pagination
    @change="handlePageChange"
    v-if="!isPending && data?.meta?.total && data.meta.total > LIMIT"
    :page="page"
    :limit="filters.limit || LIMIT"
    :total="data?.meta.total || 0"
  />
</template>
