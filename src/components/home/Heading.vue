<script setup>
</script>
<template>
    <header class="w-full flex justify-center items-center bg-white px-4 py-32 lg:py-45">
        <!-- single row title screen -->
        <div class="flex justify-center items-center flex-col gap-4">
            <img src="/src/assets/logo.png" alt="logo" class="w-18 sm:w-20 lg:w-24">
            <h1 class="font-black text-4xl sm:text-6xl text-center leading-tight bg-linear-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
               Watts and Drops
            </h1>
            <p class="text-center text-lg sm:text-xl font-medium max-w-3xl px-4">
                Manage campus-wide electricity, water, and supply inventories. This portal is <br class="hidden md:block">restrictive to facility manager and authorized college administrators 
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 w-full sm:w-auto p-4">
                <router-link to="/Register" class="border w-full sm:w-auto border-(--primary-color) py-3 px-4 rounded-sm bg-(--primary-color) text-white text-center font-medium">Proceed to Admin Login </router-link>
                <a href="#features" class="border w-full sm:w-auto py-3 px-4 rounded-sm text-center font-medium">View Public Data</a>
            </div>
        </div>
    </header>
</template>