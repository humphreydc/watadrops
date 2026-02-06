<script setup>
import { ref, computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { db } from '@/firebase/config'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
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

// Active resource filter
const activeResource = ref('all')
const rawLogs = ref([])

// Map months to indices for grouping
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

onMounted(() => {
  const q = query(collection(db, 'logs'), orderBy('date', 'asc'))
  onSnapshot(q, (snapshot) => {
    rawLogs.value = snapshot.docs.map(doc => doc.data())
  })
})

// Processed stats for cards
const stats = computed(() => {
  const electricity = rawLogs.value.filter(l => l.type === 'electricity').reduce((acc, curr) => acc + curr.value, 0)
  const water = rawLogs.value.filter(l => l.type === 'water').reduce((acc, curr) => acc + curr.value, 0)
  
  return {
    electricity,
    water,
    supplies: 0 // Placeholder for supplies if needed
  }
})

// Group data by month for chart
const chartData = computed(() => {
  const monthlyData = monthNames.map(() => ({ electricity: 0, water: 0 }))
  
  rawLogs.value.forEach(log => {
    const date = log.date?.toDate ? log.date.toDate() : new Date(log.date)
    const month = date.getMonth()
    if (log.type === 'electricity') monthlyData[month].electricity += log.value
    if (log.type === 'water') monthlyData[month].water += log.value
  })

  const datasets = []
  
  if (activeResource.value === 'all' || activeResource.value === 'electricity') {
    datasets.push({
      label: 'Electricity (kWh)',
      data: monthlyData.map(d => d.electricity),
      borderColor: '#fbbf24',
      backgroundColor: '#fbbf2420',
      tension: 0.4,
      fill: true,
      borderWidth: 2
    })
  }
  
  if (activeResource.value === 'all' || activeResource.value === 'water') {
    datasets.push({
      label: 'Water (m³)',
      data: monthlyData.map(d => d.water),
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f620',
      tension: 0.4,
      fill: true,
      borderWidth: 2
    })
  }
  
  return {
    labels: monthNames,
    datasets
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      display: true, 
      position: 'top',
      labels: {
        boxWidth: 12,
        padding: 10,
        font: {
          size: window.innerWidth < 640 ? 10 : 12
        }
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      titleFont: {
        size: window.innerWidth < 640 ? 11 : 13
      },
      bodyFont: {
        size: window.innerWidth < 640 ? 10 : 12
      }
    }
  },
  scales: {
    y: { 
      beginAtZero: true,
      ticks: {
        font: {
          size: window.innerWidth < 640 ? 9 : 11
        }
      }
    },
    x: {
      ticks: {
        font: {
          size: window.innerWidth < 640 ? 9 : 11
        },
        maxRotation: window.innerWidth < 640 ? 45 : 0,
        minRotation: window.innerWidth < 640 ? 45 : 0
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
}

const filterResource = (resource) => {
  activeResource.value = resource
}
</script>

<template>
  <div class="resource-chart-container card-border w-full max-w-full overflow-hidden">
    <!-- Header -->
    <div class="flex flex-col gap-3 mb-4 sm:mb-6">
      <div>
        <h2 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">Resource Monitoring</h2>
        <p class="text-gray-600 text-xs sm:text-sm">Real-time campus resource usage</p>
      </div>
      
      <!-- Filter Buttons -->
      <div class="flex gap-2 w-full overflow-x-auto pb-1 -mx-1 px-1">
        <button
          @click="filterResource('all')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0',
            activeResource === 'all' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >All</button>
        <button
          @click="filterResource('electricity')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0',
            activeResource === 'electricity' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >Electricity</button>
        <button
          @click="filterResource('water')"
          :class="[
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0',
            activeResource === 'water' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >Water</button>
      </div>
    </div>
    
    <!-- Chart -->
    <div class="chart-wrapper w-full overflow-hidden">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
      <div class="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
        <span class="text-gray-600 text-xs sm:text-sm block mb-1">Total Electricity</span>
        <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{{ stats.electricity.toFixed(2) }} kWh</p>
      </div>
      <div class="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
        <span class="text-gray-600 text-xs sm:text-sm block mb-1">Total Water</span>
        <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{{ stats.water.toFixed(2) }} m³</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-wrapper { 
  position: relative; 
  width: 100%;
  height: 250px;
  max-width: 100%;
  box-sizing: border-box;
}

.chart-wrapper canvas {
  max-width: 100% !important;
  height: auto !important;
}

@media (min-width: 640px) {
  .chart-wrapper {
    height: 300px;
  }
}

@media (min-width: 1024px) {
  .chart-wrapper {
    height: 350px;
  }
}

/* Ensure container doesn't overflow */
.resource-chart-container {
  box-sizing: border-box;
}

.resource-chart-container * {
  box-sizing: border-box;
}
</style>