<script setup>
import { computed, ref } from 'vue'
import { useRequests } from '@/composables/useRequests'

const { requests, resolveRequest, assignRequest, loadMore, loading } = useRequests()

// Track if there are more requests to fetch
const hasMore = ref(true) // will be updated inside loadMore

const pending = computed(() =>
  requests.value.filter(r => r.status !== 'resolved')
)

// Wrap loadMore to handle "hasMore" logic
const handleLoadMore = async () => {
  const newRequests = await loadMore()
  // If no new requests are returned, hide the button
  if (!newRequests || newRequests.length === 0) {
    hasMore.value = false
  }
}
</script>

<template>
  <section class="p-4 lg:px-6 lg:py-12 fade-up">

    <div class="flex items-center justify-between px-2 mb-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Recent Reports
        </h1>  
        <p class="text-sm text-gray-600">
          Pending actions and monitoring
        </p> 
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20 font-bold text-gray-400">Loading...</div>

    <!-- Desktop Table View -->
    <div v-else class="hidden md:block w-full overflow-x-auto card-border" v-if="pending.length">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50/50 border-b border-gray-100">
            <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Requester Details</th>
            <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
            <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Priority</th>
            <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Issue Log</th>
            <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="r in pending" :key="r.id" class="hover:bg-gray-50/50 transition-colors group">
            <td class="px-6 py-6">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-gray-900">{{ r.userName }}</span>
                <span class="text-[11px] font-medium text-gray-400">ID: {{ r.studentNumber }}</span>
              </div>
            </td>
            <td class="px-6 py-6 text-sm font-semibold text-gray-600">{{ r.location }}</td>
            <td class="px-6 py-6 text-center">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tight">
                {{ r.priority }} Priority
              </span>
            </td>
            <td class="px-6 py-6">
              <p class="text-xs text-gray-500 max-w-xs leading-relaxed line-clamp-2 italic font-medium">
                "{{ r.description }}"
              </p>
            </td>
            <td class="px-6 py-6 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="resolveRequest(r.id, 'Resolved by admin')"
                  class="px-3 py-1.5 bg-green-600 text-white text-[10px] font-black uppercase rounded"
                >
                  Resolve
                </button>
                <button
                  @click="assignRequest(r.id)"
                  class="px-3 py-1.5 bg-white border text-[10px] font-black uppercase rounded"
                >
                  Assign
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <!-- Mobile Card View -->
<div v-if="!loading && pending.length > 0" class="md:hidden space-y-4">
  <div
    v-for="r in pending"
    :key="r.id"
    class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
  >
    <!-- Requester Info -->
    <div class="mb-3 pb-3 border-b border-gray-100">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-sm font-bold text-gray-900">{{ r.userName }}</h3>
          <p class="text-[11px] font-medium text-gray-400">ID: {{ r.studentNumber }}</p>
        </div>
        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-tight border">
          {{ r.priority }}
        </span>
      </div>
    </div>

    <!-- Location -->
    <div class="mb-3">
      <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
      <p class="text-sm font-semibold text-gray-600">{{ r.location }}</p>
    </div>

    <!-- Issue Description -->
    <div class="mb-4">
      <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Issue Log</p>
      <p class="text-xs text-gray-500 leading-relaxed italic font-medium">
        "{{ r.description }}"
      </p>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button
        @click="resolveRequest(r.id, 'Resolved by admin')"
        class="flex-1 px-3 py-2 bg-green-600 text-white text-[10px] font-black uppercase rounded"
      >
        Resolve
      </button>
      <button
        @click="assignRequest(r.id)"
        class="flex-1 px-3 py-2 bg-white border text-[10px] font-black uppercase rounded"
      >
        Assign
      </button>
    </div>
  </div>
</div>


    <!-- No Requests -->
    <div v-else class="text-center py-20 text-sm text-gray-500">
      No pending reports found.
    </div>

    <!-- Load More Button -->
    <div v-if="!loading && hasMore && pending.length" class="flex justify-center mt-6">
      <button
        @click="handleLoadMore"
        class="px-4 py-2 text-xs font-bold border rounded cursor-pointer bg-white hover:bg-gray-50 transition-colors"
      >
        {{ loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
    
  </section>
</template>
