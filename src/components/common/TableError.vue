<script lang="ts" setup>
defineProps<{
  error: string;
}>();
</script>

<template>
  <div class="text-left red-500" v-if="error">
    {{ error }}
  </div>
</template>
