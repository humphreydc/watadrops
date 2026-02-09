<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: 'chart',
    title: 'Real-Time Monitoring',
    description: 'Track electricity, water, and supply usage in real-time for better decision-making.',
    color: 'teal'
  },
  {
    icon: 'dashboard',
    title: 'Personal Dashboards',
    description: 'Students and staff can access individual dashboards to monitor personal consumption.',
    color: 'teal'
  },
  {
    icon: 'bell',
    title: 'Alerts & Notifications',
    description: 'Receive instant alerts about unusual usage or resource issues on campus.',
    color: 'teal'
  },
  {
    icon: 'clipboard',
    title: 'Request Management',
    description: 'Submit requests for resources or maintenance directly through the platform.',
    color: 'teal'
  },
  {
    icon: 'analytics',
    title: 'Analytics & Reports',
    description: 'View summarized usage reports to identify trends and improve efficiency.',
    color: 'teal'
  },
  {
    icon: 'shield',
    title: 'Secure Access',
    description: 'Role-based login ensures secure access for students, staff, and administrators.',
    color: 'teal'
  }
])
</script>

<template>
<section class="w-full py-12 sm:py-16 bg-white">
<div class="max-w-7xl mx-auto px-6 sm:px-8 text-teal-900">
  
  <!-- Section Title -->
  <h2 class="text-3xl sm:text-4xl font-black text-center text-teal-900 mb-12 sm:mb-16">
    Key Features
  </h2>
  
  <!-- Features Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    
    <!-- Real-Time Monitoring -->
    <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow card-border">
      <div class="flex items-start gap-4 mb-4">
        <div class="bg-gray-800 rounded-xl p-3 flex-shrink-0">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-teal-900 leading-tight">Real-Time Monitoring</h3>
      </div>
      <p class="text-sm text-teal-900 leading-relaxed">
        Track electricity, water, and supply usage in real-time for better decision-making.
      </p>
    </div>
    
    <!-- Personal Dashboards -->
    <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow card-border">
      <div class="flex items-start gap-4 mb-4">
        <div class="bg-gray-800 rounded-xl p-3 flex-shrink-0">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight">Personal Dashboards</h3>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">
        Students and staff can access individual dashboards to monitor personal consumption.
      </p>
    </div>
    
    <!-- Alerts & Notifications -->
    <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow card-border">
      <div class="flex items-start gap-4 mb-4">
        <div class="bg-gray-800 rounded-xl p-3 flex-shrink-0">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight">Alerts & Notifications</h3>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">
        Receive instant alerts about unusual usage or resource issues on campus.
      </p>
    </div>
    
    <!-- Request Management -->
    <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow card-border">
      <div class="flex items-start gap-4 mb-4">
        <div class="bg-gray-800 rounded-xl p-3 flex-shrink-0">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight">Request Management</h3>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">
        Submit requests for resources or maintenance directly through the platform.
      </p>
    </div>
    
    <!-- Analytics & Reports -->
    <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow card-border">
      <div class="flex items-start gap-4 mb-4">
        <div class="bg-gray-800 rounded-xl p-3 flex-shrink-0">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight">Analytics & Reports</h3>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">
        View summarized usage reports to identify trends and improve efficiency.
      </p>
    </div>
    
    <!-- Secure Access -->
    <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow card-border">
      <div class="flex items-start gap-4 mb-4">
        <div class="bg-gray-800 rounded-xl p-3 flex-shrink-0">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight">Secure Access</h3>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">
        Role-based login ensures secure access for students, staff, and administrators.
      </p>
    </div>
    
  </div>
</div>
</section>
</template>