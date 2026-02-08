<script setup>
import { Target, Leaf, Award, Droplets, TrendingUp, Zap } from 'lucide-vue-next';

const stats = [
  {
    title: "Water Savings",
    value: 72,
    description: "You're 72% towards your conservation goal",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    progressColor: "bg-gradient-to-r from-blue-400 to-blue-600",
    valueColor: "text-blue-600",
    descIcon: TrendingUp,
    descIconColor: "text-blue-500",
  },
  {
    title: "Carbon Saved",
    value: 85,
    description: "85 kg CO₂ reduced this month",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    progressColor: "bg-gradient-to-r from-green-400 to-green-600",
    valueColor: "text-green-600",
    descIcon: Leaf,
    descIconColor: "text-green-500",
  },
  {
    title: "Energy Efficiency",
    value: 91,
    description: "Excellent resource management",
    icon: Zap,
    color: "text-teal-600",
    bgColor: "bg-gradient-to-br from-teal-100 to-teal-200",
    progressColor: "bg-gradient-to-r from-teal-400 to-green-500",
    valueColor: "text-teal-600",
    descIcon: Award,
    descIconColor: "text-teal-500",
  },
];
</script>

<template>
  <div class="bg-white max-w-xl card-border">
    <div class="flex items-center gap-2 mb-8">
      <Droplets class="h-6 w-6 text-blue-500" />
      <h2 class="text-2xl font-bold ">
        Quick Stats
      </h2>
    </div>
    
    <div class="space-y-8">
      <div v-for="stat in stats" :key="stat.title">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div 
              class="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              :class="stat.bgColor"
            >
              <component :is="stat.icon" class="h-5 w-5" :class="stat.color" />
            </div>
            <span class="text-lg font-semibold text-gray-800">{{ stat.title }}</span>
          </div>
          <span class="text-2xl font-bold" :class="stat.valueColor">{{ stat.value }}%</span>
        </div>
        
        <!-- Progress Bar with Gradient -->
        <div class="relative h-4 w-full overflow-hidden rounded-full bg-linear-to-r from-gray-100 to-gray-200 mb-2">
          <div 
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="stat.progressColor"
            :style="{ width: `${stat.value}%` }"></div>
        </div>
        
        <p class="text-sm text-gray-600 flex items-center gap-1">
          <component :is="stat.descIcon" v-if="stat.descIcon" class="h-3.5 w-3.5" :class="stat.descIconColor" />
          {{ stat.description }}
        </p>
      </div>
    </div>
    
    <!-- Environmental Footer -->
    <div class="mt-8 pt-6 border-t border-green-100 flex items-center justify-center gap-2 text-sm text-gray-500">
      <Leaf class="h-4 w-4 text-green-500" />
      <span>Powered by Watts & Drops</span>
      <Droplets class="h-4 w-4 text-blue-500" />
    </div>
  </div>
</template>