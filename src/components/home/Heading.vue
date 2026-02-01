<script setup>
</script>

<template>
   <header class="w-full h-screen border flex justify-center items-center bg-white">
    <!-- single row title screen -->
        <div class="flex justify-center items-center flex-col gap-4">
            <img src="/src/assets/logo.png" alt="logo"class="w-16">
            <h1 class="font-black text-6xl text-(--primary-color) text-center">Monitor Campus Resource <br>Consumption</h1>
            <p class="text-center text-lg font-semibold">Watts & Drops helps students and administrators track electricity, water, and <br>supply usage to promote awareness and sustainability within the college.</p>
            <div class="flex gap-4 mt-4">
                <a href="#data" class="border border-(--primary-color) py-2 px-4 rounded-sm bg-(--primary-color) text-white">View Data Usage</a>
                <a href="#features" class="border py-2 px-4 rounded-sm">Explore Features</a>
            </div>
        </div>
   </header>
</template>