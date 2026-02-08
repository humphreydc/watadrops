<script setup>
import { computed } from 'vue'
import { useRequests } from '@/composables/useRequests'

const { requests, resolveRequest, assignRequest, loadMore, loading } = useRequests()

const pending = computed(() =>
  requests.value.filter(r => r.status !== 'resolved')
)
</script>

<template>
<section class="p-4 lg:px-8">
  <div class="flex items-center justify-between px-2 mb-4">
    <div>
      <h1 class="uppercase tracking-widest text-sm font-bold mb-1">Recent Requests</h1>
      <p class="uppercase text-xs text-gray-600 font-semibold tracking-widest">Pending actions and monitoring</p>
    </div>
  </div>

  <div v-if="loading" class="text-center py-20 font-bold text-gray-400">Loading...</div>

  <div v-else class="hidden md:block w-full overflow-x-auto card-border">
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

    <div class="flex justify-center mt-4">
      <button @click="loadMore" class="px-4 py-2 text-xs font-bold border rounded cursor-pointer">
        {{ loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </div>
</section>
</template>