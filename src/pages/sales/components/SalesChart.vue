<script lang="ts" setup>
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "vue-chartjs";
import type { Sale } from "../../../types";

const props = defineProps<{
  data: Sale[];
}>();

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const labels = computed(() => props.data.map((item) => item.date) ?? []);
const totalPriceValues = computed(() => props.data.map((item) => Number(item.total_price)) ?? []);

const chartData = computed(() => ({
  labels: labels.value,

  datasets: [
    {
      label: "Цена",
      data: totalPriceValues.value,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.3, // сглаживание линии
      fill: true,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    x: {
      title: { display: true, text: "Дата" },
    },
    y: {
      title: { display: true, text: "Цена" },
    },
  },
};
</script>

<template>
  <Line :height="60" :width="300" :data="chartData" :options="chartOptions" />
</template>
