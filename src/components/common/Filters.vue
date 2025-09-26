<script lang="ts" setup>
import type { Filters } from "../../types";

defineProps<{
  filters: Filters;
}>();
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
    />
    <el-select v-model="filters.limit" placeholder="Лимит" clearable>
      <el-option :label="15" :value="15" />
      <el-option label="35" :value="35" />
      <el-option label="50" :value="50" />
    </el-select>
  </div>
</template>
