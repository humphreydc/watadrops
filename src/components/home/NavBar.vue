<script setup>
import { ref } from "vue";

// load list
const navItems = ref([
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "how-it-works", label: "How It Works", href: "#how-it-works" }, 
    { id: "reports", label: "Reports", href: "#reports" },
]);

const isMenuOpen = ref(false);

</script>

<template>
    <nav class="w-full fixed top-0 border border-gray-200 bg-gray-50 z-50">

    <!-- desktop nav -->
        <div class="justify-between items-center px-6 py-3 sm:px-10 sm:py-4 hidden lg:flex">
            <div class="flex items-center gap-4">
                <img src="/src/assets/logo.png" alt="logo"class="w-8">
                <h1 class="text-2xl lg:text-3xl text-(--primary-color) font-bold">Watts & Drops</h1>
            </div>
            <div class="flex items-center gap-8">
                <ul class="flex items-center gap-8 font-medium">
                    <li v-for="item in navItems" :key="item.id" class="cursor-pointer hover:text-(--primary-color)">
                    <a :href="item.href">{{ item.label }}</a>
                    </li>
                </ul>
                <div class="flex items-center gap-4">
                    <router-link to="/register" class="border py-1 px-5 rounded-sm cursor-pointer bg-white">Admin Login</router-link>
                </div>
            </div>
        </div>

        <!-- menu if not open -->
        <div class="flex justify-between items-center px-6 py-3 lg:hidden">
            <div class="flex items-center gap-4">
                <img src="/src/assets/logo.png" alt="logo"class="w-8">
                <div class="text-2xl lg:text-3xl text-(--primary-color) font-bold">Watts & Drops</div>
            </div>
            <button @click="isMenuOpen = !isMenuOpen" class="w-12 h-12 text-3xl hover:bg-gray-100 rounded-full 
                    cursor-pointer">
                {{ isMenuOpen ? '✕' : '☰' }}
            </button>
        </div>

        <!-- mobile nav -->
        <div v-if="isMenuOpen" class="flex justify-center flex-col gap-6 py-8 lg:hidden">
            <ul class="flex justify-center items-center flex-col gap-6">
                <li v-for="item in navItems" :key="item.id" class="cursor-pointer">
                <a :href="item.href" @click="isMenuOpen = !isMenuOpen">{{ item.label }}</a>
                </li>
            </ul>
            <div class="flex justify-center items-center gap-4">
                <router-link to="/register" class="border py-1 px-5 rounded-sm cursor-pointer bg-white">Admin Login</router-link>
            </div>
        </div>
    </nav>
</template>