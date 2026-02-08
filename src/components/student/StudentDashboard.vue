<script setup>
import { ref } from 'vue'

const activeView = ref('overview')
const isDarkMode = ref(false)

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'monitoring' },
  { id: 'request', label: 'Request', icon: 'assignment' },
  { id: 'announcement', label: 'Announcement', icon: 'campaign' }
]

const switchView = (viewId) => {
  activeView.value = viewId
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  // You can implement dark mode logic here
}

// Form data
const formData = ref({
  location: '',
  resourceType: '',
  description: ''
})

const handleSubmit = () => {
  alert('Maintenance request submitted successfully!')
  formData.value = {
    location: '',
    resourceType: '',
    description: ''
  }
}
</script>

<template>
  <div class="flex bg-white text-gray-800 min-h-screen">

    <!-- Main Content -->
    <main class="ml-60 flex-1">


      <!-- Overview Section -->
      <section v-show="activeView === 'overview'" class="px-12 py-8 animate-fade-in">
        

        <!-- Monitor Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Energy Monitor Card -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-start mb-4">
              <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">ENERGY MONITOR</span>
              <span class="text-xs font-bold rounded-full px-2.5 py-1 text-green-600 bg-green-50">↑ 12%</span>
            </div>
            <div class="text-5xl font-extrabold mb-4">24.8 <span class="text-base text-gray-500 font-normal">kWh</span></div>
            <div class="flex justify-between text-xs font-bold text-gray-300 mb-2">
              <span>MONTHLY LIMIT</span>
              <span class="text-energy-yellow">45% CONSUMED</span>
            </div>
            <div class="flex gap-1">
              <div class="h-2 flex-1 rounded bg-energy-yellow"></div>
              <div class="h-2 flex-1 rounded bg-energy-yellow"></div>
              <div class="h-2 flex-1 rounded bg-energy-yellow"></div>
              <div class="h-2 flex-1 rounded bg-energy-yellow"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
            </div>
          </div>

          <!-- Water Monitor Card -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-start mb-4">
              <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">WATER MONITOR</span>
              <span class="text-xs font-bold rounded-full px-2.5 py-1 text-red-600 bg-red-50">↓ 2%</span>
            </div>
            <div class="text-5xl font-extrabold mb-4">24.8 <span class="text-base text-gray-500 font-normal">m³</span></div>
            <div class="flex justify-between text-xs font-bold text-gray-300 mb-2">
              <span>MONTHLY LIMIT</span>
              <span class="text-water-blue">45% CONSUMED</span>
            </div>
            <div class="flex gap-1">
              <div class="h-2 flex-1 rounded bg-water-blue"></div>
              <div class="h-2 flex-1 rounded bg-water-blue"></div>
              <div class="h-2 flex-1 rounded bg-water-blue"></div>
              <div class="h-2 flex-1 rounded bg-water-blue"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
              <div class="h-2 flex-1 rounded bg-gray-100"></div>
            </div>
          </div>
        </div>

        <!-- Comparison Card -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h3 class="text-lg font-semibold mb-4">Usage Trend Comparison</h3>
          <div class="flex flex-col lg:flex-row gap-10 pt-2">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl">
                <i class="fas fa-bolt"></i>
              </div>
              <div>
                <h4 class="font-semibold mb-0.5">Electricity Consumption</h4>
                <p class="text-sm text-gray-400">24.8kWh this month • 28.3kWh last month</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                <i class="fas fa-tint"></i>
              </div>
              <div>
                <h4 class="font-semibold mb-0.5">Water Consumption</h4>
                <p class="text-sm text-gray-400">24.8m³ this month • 28.3m³ last month</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Savings Section -->
        <div class="bg-green-200 p-8 rounded-2xl">
          <h3 class="text-xl text-green-900 mb-5 border-b-2 border-green-300 inline-block pb-1">Monthly Saving Overview</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 flex items-center gap-5">
              <i class="fas fa-bolt text-yellow-500 text-2xl"></i>
              <div>
                <div class="text-xs text-gray-500">Electricity Saved</div>
                <div class="text-2xl font-bold">3.5 kWh</div>
                <div class="text-xs text-gray-500 mt-0.5">↓ 12% from last month</div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-5 flex items-center gap-5">
              <i class="fas fa-tint text-blue-500 text-2xl"></i>
              <div>
                <div class="text-xs text-gray-500">Water Saved</div>
                <div class="text-2xl font-bold">3.5 m³</div>
                <div class="text-xs text-gray-500 mt-0.5">↑ 5% from last month</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Request Section -->
      <section v-show="activeView === 'request'" class="px-12 py-8 animate-fade-in">
        <h1 class="text-3xl font-bold mb-8">Submit Maintenance Request</h1>
        <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
          <!-- Form Card -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold mb-5">Request Details</h3>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="block font-semibold mb-2 text-sm">Room / Location</label>
                <input 
                  v-model="formData.location"
                  type="text" 
                  placeholder="Enter room / location" 
                  class="w-full px-3 py-3 border border-gray-800 rounded-lg outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                >
              </div>
              <div class="mb-4">
                <label class="block font-semibold mb-2 text-sm">Resource Type</label>
                <select 
                  v-model="formData.resourceType"
                  class="w-full px-3 py-3 border border-gray-800 rounded-lg outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                >
                  <option value="">Select resource type</option>
                  <option value="electricity">Electricity</option>
                  <option value="water">Water</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block font-semibold mb-2 text-sm">Issue Description</label>
                <textarea 
                  v-model="formData.description"
                  placeholder="Please describe the issue in detail.." 
                  class="w-full px-3 py-3 border border-gray-800 rounded-lg outline-none h-24 resize-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="w-full py-3.5 bg-brand-green text-white rounded-lg font-bold cursor-pointer mt-2.5 hover:bg-opacity-90 transition"
              >
                Submit to Maintenance
              </button>
            </form>
          </div>

          <!-- Awareness Card -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold mb-5">Maintenance Awareness</h3>
            <div>
              <div class="flex gap-4 mb-5 text-sm leading-relaxed">
                <div class="bg-light-green text-white min-w-[24px] h-6 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                <p>Identify the specific room or area where the issue occurs.</p>
              </div>
              <div class="flex gap-4 mb-5 text-sm leading-relaxed">
                <div class="bg-light-green text-white min-w-[24px] h-6 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                <p>Fill out the request form. Your report will be visible on the overview page, but your identity remains private.</p>
              </div>
              <div class="flex gap-4 mb-5 text-sm leading-relaxed">
                <div class="bg-light-green text-white min-w-[24px] h-6 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                <p>Once maintenance resolves the issue, the alert will be cleared.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Announcement Section -->
      <section v-show="activeView === 'announcement'" class="px-12 py-8 animate-fade-in">
        <h1 class="text-3xl font-bold mb-8">Announcement</h1>
        <div>
          <!-- Available Announcement 1 -->
          <div class="rounded-xl overflow-hidden mb-5 shadow-sm border border-gray-200">
            <div class="px-5 py-2.5 bg-light-green font-bold text-sm text-white">Available</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-white">
              <div>
                <span class="block text-gray-500 text-xs mb-1">Location</span>
                <span class="font-bold text-base">CSS 305</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs mb-1">Time</span>
                <span class="font-bold text-base">9:00 AM - 10:40 PM</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs mb-1">Type</span>
                <span class="font-bold text-base">Water Usage</span>
              </div>
            </div>
          </div>

          <!-- Available Announcement 2 -->
          <div class="rounded-xl overflow-hidden mb-5 shadow-sm border border-gray-200">
            <div class="px-5 py-2.5 bg-light-green font-bold text-sm text-white">Available</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-white">
              <div>
                <span class="block text-gray-500 text-xs mb-1">Location</span>
                <span class="font-bold text-base">CSS 411</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs mb-1">Time</span>
                <span class="font-bold text-base">9:00 AM - 10:40 PM</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs mb-1">Type</span>
                <span class="font-bold text-base">Electricity Usage</span>
              </div>
            </div>
          </div>

          <!-- Unavailable Announcement -->
          <div class="rounded-xl overflow-hidden mb-5 shadow-sm border border-gray-200">
            <div class="px-5 py-2.5 bg-yellow-200 font-bold text-sm text-gray-800">Not Available</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-white">
              <div>
                <span class="block text-gray-500 text-xs mb-1">Location</span>
                <span class="font-bold text-base">CSS 404</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs mb-1">Time</span>
                <span class="font-bold text-base">10:00 AM - 12:40 PM</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs mb-1">Type</span>
                <span class="font-bold text-base">Electricity Usage</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>