<script setup>


</script>

<template>
    <nav class="w-full border border-gray-200 z-10 bg-gray-50">
        <!-- align items -->
        <div class="flex justify-between align-items py-2 px-16">
            <div class="flex items-center gap-4">
                <img src="/src/assets/logo.png" alt="logo"class="w-8">
                <p class="text-2xl font-bold text-(--primary-color)">Watts & Drops</p>
            </div>
            <div class="flex items-center gap-16">
                <ul class="flex items-center gap-8">
                    <li><a href="#about" class="hover:text-(--primary-color)">About</a></li>
                    <li><a href="#features" class="hover:text-(--primary-color)">Features</a></li>
                    <li><a href="#data" class="hover:text-(--primary-color)">Data Usage</a></li>    
                </ul>
                <div class="flex items-center gap-4">
                    <router-link to="/register" class="border py-1 px-5 rounded-sm cursor-pointer bg-white">Register</router-link>
                    <div class="text-white bg-(--primary-color) border border-(--primary-color) rounded-sm py-1 px-5 cursor-pointer">Sign In</div>
                </div>
            </div>
        </div>
    </nav>
</template>