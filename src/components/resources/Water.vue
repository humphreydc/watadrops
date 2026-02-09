<script setup>
import { computed } from 'vue'
import { useLogs } from '@/composables/useLogs'

const { logs } = useLogs()

const waterLogs = computed(() => {
  return logs.value
    .filter(l => l.type === 'water')
    .sort((a, b) => a.date - b.date)
})

const totalWater = computed(() => {
  if (waterLogs.value.length === 0) return 0
  return waterLogs.value[waterLogs.value.length - 1].value
})

const lastMonthWater = computed(() => {
  if (waterLogs.value.length < 2) return 0
  return waterLogs.value[waterLogs.value.length - 2].value
})

const percentChange = computed(() => {
  if (!lastMonthWater.value) return 0

  return Math.round(
    ((totalWater.value - lastMonthWater.value) /
      lastMonthWater.value) * 100
  )
})

const percentUsed = computed(() => {
  const max = 500
  return Math.min(100, Math.round((totalWater.value / max) * 100))
})

const efficiencyLevel = computed(() => {
  const value = totalWater.value

  if (value < 100) return 5
  if (value < 200) return 4
  if (value < 300) return 3
  if (value < 400) return 2
  return 1
})

const changePositive = computed(() => percentChange.value > 0)
</script>

<template>
    <!-- Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony. 
    Then, everything changed when the Fire Nation attacked. Only the Avatar, master of 
    all four elements, could stop them, but when the world needed him most, he vanished. 
    -->
    <!-- Do you remember the 21st night of september? -->
    <!-- firebase crud operation -->
    <div class="flex flex-col sm:flex-row">
        <!-- water (flood control) -->
        <div class="card-border flex flex-col gap-6 w-full">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex justify-center items-center transition-all duration-300 hover:scale-110">
                        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M16.0001 13.3848C16.0001 14.6088 15.526 15.7828 14.6821 16.6483C14.203 17.1397 13.6269 17.5091 13 17.7364M19 13.6923C19 7.11538 12 2 12 2C12 2 5 7.11538 5 13.6923C5 15.6304 5.7375 17.4893 7.05025 18.8598C8.36301 20.2302 10.1436 20.9994 12.0001 20.9994C13.8566 20.9994 15.637 20.2298 16.9497 18.8594C18.2625 17.4889 19 15.6304 19 13.6923Z" stroke="#2b7fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-gray-400 text-sm font-medium">RESOURCE</div>
                        <div class="text-xl font-bold">Water</div>
                    </div>
                </div>
                    
                <div class="flex flex-col items-end gap-2">
                    <!-- here data -->
                    <div
                        class="text-center text-xs font-bold px-3 py-1 rounded-full border"
                        :class="changePositive
                            ? 'text-red-700 bg-red-100 border-red-200'
                            : 'text-green-700 bg-green-100 border-green-200'">
                        {{ changePositive ? '+' : '' }}{{ percentChange }}%
                    </div>
                    <div class="text-xs text-gray-400">vs last month</div>
                </div>
            </div>
                
            <!-- second inner section data  -->
            <div class="flex justify-between gap-2">
                <!-- basta kung ilang m^3 -->
                <div>
                    <div class="text-xs font-medium text-gray-500 mb-1">Total Consumption</div>
                    <div class="font-bold text-sm text-gray-400"><span class="text-3xl font-black text-black mr-1">{{ totalWater }}</span>m³</div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="text-xs text-blue-600 font-bold">EFFICIENCY LEVEL</div>
                    <div class="flex justify-end items-center gap-1">
                        <div v-for="i in 5" :key="i"
                            class="w-2 h-4 rounded-full"
                            :class="i <= efficiencyLevel ? 'bg-blue-500' : 'bg-gray-200'">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <!-- percent calc -->
                    <div class="text-xs text-gray-500 font-bold">Monthly usage</div>
                    <div class="text-xs font-bold">{{ percentUsed }}% Used</div>
                </div>
                <!-- same here -->
                <div class="w-full h-4 bg-gray-100 border border-gray-200 rounded-full flex items-center">
                    <div
                        class="bg-blue-400 h-4 rounded-full"
                        :style="{ width: percentUsed + '%' }">
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>