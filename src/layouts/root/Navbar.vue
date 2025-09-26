<template>
  <div>
    <nav class="flex gap-2">
      <RouterLink to="/incomes" class="btn" :class="{ 'btn-active': $route.path === '/incomes' }"> Incomes </RouterLink>

      <RouterLink to="/orders" class="btn" :class="{ 'btn-active': $route.path === '/orders' }"> Orders </RouterLink>

      <RouterLink to="/sales" class="btn" :class="{ 'btn-active': $route.path === '/sales' }"> Sales </RouterLink>

      <RouterLink to="/stocks" class="btn" :class="{ 'btn-active': $route.path === '/stocks' }"> Stocks </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  background-color: #409eff; /* default Element Plus color */
  color: white;
  border-radius: 4px;
  text-decoration: none;
}
.btn-active {
  background-color: #2f70b0; /* зеленый для активного */
}
</style>
