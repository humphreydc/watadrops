<script setup>
import { ref, computed } from 'vue'
import { Target, Leaf, Award, Droplets, TrendingUp, Zap } from 'lucide-vue-next'

// Mock usage logs (replace with your real data or composables)
const usageLogs = ref({
  water: { current: 280, last: 400 },        // cubic meters
  carbon: { current: 45, last: 85 },         // kg CO2
  electricity: { current: 600, last: 800 },  // kWh
})

// Function to calculate improvement % (higher = better)
const calculateImprovement = (current, last) => {
  if (!last || last === 0) return 0
  const diff = last - current        // positive = improvement
  const percent = (diff / last) * 100
  return Math.max(0, Math.min(Math.round(percent), 100))
}

// Function for energy efficiency (higher = better)
const calculateEnergyEfficiency = (current, last) => {
  if (!last || last === 0) return 0
  const percent = (last / current) * 100
  return Math.max(0, Math.min(Math.round(percent), 100))
}

// Stats computed based on usage logs
const stats = computed(() => [
  {
    title: "Water Savings",
    value: calculateImprovement(usageLogs.value.water.current, usageLogs.value.water.last),
    description: `You're saving ${calculateImprovement(usageLogs.value.water.current, usageLogs.value.water.last)}% compared to last month`,
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    progressColor: "bg-blue-400",
    valueColor: "text-black",
    descIcon: TrendingUp,
    descIconColor: "text-blue-500",
  },
  {
    title: "Carbon Saved",
    value: calculateImprovement(usageLogs.value.carbon.current, usageLogs.value.carbon.last),
    description: `${usageLogs.value.carbon.last - usageLogs.value.carbon.current} kg CO₂ reduced this month`,
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    progressColor: "bg-green-400",
    valueColor: "text-black",
    descIcon: Leaf,
    descIconColor: "text-green-500",
  },
  {
    title: "Energy Efficiency",
    value: calculateEnergyEfficiency(usageLogs.value.electricity.current, usageLogs.value.electricity.last),
    description: "Excellent resource management",
    icon: Zap,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    progressColor: "bg-amber-400",
    valueColor: "text-black",
    descIcon: Award,
    descIconColor: "text-amber-500",
  },
])
</script>

<template>
  <div class="card-border">
    <div class="flex items-center gap-2 mb-6">
      <h2 class="text-2xl font-bold text-black">Quick Stats</h2>
    </div>

    <div class="space-y-8">
      <div v-for="stat in stats" :key="stat.title">
        <!-- Title + Value -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div 
              class="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
              :class="stat.bgColor"
            >
              <component :is="stat.icon" class="h-5 w-5" :class="stat.color" />
            </div>
            <span class="text-lg font-semibold text-gray-800">{{ stat.title }}</span>
          </div>
          <span class="text-2xl font-bold" :class="stat.valueColor">{{ stat.value }}%</span>
        </div>

        <!-- Progress Bar -->
        <div class="relative h-4 w-full overflow-hidden rounded-full bg-gray-100 border border-gray-200 mb-2">
          <div 
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="stat.progressColor"
            :style="{ width: `${stat.value}%` }">
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-gray-600 flex items-center gap-1">
          <component v-if="stat.descIcon" :is="stat.descIcon" class="h-3.5 w-3.5" :class="stat.descIconColor" />
          {{ stat.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-border {
  border: 1px solid #e5e7eb;
}
</style>
