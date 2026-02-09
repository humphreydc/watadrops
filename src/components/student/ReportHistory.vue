<script setup>
import { computed, ref } from 'vue'
import { useStudentReports } from '@/composables/useStudentReports'

// Lucide icons
import { Droplets, Zap, Building, Hammer, FileText } from 'lucide-vue-next'

const { reports, loading } = useStudentReports()

// Selected category filter
const selectedCategory = ref('All')

// Available categories
const categories = ['All', 'Water', 'Electricity', 'Facility', 'Equipment', 'Other']

// Filter reports
const filteredReports = computed(() => {
  if (selectedCategory.value === 'All') return reports.value
  return reports.value.filter(r => r.category === selectedCategory.value)
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
  const end = r.resolvedAt ? (r.resolvedAt.toDate ? r.resolvedAt.toDate() : new Date(r.resolvedAt)) : new Date()
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
        <h1 class="text-2xl font-bold text-gray-900 mb-2">My Reports</h1>
        <p class="text-sm text-gray-600">Track the status of your maintenance requests</p>
      </div>
      <div v-if="!loading && filteredReports.length > 0" class="bg-green-50 border border-green-300 rounded-lg px-5 py-3">
        <p class="text-xs font-semibold text-gray-600 mb-1">Total Reports</p>
        <p class="text-2xl font-bold text-green-700">{{ filteredReports.length }}</p>
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
          class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer"
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

  <!-- Loading -->
  <div v-if="loading" class="flex flex-col items-center justify-center py-16">
    <div class="w-10 h-10 border-3 border-gray-300 border-t-green-500 rounded-full animate-spin mb-3"></div>
    <p class="text-sm text-gray-600">Loading your reports...</p>
  </div>

  <!-- Empty state -->
  <div v-else-if="filteredReports.length === 0" class="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-gray-200">
    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
      <FileText class="w-8 h-8 text-gray-400"/>
    </div>
    <p class="text-base font-semibold text-gray-800 mb-1">
      {{ selectedCategory === 'All' ? 'No reports submitted' : `No ${selectedCategory} reports found` }}
    </p>
    <p class="text-sm text-gray-500">
      {{ selectedCategory === 'All' ? 'Submit your first maintenance request to get started' : 'Try selecting a different category' }}
    </p>
  </div>

  <!-- Desktop Table -->
  <div v-else class="hidden md:block w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 border-b border-gray-200">
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Category</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Location</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase text-center">Status</th>
          <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Description</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="r in filteredReports" :key="r.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-5 flex items-center gap-2">
            <component
              :is="getCategoryIcon(r.category).icon"
              class="w-5 h-5"
              :class="getCategoryIcon(r.category).color"
            />
            <span class="text-sm font-semibold text-gray-900">{{ r.category }}</span>
          </td>
          <td class="px-6 py-5">
            <span class="text-sm font-medium text-gray-800">{{ r.location }}</span>
            <span class="text-xs text-gray-500 block mt-0.5">{{ formatDate(r.createdAt) }}</span>
          </td>
          <td class="px-6 py-5 text-center">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border"
              :class="r.status?.trim().toLowerCase() === 'resolved'
                ? 'bg-green-100 text-green-700 border-green-300'
                : r.status?.trim().toLowerCase() === 'assigned'
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-yellow-100 text-yellow-700 border-yellow-300'"
            >
              {{ r.status }}
            </span>
          </td>
          <td class="px-6 py-5">
            <p class="text-sm text-gray-700 line-clamp-2 max-w-sm">{{ r.description }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mobile Cards -->
  <div v-if="filteredReports.length" class="md:hidden space-y-4">
    <div v-for="r in filteredReports" :key="r.id" class="bg-white border border-gray-200 rounded-lg p-4">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <component
            :is="getCategoryIcon(r.category).icon"
            class="w-5 h-5"
            :class="getCategoryIcon(r.category).color"
          />
          <div>
            <p class="text-sm font-semibold text-gray-900">{{ r.category }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(r.createdAt) }}</p>
          </div>
        </div>
        <span
          class="px-2.5 py-1.5 text-xs font-bold rounded-full border"
          :class="r.status?.trim().toLowerCase() === 'resolved'
            ? 'bg-green-100 text-green-800 border-green-300'
            : r.status?.trim().toLowerCase() === 'assigned'
            ? 'bg-blue-100 text-blue-800 border-blue-300'
            : 'bg-yellow-100 text-yellow-800 border-yellow-300'"
        >
          {{ r.status }}
        </span>
      </div>

      <div class="mb-2">
        <p class="text-xs text-gray-500">{{ r.location }}</p>
      </div>
      <div class="mb-3">
        <p class="text-sm text-gray-800">{{ r.description }}</p>
      </div>
    </div>
  </div>

</section>
</template>
