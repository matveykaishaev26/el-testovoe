// composables/useFilters.ts
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useFilters(refetch: () => void, limit: number = 15) {
  const router = useRouter();
  const route = useRoute();

  const filters = reactive({
    startDate: (route.query.startDate as string) || "2024-01-01",
    endDate: (route.query.endDate as string) || "2025-01-01",
    limit: Number(route.query.limit) || limit,
  });

  watch(
    filters,
    (newFilters) => {
      const newQueryParams: Record<string, string | number> = {
        page: "1",
      };

      if (newFilters.startDate !== "2024-01-01") newQueryParams.startDate = newFilters.startDate;
      if (newFilters.endDate !== "2025-01-01") newQueryParams.endDate = newFilters.endDate;
      if (newFilters.limit !== limit) newQueryParams.limit = newFilters.limit;

      router.push({ query: newQueryParams });
      refetch();
    },
    { deep: true }
  );

  return { filters };
}
