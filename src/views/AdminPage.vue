<script setup>
import { ref } from 'vue';
import NavBar from '@/components/common/NavBar.vue';
import SidePanel from '@/components/common/SidePanel.vue';
import Heading from '@/components/common/Heading.vue';
import Dashboard from '@/components/admin/Dashboard.vue';
import DataEntry from '@/components/admin/sections/DataEntry.vue';
import Request from '@/components/admin/sections/Request.vue';
import Resolution from '@/components/admin/sections/Resolution.vue';

const isCollapsed = ref(true);

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
}

const closeSidebar = () => {
    if (window.innerWidth < 1024) {
        isCollapsed.value = true
    }
}

const activeTab = ref('overview');

const handleSelect = (id) => {
    activeTab.value = id;
}
</script>

<template>
    <div class="w-full min-h-screen flex">
        <!-- Sidebar Wrapper -->
        <div class="fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform lg:translate-x-0 h-full"
            :class="isCollapsed ? '-translate-x-full lg:w-20' : 'translate-x-0 lg:w-64'">
            <SidePanel :collapsed="isCollapsed" @close="closeSidebar" @select="handleSelect" />
        </div>

        <!-- Placeholder for desktop under the sidepanel -->
        <div class="hidden lg:block" :class="isCollapsed ? 'w-20' : 'w-64'"></div>

        <!-- main column -->
        <div class="flex-1">
            <NavBar class="sticky top-0 bg-(--main-bg-color)" @toggle-sidebar="toggleSidebar" />
            <Heading userType="admin"/>
            <!-- resources dashboard section -->
            <main class="">
                <div v-if="activeTab === 'overview'" class="mx-4 sm:m-0">
                    <Dashboard/> 
                    <DataEntry class="mt-4"/>
                </div>
                <Request v-if="activeTab === 'request'" />
                <Resolution v-if="activeTab === 'resolution'" />
            </main>
        </div>
    </div>
</template>