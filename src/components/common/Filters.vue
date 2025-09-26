<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const emit = defineEmits(["refetch"]);
const LIMIT = 15;
const router = useRouter();
const route = useRoute();
// const page = computed(() => Number(route.query.page) || 1);
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
    emit("refetch");
    // refetch();
  },

  { deep: true }
);
</script>

<template>
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
  </div>
</template>
