<script lang="ts" setup>
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import type { Stock } from "../../../types";

const props = defineProps<{
  data: Stock[];
}>();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Группируем данные по складам
const groupedByWarehouse = computed(() => {
  const map = new Map<string, { priceSum: number; hasSupply: boolean }>();
  props.data.forEach((stock) => {
    const prev = map.get(stock.warehouse_name) || { priceSum: 0, hasSupply: false };
    prev.priceSum += Number(stock.price);
    prev.hasSupply = prev.hasSupply || stock.is_supply;
    map.set(stock.warehouse_name, prev);
  });
  return map;
});

// Данные для графика
const chartData = computed(() => ({
  labels: Array.from(groupedByWarehouse.value.keys()),
  datasets: [
    {
      label: "Сумма товаров по складам",
      data: Array.from(groupedByWarehouse.value.values()).map((v) => v.priceSum),
      backgroundColor: Array.from(groupedByWarehouse.value.values()).map((v) =>
        v.hasSupply ? "rgba(75, 192, 192, 0.7)" : "rgba(255, 99, 132, 0.7)"
      ),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Суммарная цена товаров на складах" },
  },
  scales: {
    x: { title: { display: true, text: "Склад" } },
    y: { title: { display: true, text: "Сумма (₽)" } },
  },
};
</script>

<template>
  <Bar :height="60" :width="300" :data="chartData" :options="chartOptions" />
</template>
