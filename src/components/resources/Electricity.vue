<script setup>
import { computed } from 'vue'
import { useLogs } from '@/composables/useLogs'

const { logs } = useLogs()

const electricityLogs = computed(() => {
  return logs.value
    .filter(l => l.type === 'electricity')
    .sort((a, b) => a.date - b.date)
})

const totalElectricity = computed(() => {
  if (electricityLogs.value.length === 0) return 0
  return electricityLogs.value[electricityLogs.value.length - 1].value
})

const lastMonthElectricity = computed(() => {
  if (electricityLogs.value.length < 2) return 0
  return electricityLogs.value[electricityLogs.value.length - 2].value
})

const percentChange = computed(() => {
  if (!lastMonthElectricity.value) return 0

  return Math.round(
    ((totalElectricity.value - lastMonthElectricity.value) /
      lastMonthElectricity.value) * 100
  )
})

const percentUsed = computed(() => {
  const max = 1000
  return Math.min(100, Math.round((totalElectricity.value / max) * 100))
})

const peakLevel = computed(() => {
  const value = totalElectricity.value

  if (value < 200) return 1
  if (value < 400) return 2
  if (value < 600) return 3
  if (value < 800) return 4
  return 5
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
        <!-- Electricity (meralco) -->
        <div class="card-border flex flex-col gap-6 w-full">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-100 rounded-xl flex justify-center items-center transition-all duration-300 hover:scale-110">
                        <svg class="w-8 h-8" fill="none" stroke="#fe9a00" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-gray-400 text-sm font-medium">INFRASTRUCTURE</div>
                        <div class="text-xl font-bold">Electricity</div>
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
                <!-- basta kung ilang kwh -->
                <div>
                    <div class="text-xs font-medium text-gray-500 mb-1">Total Consumption</div>
                    <div class="font-bold text-sm text-gray-400"><span class="text-3xl font-black text-black mr-1">{{ totalElectricity }}</span>kWh</div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="text-xs text-amber-600 font-bold">PEAK LOAD STATUS</div>
                    <div class="flex justify-end items-center gap-1">
                        <div v-for="i in 5" :key="i"
                            class="w-2 h-4 rounded-full"
                            :class="i <= peakLevel ? 'bg-amber-500' : 'bg-gray-200'">
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
                        class="bg-amber-400 h-4 rounded-full"
                        :style="{ width: percentUsed + '%' }">
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>