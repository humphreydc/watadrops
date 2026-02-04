<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Props for customization
const props = defineProps({
  timeRange: {
    type: String,
    default: 'month' // 'day', 'week', 'month'
  }
})

// Active resource filter
const activeResource = ref('all')

// Sample data - replace with real API data
const resourceData = {
  electricity: {
    label: 'Electricity (kWh)',
    data: [245, 268, 234, 289, 256, 298, 267, 301, 278, 312, 289, 325],
    color: '#fbbf24', // yellow
    unit: 'kWh'
  },
  water: {
    label: 'Water (m³)',
    data: [120, 135, 118, 142, 129, 151, 138, 156, 142, 162, 148, 168],
    color: '#3b82f6', // blue
    unit: 'm³'
  },
  supplies: {
    label: 'Supplies Usage (%)',
    data: [65, 58, 71, 54, 68, 49, 73, 45, 69, 41, 75, 38],
    color: '#ef4444', // red
    unit: '%'
  }
}

// Time labels based on range
const timeLabels = {
  day: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
  week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

// Computed chart data
const chartData = computed(() => {
  const datasets = []
  
  if (activeResource.value === 'all' || activeResource.value === 'electricity') {
    datasets.push({
      label: resourceData.electricity.label,
      data: resourceData.electricity.data,
      borderColor: resourceData.electricity.color,
      backgroundColor: resourceData.electricity.color + '20',
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true
    })
  }
  
  if (activeResource.value === 'all' || activeResource.value === 'water') {
    datasets.push({
      label: resourceData.water.label,
      data: resourceData.water.data,
      borderColor: resourceData.water.color,
      backgroundColor: resourceData.water.color + '20',
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true
    })
  }
  
  if (activeResource.value === 'all' || activeResource.value === 'supplies') {
    datasets.push({
      label: resourceData.supplies.label,
      data: resourceData.supplies.data,
      borderColor: resourceData.supplies.color,
      backgroundColor: resourceData.supplies.color + '20',
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true
    })
  }
  
  return {
    labels: timeLabels[props.timeRange],
    datasets
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#4b5563',
        font: {
          size: 10,
          family: 'Inter, sans-serif'
        },
        padding: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 6,
        boxHeight: 6
      }
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 8,
      displayColors: true,
      titleFont: {
        size: 12
      },
      bodyFont: {
        size: 11
      },
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          label += context.parsed.y
          return label
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: '#e5e7eb',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 9
        },
        maxRotation: 0,
        minRotation: 0
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#e5e7eb',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 9
        }
      }
    }
  }
}

// Filter buttons
const filterResource = (resource) => {
  activeResource.value = resource
}
</script>

<template>
  <div class="resource-chart-container bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200 w-full max-w-full overflow-hidden">
    <!-- Header -->
    <div class="flex flex-col gap-3 mb-4 sm:mb-6">
      <div>
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-1">Resource Monitoring</h2>
        <p class="text-gray-600 text-xs sm:text-sm">Real-time campus resource usage</p>
      </div>
      
      <!-- Filter Buttons -->
      <div class="grid grid-cols-2 sm:flex gap-2 w-full">
        <button
          @click="filterResource('all')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all sm:flex-none',
            activeResource === 'all'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          All
        </button>
        <button
          @click="filterResource('electricity')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all sm:flex-none',
            activeResource === 'electricity'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Electricity
        </button>
        <button
          @click="filterResource('water')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all sm:flex-none',
            activeResource === 'water'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Water
        </button>
        <button
          @click="filterResource('supplies')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all sm:flex-none',
            activeResource === 'supplies'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Supplies
        </button>
      </div>
    </div>
    
    <!-- Chart -->
    <div class="chart-wrapper w-full" style="height: 300px;">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
      <!-- Electricity Card -->
      <div class="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600 text-xs sm:text-sm">Electricity</span>
          <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
        </div>
        <p class="text-xl sm:text-2xl font-bold text-gray-900">325 kWh</p>
        <p class="text-xs sm:text-sm text-green-600 mt-1">↑ 12% from last period</p>
      </div>
      
      <!-- Water Card -->
      <div class="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600 text-xs sm:text-sm">Water</span>
          <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
        </div>
        <p class="text-xl sm:text-2xl font-bold text-gray-900">168 m³</p>
        <p class="text-xs sm:text-sm text-green-600 mt-1">↑ 8% from last period</p>
      </div>
      
      <!-- Supplies Card -->
      <div class="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600 text-xs sm:text-sm">Supplies</span>
          <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
        </div>
        <p class="text-xl sm:text-2xl font-bold text-gray-900">38%</p>
        <p class="text-xs sm:text-sm text-red-600 mt-1">↓ 27% from last period</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-chart-container {
  background: #ffffff;
}

.chart-wrapper {
  position: relative;
}
</style>