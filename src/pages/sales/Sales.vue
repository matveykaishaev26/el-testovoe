<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getSales } from "../../api/sales";
import { type PaginatedResponse, type Sale } from "../../types";
import { computed } from "vue";
import Filters from "../../components/common/Filters.vue";
import Pagination from "../../components/common/Pagination.vue";
import { useFilters } from "../../hooks/useFilters";
import SalesChart from "./components/SalesChart.vue";
import SalesTable from "./components/SalesTable.vue";
import TableSkeleton from "../../components/common/TableSkeleton.vue";
import TableError from "../../components/common/TableError.vue";
import { usePage } from "../../hooks/usePage";

const LIMIT = 15;
const { page, handlePageChange } = usePage();

const { filters } = useFilters();
const queryKey = computed(() => ["sales", filters.limit, filters.startDate, filters.endDate, page.value]);
const { isPending, isFetching, data, error, refetch } = useQuery<PaginatedResponse<Sale[]>>({
  queryKey: queryKey,
  queryFn: () => getSales(filters.limit, page.value, filters.startDate, filters.endDate),
  refetchOnWindowFocus: false,
});
</script>

<template class="flex flex-col items-center w-full gap-5">
  <Filters :filters="filters" :limit="LIMIT" @refetch="refetch" />
  <SalesChart :data="data?.data || []" v-if="!isPending && !isFetching" />
  <TableError :error="error?.message || JSON.stringify(error)" v-if="error" />
  <TableSkeleton :rows="filters.limit || LIMIT" v-else-if="isPending || isFetching" />
  <SalesTable v-else :data="data?.data || []" />
  <Pagination
    @change="handlePageChange"
    v-if="!isPending && data?.meta?.total && data.meta.total > LIMIT"
    :page="page"
    :limit="filters.limit || LIMIT"
    :total="data?.meta.total || 0"
  />
</template>
