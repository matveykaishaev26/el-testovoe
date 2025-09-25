<script lang="ts" setup>
import Navbar from "./Navbar.vue";
</script>

<template>
  <div class="flex flex-col items-center p-10 gap-5">
    <Navbar />
    <router-view />
  </div>
</template>
