import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export const usePage = () => {
  const route = useRoute();
  const page = computed(() => Number(route.query.page) || 1);
  const router = useRouter();
  function handlePageChange(newPage: number) {
    router.push({
      query: {
        ...route.query,
        page: newPage.toString(),
      },
    });
  }

  return {
    page,
    handlePageChange,
  };
};
