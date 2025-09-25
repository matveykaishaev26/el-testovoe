import { createWebHistory, createRouter } from "vue-router";
import Sales from "../pages/sales/Sales.vue";
import RootLayout from "../layouts/root/RootLayout.vue";

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
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
