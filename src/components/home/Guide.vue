<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
<section class="w-full py-16 sm:py-24 lg:py-32" id="guide">
<div class="container mx-auto px-4 sm:px-6 flex justify-center">
<div 
  class="relative bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg transition-all duration-1000"
  :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
>
  <!-- Overlay for contrast -->
  <div class="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-800/60 to-cyan-700/50"></div>
  
  <!-- Content -->
  <div class="relative h-full p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
    
    <!-- Title section -->
    <div class="space-y-3">
      <h1 class="font-black text-2xl sm:text-4xl lg:text-5xl max-w-xl text-white leading-tight">
        MONITOR YOUR CAMPUS<br>
        <span class="text-teal-300">SAVE RESOURCES</span>
      </h1>
      <p class="text-white text-base sm:text-lg font-medium max-w-lg">
        Real-time insights for sustainable campus management
      </p>
    </div>
    
    <!-- CTA section -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
      
      <!-- Chart icon -->
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-14 sm:h-14 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      
      <!-- CTA button -->
      <div class="px-6 py-3 sm:px-8 sm:py-4 bg-white font-bold text-sm sm:text-base rounded-lg shadow-lg w-full sm:w-auto text-center">
        START TRACKING TODAY
      </div>
      
    </div>
  </div>
</div>
</div>
</section>
</template>