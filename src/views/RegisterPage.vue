<script setup>
import { ref } from 'vue'
const isLogin = ref(true)
const toggleMode = (mode) => {
  isLogin.value = mode === 'login'
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center px-4 py-8 relative overflow-hidden">
    <!-- Background Design -->
    <div class="absolute inset-0 bg-linear-to-br from-green-50 via-white to-blue-50"></div>
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Large circles - Blue and Green -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-24 left-1/3 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 -right-12 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-1000"></div>
      <div class="absolute bottom-1/4 -left-12 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-3000"></div>
      <div class="absolute top-1/3 left-1/2 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-5000"></div>
      <div class="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-6000"></div>
      <div class="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-7000"></div>
      <div class="absolute bottom-1/2 left-1/4 w-56 h-56 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-8000"></div>
      <div class="absolute top-2/3 right-1/3 w-56 h-56 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-9000"></div>
      <div class="absolute top-1/5 right-1/5 w-48 h-48 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-10000"></div>
      <div class="absolute bottom-1/5 left-2/3 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-11000"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <!-- Floating droplet shapes - Blue and Green -->
      <div class="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-25 animate-float"></div>
      <div class="absolute top-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-25 animate-float animation-delay-1000"></div>
      <div class="absolute bottom-1/3 left-1/3 w-4 h-4 bg-teal-400 rounded-full opacity-25 animate-float animation-delay-3000"></div>
      <div class="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-300 rounded-full opacity-25 animate-float animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/5 w-3 h-3 bg-green-300 rounded-full opacity-20 animate-float animation-delay-4000"></div>
      <div class="absolute bottom-1/2 right-1/5 w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float animation-delay-5000"></div>
      <div class="absolute top-2/5 left-2/5 w-3 h-3 bg-emerald-400 rounded-full opacity-25 animate-float animation-delay-6000"></div>
      <div class="absolute bottom-2/5 right-2/5 w-2 h-2 bg-cyan-400 rounded-full opacity-20 animate-float animation-delay-7000"></div>
      <div class="absolute top-3/5 left-3/5 w-3 h-3 bg-teal-300 rounded-full opacity-25 animate-float animation-delay-8000"></div>
      <div class="absolute bottom-3/5 right-3/5 w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float animation-delay-9000"></div>
    </div>
    
    <!-- Main Content -->
    <div class="w-full max-w-lg relative z-10">
      <div class="card-border py-6 px-8 sm:py-8 sm:px-12 bg-white/80 backdrop-blur-sm">
        <!-- Logo and Title -->
        <div class="flex flex-col items-center mb-8">
          <img 
            src="/src/assets/logo.png" 
            alt="Watts & Drops Logo" 
            class="w-12 sm:w-14 mb-3"
          >
          <div class="text-center">
            <h1 class="text-3xl sm:text-4xl font-black bg-linear-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-1">
              Watts & Drops
            </h1>
            <p class="text-xs sm:text-sm tracking-wide text-gray-600">
              Enterprise Resource Management
            </p>
          </div>
        </div>

        <!-- Tab Switcher -->
        <div class="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            @click="toggleMode('login')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all',
              isLogin 
                ? 'bg-white text-(--primary-color) shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Login
          </button>
          <button
            @click="toggleMode('signup')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all',
              !isLogin 
                ? 'bg-white text-(--primary-color) shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Sign Up
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="isLogin" class="space-y-4">
          <input
            type="text"
            class="input-border w-full px-4 py-2.5"
            placeholder="Email or Student Number"
          >
          <input
            type="password"
            class="input-border w-full px-4 py-2.5"
            placeholder="Password"
          >
          <div class="flex items-center justify-between text-sm p-2">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" class="mr-2 rounded cursor-pointer">
              <span class="text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-[--primary-color] hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            class="w-full py-2.5 bg-(--primary-color) cursor-pointer text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>

        <!-- Signup Form -->
        <form v-else class="space-y-4">
          <input
            type="text"
            class="input-border w-full px-4 py-2.5"
            placeholder="Student Number"
          >
          <input
            type="email"
            class="input-border w-full px-4 py-2.5"
            placeholder="Email Address"
          >
          <input
            type="password"
            class="input-border w-full px-4 py-2.5"
            placeholder="Password"
          >
          <input
            type="password"
            class="input-border w-full px-4 py-2.5"
            placeholder="Confirm Password"
          >
          <button
            type="submit"
            class="w-full py-2.5 bg-(--primary-color) cursor-pointer text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <!-- Footer -->
        <p class="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our 
          <a href="#" class="text-[--primary-color] hover:underline">Terms of Service</a> 
          and 
          <a href="#" class="text-[--primary-color] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grid pattern background */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Blob animation */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-7000 {
  animation-delay: 7s;
}

.animation-delay-8000 {
  animation-delay: 8s;
}

.animation-delay-9000 {
  animation-delay: 9s;
}

.animation-delay-10000 {
  animation-delay: 10s;
}

.animation-delay-11000 {
  animation-delay: 11s;
}

/* Float animation for droplets */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0.4;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>