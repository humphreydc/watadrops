<script setup>
import { computed } from 'vue'
import { useStudentReports } from '@/composables/useStudentReports'

const { reports, loading } = useStudentReports()

const pending = computed(() =>
  reports.value.filter(r => r.status === 'pending')
)

const assigned = computed(() =>
  reports.value.filter(r => r.status === 'assigned')
)

const resolved = computed(() =>
  reports.value.filter(r => r.status === 'resolved')
)
</script>

<template>
  <section class="p-4 lg:px-8">

    <div class="flex items-center justify-between px-2 mb-6">
      <div>
        <h1 class="uppercase tracking-widest text-sm font-bold mb-1">
          My Submitted Reports
        </h1>  
        <p class="uppercase text-xs text-gray-600 font-semibold tracking-widest">
          Track status of your requests
        </p> 
      </div>
    </div>

    <div v-if="loading" class="text-center text-sm text-gray-500 py-6">
      Loading your reports...
    </div>

    <div v-else-if="reports.length === 0" class="text-center text-sm text-gray-500 py-6">
      You have not submitted any reports yet.
    </div>

    <div v-else class="space-y-4">

      <div
        v-for="r in reports"
        :key="r.id"
        class="bg-white p-5 rounded-xl border shadow-sm space-y-3"
      >
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-gray-400 uppercase">
            {{ r.category }}
          </span>

          <span
            class="px-3 py-1 text-[10px] font-black uppercase rounded"
            :class="{
              'bg-yellow-100 text-yellow-700': r.status === 'pending',
              'bg-blue-100 text-blue-700': r.status === 'assigned',
              'bg-green-100 text-green-700': r.status === 'resolved'
            }"
          >
            {{ r.status }}
          </span>
        </div>

        <div>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Location
          </p>
          <p class="text-sm font-semibold text-gray-800">
            {{ r.location }}
          </p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Issue Description
          </p>
          <p class="text-xs text-gray-700 italic">
            "{{ r.description }}"
          </p>
        </div>

        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>Priority: {{ r.priority }}</span>
          <span v-if="r.adminNote">
            Admin Note: {{ r.adminNote }}
          </span>
        </div>

      </div>

    </div>

  </section>
</template>
