<script lang="ts" setup></script>

<template>
  <div>
    <nav class="flex gap-2">
      <RouterLink to="/incomes"> <el-button type="primary">Incomes</el-button></RouterLink>
      <RouterLink to="/orders"> <el-button type="primary">Orders</el-button></RouterLink>
      <RouterLink to="/sales"> <el-button type="primary">Sales</el-button></RouterLink>
      <RouterLink to="/stocks"> <el-button type="primary">Stocks</el-button></RouterLink>
      <!-- <el-button type="primary">Incomes</el-button>
      <el-button type="primary">Orders</el-button>
      <el-button type="primary">Sales</el-button>
      <el-button type="primary">Stocks</el-button> -->
    </nav>
  </div>
</template>
