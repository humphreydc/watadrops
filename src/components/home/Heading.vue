<script setup>
</script>

<template>
  <header class="relative w-full flex justify-center items-center bg-white px-4 py-24 lg:py-36 overflow-hidden">

  <!-- Responsive Background Accents -->
  <div class="absolute inset-0 -z-10">
    <div class="
      absolute -top-12 -left-12
      w-65 h-65 sm:w-100 sm:h-100 lg:w-150 lg:h-150
      bg-blue-100 rounded-full blur-2xl sm:blur-3xl
      opacity-30 sm:opacity-40
      animate-slow">
    </div>

    <div class="
      absolute bottom-0 -right-12
      w-65 h-65 sm:w-100 sm:h-100 lg:w-150 lg:h-150
      bg-green-100 rounded-full blur-2xl sm:blur-3xl
      opacity-30 sm:opacity-40
      animate-slow delay-1000">
    </div>
  </div>

  <!-- Main Hero Content (unchanged) -->
  <div class="flex flex-col items-center gap-6 max-w-5xl">
    <img 
      src="/src/assets/logo.png" 
      alt="logo" 
      class="w-14 sm:w-20 lg:w-22 drop-shadow-md"
    >

    <h1 class="font-black text-4xl sm:text-6xl lg:text-7xl text-center leading-tight tracking-tight bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">
      Monitor Campus Resource <br>Consumption
    </h1>

    <p class="text-center text-base sm:text-lg max-w-3xl px-4">
      Watts & Drops empowers students and administrators to track electricity, water, and supply usage — helping build a smarter, greener, and more sustainable campus.
    </p>

    <div class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto mt-3">

      <router-link 
        to="/Register" 
        class="w-full sm:w-auto border border-(--primary-color) py-3 px-6 rounded-lg bg-(--primary-color) text-white text-center font-semibold hover:opacity-90 transition-all"
      >
        View Usage Data
      </router-link>

      <a 
        href="#features" 
        class="w-full sm:w-auto py-3 px-6 rounded-lg text-center font-semibold gradient-btn text-teal-900"
      >
        Explore Features
      </a>
    </div>

    <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-2">
      <span class="bg-gray-200 py-1.5 px-4 rounded-lg">Real-Time Monitoring</span>
      <span class="bg-gray-200 py-1.5 px-4 rounded-lg">Sustainability Reports</span>
      <span class="bg-gray-200 py-1.5 px-4 rounded-lg">Smart Insights</span>
    </div>

  </div>
</header>

</template>

<style scoped>
@keyframes slowMove {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.05);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.animate-slow {
  animation: slowMove 12s ease-in-out infinite;
}

.delay-1000 {
  animation-delay: 1s;
}
</style>

