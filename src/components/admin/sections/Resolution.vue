<script setup>
import { computed, ref } from 'vue'
import { useRequests } from '@/composables/useRequests'

// Lucide icons
import { Droplets, Zap, Building, Hammer, FileText } from 'lucide-vue-next'

const { requests, loading } = useRequests()

// Selected category filter
const selectedCategory = ref('All')

// Available categories
const categories = ['All', 'Water', 'Electricity', 'Facility', 'Equipment', 'Other']

// Filter resolved requests
const resolved = computed(() => {
  const resolvedRequests = requests.value.filter(
    r => r.status && r.status.toLowerCase() === 'resolved'
  )
  if (selectedCategory.value === 'All') return resolvedRequests
  return resolvedRequests.filter(r => r.category === selectedCategory.value)
})

// Format timestamp
const formatTime = (t) => {
  if (!t) return ''
  const d = t.toDate ? t.toDate() : new Date(t)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Format date
const formatDate = (t) => {
  if (!t) return ''
  const d = t.toDate ? t.toDate() : new Date(t)
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

// Duration between creation and resolution
const getDuration = (r) => {
  if (!r.createdAt || !r.resolvedAt) return ''
  const start = r.createdAt.toDate ? r.createdAt.toDate() : new Date(r.createdAt)
  const end = r.resolvedAt.toDate ? r.resolvedAt.toDate() : new Date(r.resolvedAt)
  const diff = Math.abs(end - start)
  const mins = Math.floor(diff / 60000)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

// Map categories to Lucide icons + colors
const categoryIcons = {
  Water: { icon: Droplets, color: 'text-blue-500' },
  Electricity: { icon: Zap, color: 'text-yellow-500' },
  Facility: { icon: Building, color: 'text-purple-500' },
  Equipment: { icon: Hammer, color: 'text-orange-500' },
  Other: { icon: FileText, color: 'text-gray-500' }
}

// Get category icon component + color
const getCategoryIcon = (category) => categoryIcons[category] || categoryIcons.Other
</script>

<template>
<section class="p-4 lg:px-8 lg:py-12 min-h-[70vh] fade-up">

  <!-- Header -->
  <div class="mb-6">
    <div class="flex items-start justify-between flex-wrap gap-4 mb-3">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Resolved Reports
        </h1>  
        <p class="text-sm text-gray-600">
          History of completed maintenance reports
        </p> 
      </div>
      <div v-if="!loading && resolved.length > 0" class="bg-green-50 border border-green-300 rounded-lg px-5 py-3">
        <p class="text-xs font-semibold text-gray-600 mb-1">Total Completed</p>
        <p class="text-2xl font-bold text-green-700">{{ resolved.length }}</p>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-sm font-medium text-gray-700">Filter by:</span>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
          :class="selectedCategory === cat 
            ? 'bg-green-500 text-white border-green-500' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
        >
          <component
            v-if="cat !== 'All'"
            :is="getCategoryIcon(cat).icon"
            class="w-4 h-4 mr-1 inline-block"
            :class="getCategoryIcon(cat).color"
          />
          {{ cat }}
        </button>
      </div>
    </div>
  </div>

  <!-- Loading state -->
  <div v-if="loading" class="flex flex-col items-center justify-center py-16">
    <div class="w-10 h-10 border-3 border-gray-300 border-t-green-500 rounded-full animate-spin mb-3"></div>
    <p class="text-sm text-gray-600">Loading reports...</p>
  </div>

  <!-- Empty state -->
  <div v-else-if="resolved.length === 0" class="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-gray-200">
    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
      <span class="text-3xl">✓</span>
    </div>
    <p class="text-base font-semibold text-gray-800 mb-1">
      {{ selectedCategory === 'All' ? 'No resolved requests' : `No ${selectedCategory} requests found` }}
    </p>
    <p class="text-sm text-gray-500">
      {{ selectedCategory === 'All' ? 'Completed requests will show up here' : 'Try selecting a different category' }}
    </p>
  </div>

  <!-- Desktop Table -->
  <div v-else class="hidden md:block w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 border-b border-gray-200">
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Student Info</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Location</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase text-center">Status</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Resolution</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase text-right">Time</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="r in resolved" :key="r.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm">
                {{ r.userName?.charAt(0) || '?' }}
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-900">{{ r.userName }}</span>
                <span class="text-xs text-gray-500">{{ r.studentNumber }}</span>
                <div class="flex items-center gap-1 mt-0.5">
                  <component
                    :is="getCategoryIcon(r.category).icon"
                    class="w-4 h-4 inline-block"
                    :class="getCategoryIcon(r.category).color"
                  />
                  <span class="text-xs text-gray-600">{{ r.category }}</span>
                </div>
              </div>
            </div>
          </td>

          <td class="px-6 py-5">
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-800">{{ r.location }}</span>
              <span class="text-xs text-gray-500 mt-0.5">{{ formatDate(r.createdAt) }}</span>
            </div>
          </td>

          <td class="px-6 py-5 text-center">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
              ✓ Completed
            </span>
          </td>

          <td class="px-6 py-5">
            <p class="text-sm text-gray-700 line-clamp-2 max-w-sm">
              {{ r.resolution }}
            </p>
          </td>

          <td class="px-6 py-5 text-right">
            <div class="flex flex-col items-end">
              <span class="text-sm font-semibold text-gray-900">
                {{ getDuration(r) }}
              </span>
              <span class="text-xs text-gray-500 mt-1">
                {{ formatTime(r.createdAt) }} - {{ formatTime(r.resolvedAt) }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mobile Cards -->
  <div v-if="resolved.length" class="md:hidden space-y-4">
    <div
      v-for="r in resolved"
      :key="r.id"
      class="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
            {{ r.userName?.charAt(0) || '?' }}
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">{{ r.userName }}</h3>
            <p class="text-xs text-gray-500">{{ r.studentNumber }}</p>
          </div>
        </div>
        <span class="px-2.5 py-1 bg-green-100 border border-green-300 rounded-md text-xs font-semibold text-green-700">
          Done
        </span>
      </div>

      <!-- Category -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md mb-3">
        <component
          :is="getCategoryIcon(r.category).icon"
          class="w-4 h-4 inline-block"
          :class="getCategoryIcon(r.category).color"
        />
        <span class="text-sm font-medium text-gray-700">{{ r.category }}</span>
      </div>

      <!-- Location & Date -->
      <div class="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-600 mb-1">Location</p>
            <p class="text-sm font-medium text-gray-900">{{ r.location }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs font-semibold text-gray-600 mb-1">Date</p>
            <p class="text-sm text-gray-800">{{ formatDate(r.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Resolution -->
      <div class="bg-green-50 border-l-4 border-green-500 rounded p-3 mb-3">
        <p class="text-xs font-semibold text-gray-700 mb-2">
          What was done
        </p>
        <p class="text-sm text-gray-800 leading-relaxed">
          {{ r.resolution }}
        </p>
      </div>

      <!-- Duration -->
      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p class="text-xs text-gray-600 mb-1">Time taken</p>
          <p class="text-base font-semibold text-green-600">{{ getDuration(r) }}</p>
        </div>
        <div class="text-right text-xs text-gray-600">
          <p>{{ formatTime(r.createdAt) }}</p>
          <p class="text-gray-400">to</p>
          <p>{{ formatTime(r.resolvedAt) }}</p>
        </div>
      </div>
    </div>
  </div>

</section>
</template>
