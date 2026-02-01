<script setup>
// define emit, pass data to parent
const emit = defineEmits(['toggle-sidebar']);
</script>

<template>
    <nav class="w-full border border-gray-200 z-10">
        <!-- align items -->
        <div class="flex justify-between align-items py-2 px-4">
            <div class="flex items-center gap-4">
                <button
                    @click="emit('toggle-sidebar')" 
                    type="button" 
                    class="w-12 h-12 text-3xl hover:bg-gray-200 rounded-full 
                    cursor-pointer"
                >☰
                </button>
                <p class="text-2xl font-semibold">Dashboard</p>
            </div>
            <router-link to="/" class="cursor-pointer border">BACK TO HOME</router-link>
            <!-- notif and profile -->
            <!-- <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-300 rounded-full cursor-pointer"></div>
                <div class="border-2 w-28 h-12 rounded-full cursor-pointer"></div>
            </div> -->
        </div>
    </nav>
</template>