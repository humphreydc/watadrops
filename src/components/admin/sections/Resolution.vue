<script setup>
import { computed } from 'vue'
import { useRequests } from '@/composables/useRequests'

const { requests } = useRequests()

const resolved = computed(() =>
  requests.value.filter(r => r.status === 'resolved')
)

const formatTime = (t) => {
  if (!t) return ''
  const d = t.toDate ? t.toDate() : new Date(t)
  return d.toLocaleTimeString()
}

const getDuration = (r) => {
  if (!r.resolvedAt || !r.createdAt) return ''

  const start = r.createdAt.toDate()
  const end = r.resolvedAt.toDate()

  const diff = Math.abs(end - start)

  const mins = Math.floor(diff / 60000)
  const h = Math.floor(mins / 60)
  const m = mins % 60

  return `${h}h ${m}m`
}
</script>

<template>
    <section class="p-4 lg:px-8">
        <!-- Desktop View -->
         <div class="flex items-center justify-between px-2 mb-4">
                        <div class="">
                            <h1 class="uppercase tracking-widest text-sm font-bold mb-1">Recent Requests</h1>  
                            <p class="uppercase text-xs text-gray-600 font-semibold tracking-widest">Pending actions and monitoring</p> 
                        </div>
                    </div>
        <div class="hidden md:block w-full overflow-x-auto card-border">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50/50 border-b border-gray-100">
                        <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Case info</th>
                        <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                        <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Outcome</th>
                        <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Resolution Summary</th>
                        <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Duration</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
  <tr
    v-for="r in resolved"
    :key="r.id"
    class="hover:bg-gray-50/50 transition-colors group"
  >
    <td class="px-6 py-6">
      <div class="flex flex-col">
        <span class="text-sm font-bold text-gray-900">
          {{ r.name }}
        </span>
        <span class="text-[11px] font-medium text-gray-400">
          {{ r.category }} Issue
        </span>
      </div>
    </td>

    <td class="px-6 py-6 text-sm font-semibold text-gray-600">
      {{ r.location }}
    </td>

    <td class="px-6 py-6 text-center">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black bg-green-50 text-green-700 border uppercase">
        Resolved
      </span>
    </td>

    <td class="px-6 py-6">
      <p class="text-xs text-gray-500 max-w-xs leading-relaxed line-clamp-2 italic font-medium">
        "{{ r.resolution }}"
      </p>
    </td>

    <td class="px-6 py-6 text-right">
      <div class="flex flex-col items-end">
        <span class="text-[11px] font-bold text-gray-900">
          {{ getDuration(r) }}
        </span>
        <span class="text-[10px] font-medium text-gray-400 mt-1">
          {{ formatTime(r.createdAt) }} - {{ formatTime(r.resolvedAt) }}
        </span>
      </div>
    </td>
  </tr>
</tbody>
            </table>
        </div>

        <!-- Mobile View -->
        <div class="md:hidden space-y-4">
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Case ID</span>
                        <span class="text-sm font-black text-gray-900 tracking-tighter">RES-40112</span>
                    </div>
                    <span class="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded border border-green-100 uppercase tracking-tight">Resolved</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Requester</p>
                        <p class="text-xs font-bold text-gray-900">Casey Lou Garcia</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                        <p class="text-xs font-bold text-gray-700">1h 40m</p>
                    </div>
                </div>

                <div class="bg-green-50/30 p-3 rounded-xl border border-green-100">
                    <p class="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Final Resolution</p>
                    <p class="text-[11px] text-gray-600 leading-relaxed font-medium italic">"Technical team successfully restored power to the projector system..."</p>
                </div>

                <div class="flex justify-between pt-4 border-t border-gray-50 items-center">
                    <div class="flex flex-col">
                        <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completed</span>
                        <span class="text-xs font-bold text-gray-900">Today, 10:40 AM</span>
                    </div>
                    <button class="text-green-600 text-[10px] font-black uppercase tracking-widest underline underline-offset-4 decoration-2">View Log</button>
                </div>
            </div>
        </div>
    </section>
</template>