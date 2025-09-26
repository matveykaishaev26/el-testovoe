// composables/useFilters.ts
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const DEFAULT_START_DATE = "2025-01-01";
const DEFAULT_END_DATE = "2025-01-15";
export function useFilters(limit: number = 15) {

  const router = useRouter();
  const route = useRoute();

  const filters = reactive({
    startDate: (route.query.startDate as string) || DEFAULT_START_DATE,
    endDate: (route.query.endDate as string) || DEFAULT_END_DATE,
    limit: Number(route.query.limit) || limit,
  });

  watch(
    filters,
    (newFilters) => {
      const newQueryParams: Record<string, string | number> = {
        ...route.query,
        page: "1",
      };

      if (newFilters.startDate !== DEFAULT_START_DATE) newQueryParams.startDate = newFilters.startDate;
      if (newFilters.endDate !== DEFAULT_END_DATE) newQueryParams.endDate = newFilters.endDate;
      if (newFilters.limit !== limit) newQueryParams.limit = newFilters.limit;
      console.log(newFilters);
      router.push({ query: newQueryParams });
    },
    { deep: true }
  );

  return { filters };
}
