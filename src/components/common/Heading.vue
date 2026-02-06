<script setup>
import { computed } from 'vue';

// gets user type using props
const props = defineProps({
    userType: {
        type: String,
        required: true,
        validator: (value) => ['admin', 'student'].includes(value)
    }
});

const texts = {
    admin: {
        info: "WATTS & DROPS: RESOURCE MANAGEMENT SYSTEM",
        title: "Administrator Console",
        sub: "Operational overview and resource allocation metrics for the facility.",
    },
    student: {
        info: "WATTS & DROPS: STUDENT PORTAL",
        title: "Student Dashboard",
        sub: "Track your resource usage and sustainability impact."
    }
    
}

const headerText = computed(() => texts[props.userType]);
</script>

<template>
   <header class="w-full bg-white p-6 px-4 py-8 sm:px-12 sm:py-16 shadow-xs">
        <!-- design shits -->
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
                <div class="w-12 h-1 bg-(--primary-color) rounded-full"></div>
            <p class="text-xs text-(--primary-color) font-bold tracking-[0.2em]">{{ headerText.info }}</p>
        </div>
            <!-- main title to -->
            <h1 class="text-4xl font-black">{{ headerText.title }}</h1>
            <p class="text-gray-500 font-medium">{{ headerText.sub }}</p>
        </div>
   </header>
</template>
