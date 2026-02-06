<script setup>
// define emit, pass data to parent
const emit = defineEmits(['toggle-sidebar']);
</script>

<template>
    <nav class="w-full border border-gray-200 z-10">
        <!-- align items -->
        <div class="flex justify-between align-items py-2 px-4">
            <div class="flex items-center gap-4">
                <img src="/src/assets/logo.png" alt="logo"class="w-8">
                <h1 class="text-2xl lg:text-3xl text-(--primary-color) font-bold">Watts & Drops</h1>
            </div>
            <router-link to="/" class="cursor-pointer border">BACK TO HOME</router-link>
            <div class="flex items-center gap-4">
                <div class="w-8 sm:w-12 h-8 sm:h-12 bg-gray-300 rounded-full cursor-pointer"></div>
                <div class="border-2 w-16 sm:w-28 h-8 sm:h-12 rounded-full cursor-pointer"></div>
            </div>
        </div>
    </nav>
</template>