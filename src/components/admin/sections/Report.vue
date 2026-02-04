<script setup>
</script>

<template>
    <section class="">
        <!-- Desktop View -->
        <div class="hidden md:block w-full overflow-x-auto card-border">
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
                    <tr class="hover:bg-gray-50/50 transition-colors group">
                        <td class="px-6 py-6">
                            <div class="flex flex-col">
                                <span class="text-sm font-bold text-gray-900">Casey Lou Garcia</span>
                                <span class="text-[11px] font-medium text-gray-400">ID: 2023506089</span>
                            </div>
                        </td>
                        <td class="px-6 py-6 text-sm font-semibold text-gray-600">Room 411</td>
                        <td class="px-6 py-6 text-center">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black bg-red-50 text-red-700 border border-red-100 uppercase tracking-tight">High Priority</span>
                        </td>
                        <td class="px-6 py-6">
                            <p class="text-xs text-gray-500 max-w-xs leading-relaxed line-clamp-2 italic font-medium">"The projector in Room 411 is currently not functioning..."</p>
                        </td>
                        <td class="px-6 py-6 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <button class="px-3 py-1.5 bg-green-600 text-white text-[10px] font-black uppercase rounded shadow-sm hover:bg-green-700 transition-colors">Resolve</button>
                                <button class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase rounded hover:bg-gray-50 transition-colors">Assign</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile View -->
        <div class="md:hidden space-y-4">
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference #</span>
                        <span class="text-sm font-black text-gray-900 tracking-tighter">REQ-2023506089</span>
                    </div>
                    <span class="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded border border-amber-100 uppercase tracking-tight">Electricity</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Requester</p>
                        <p class="text-xs font-bold text-gray-900">Casey Lou Garcia</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                        <p class="text-xs font-bold text-gray-700">Room 411</p>
                    </div>
                </div>

                <div class="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Issue Details</p>
                    <p class="text-[11px] text-gray-600 leading-relaxed font-medium italic">"The projector in Room 411 is currently not functioning. This affects the conduct of lectures..."</p>
                </div>

                <div class="flex justify-between pt-4 border-t border-gray-50 items-end">
                    <div class="flex flex-col">
                        <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Reported</span>
                        <span class="text-sm text-red-500 font-black tracking-tighter">09:00 AM</span>
                    </div>
                    <button class="bg-gray-900 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-transform">Details</button>
                </div>
            </div>
        </div>
    </section>
</template>