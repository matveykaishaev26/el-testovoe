<script lang="ts" setup>
defineProps<{
  rows: number;
}>();
</script>

<template>
  <div class="w-full">
    <el-skeleton class="w-full" :rows="rows" animated />
  </div>
</template>
