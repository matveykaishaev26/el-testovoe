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
import type { Order } from "../../../types";

const props = defineProps<{
  data: Order[];
}>();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Группируем данные по областям
const groupedByOblast = computed(() => {
  const map = new Map<string, { total: number; hasCancelled: boolean }>();
  props.data.forEach((order) => {
    const prev = map.get(order.oblast) || { total: 0, hasCancelled: false };
    prev.total += Number(order.total_price);
    prev.hasCancelled = prev.hasCancelled || order.is_cancel;
    map.set(order.oblast, prev);
  });
  return map;
});

// Данные для графика
const chartData = computed(() => ({
  labels: Array.from(groupedByOblast.value.keys()),
  datasets: [
    {
      label: "Доход по регионам",
      data: Array.from(groupedByOblast.value.values()).map((v) => v.total),
      backgroundColor: Array.from(groupedByOblast.value.values()).map((v) =>
        v.hasCancelled ? "rgba(255, 77, 79, 0.7)" : "rgba(75, 192, 192, 0.7)"
      ),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Доход по регионам" },
  },
  scales: {
    x: { title: { display: true, text: "Регион" } },
    y: { title: { display: true, text: "Сумма (₽)" } },
  },
};
</script>

<template>
  <Bar :height="60" :width="300" :data="chartData" :options="chartOptions" />
</template>
