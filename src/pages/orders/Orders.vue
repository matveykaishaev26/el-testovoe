<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { type Order, type PaginatedResponse } from "../../types";
import { computed } from "vue";
import Filters from "../../components/common/Filters.vue";
import Pagination from "../../components/common/Pagination.vue";
import { useFilters } from "../../hooks/useFilters";
import { usePage } from "../../hooks/usePage";
import { getOrders } from "../../api/orders";
import OrdersTable from "./components/OrdersTable.vue";
import OrdersChart from "./components/OrdersChart.vue";
import TableSkeleton from "../../components/common/TableSkeleton.vue";
import TableError from "../../components/common/TableError.vue";
const LIMIT = 15;
const { page, handlePageChange } = usePage();
const { filters } = useFilters();
const queryKey = computed(() => ["orders", filters.limit, filters.startDate, filters.endDate, page.value]);
const { isPending, isFetching, data, error } = useQuery<PaginatedResponse<Order[]>>({
  queryKey: queryKey,
  queryFn: () => getOrders(filters.limit, page.value, filters.startDate, filters.endDate),
  refetchOnWindowFocus: false,
});
</script>

<template class="flex flex-col items-center w-full gap-5">
  <Filters :filters="filters" :limit="LIMIT" />
  <OrdersChart :data="data?.data || []" v-if="!isPending && !isFetching" />
  <OrdersTable v-if="!isPending && !isFetching" :data="data?.data || []" />
  <TableError :error="error?.message || JSON.stringify(error)" v-if="error" />
  <TableSkeleton :rows="filters.limit || LIMIT" v-else-if="isPending || isFetching" />
  <Pagination
    v-if="!isPending && data?.meta?.total && data.meta.total > LIMIT"
    @change="handlePageChange"
    :page="page"
    :limit="filters.limit || LIMIT"
    :total="data?.meta.total || 0"
  />
</template>
