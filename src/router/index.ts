import { createWebHistory, createRouter } from "vue-router";
import Sales from "../pages/sales/Sales.vue";
import RootLayout from "../layouts/root/RootLayout.vue";
import Orders from "../pages/orders/Orders.vue";
import Incomes from "../pages/incomes/Incomes.vue";
import Stocks from "../pages/stocks/Stocks.vue";

const routes = [
  { path: "/", redirect: "/sales" }, // добавляем редирект
  {
    path: "/",
    component: RootLayout,
    children: [
      {
        path: "sales",
        component: Sales,
      },
      {
        path: "orders",
        component: Orders,
      },
      {
        path: "incomes",
        component: Incomes,
      },
        {
        path: "stocks",
        component: Stocks,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
