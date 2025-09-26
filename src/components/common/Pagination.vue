<script lang="ts" setup>
defineProps<{
  page: number;
  total: number;
  limit: number;
}>();

const emit = defineEmits<{ (e: "change", page: number): void }>();
</script>

<template>
  <el-pagination
    v-if="total > limit"
    background
    layout="prev, pager, next, jumper"
    :current-page="page"
    :page-size="limit"
    :total="total"
      @current-change="(p: number) => emit('change', p)"
  />
</template>
