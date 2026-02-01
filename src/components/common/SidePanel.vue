<script setup>
import { ref } from 'vue';
// define props
const props = defineProps({
    collapsed: Boolean
});
console.log(props);

const emit = defineEmits(['close']);

const navItems = ref([
    { 
        id:"overview", 
        label: "Overview",  
        icon:`<svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"/>
        </svg>`
    },
    {
        id: "request", 
        label: "Request", 
        icon: `<svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
        </svg>`
    },
    { 
        id: "resolution", 
        label: "Resolution", 
        icon: `<svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>`
    }   
]);
// check na check ang current nav kung ano an selected
const activeItemId = ref("overview");

const isActive = (item) => {
    activeItemId.value = item.id;
    emit('select', item.id);
    emit('close');
};
</script>

<template>
    <!-- aside for semantic -->
    <aside class="h-full bg-white border border-gray-200 hover:shadow-sm transition-all duration-300">
    <!-- wrapper lumpia -->
        <div class="flex flex-col p-4 gap-16">
            <!-- logo and title -->
            <div 
                class="flex items-center" 
                :class="collapsed ? 'justify-center' : 'gap-4'"
            >
                <img src="/src/assets/logo.png" alt="logo"class="w-8">
                <h1 v-if="!collapsed" class="text-2xl text-(--primary-color) font-bold">Admin Portal</h1>
                <button 
                    @click="emit('close')" 
                    class="lg:hidden p-2 text-xl text-gray-500 cursor-pointer">
                ✕
                </button>
            </div>
            <!-- navigation items -->
            <div class="text-gray-600 flex flex-col gap-6">
                <p v-if="!collapsed" class="text-base">Command Center</p>
                <ul class="flex flex-col gap-2">
                    <li 
                        v-for="item in navItems"
                        :key="item.id"
                        class="flex items-center text-lg py-2 px-3 gap-3 cursor-pointer rounded-sm"
                        @click="isActive(item)"
                        :class="[
                        activeItemId === item.id 
                            ? (collapsed ? 'text-(--primary-color)' : 'bg-(--primary-color) text-white') 
                            : 'text-gray-600 hover:bg-gray-100',
                        collapsed ? 'justify-center px-0' : ''
                        ]"
                    >
                        <span v-html="item.icon"></span>
                        <span v-if="!collapsed">{{ item.label }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>