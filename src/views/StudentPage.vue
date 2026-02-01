<script setup>
import { ref } from 'vue';
import NavBar from '@/components/common/NavBar.vue';
import SidePanel from '@/components/common/SidePanel.vue';
import Heading from '@/components/common/Heading.vue';
import Dashboard from '@/components/admin/Dashboard.vue';

const isCollapsed = ref(true);

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
}

const closeSidebar = () => {
  if (window.innerWidth < 1024) {
    isCollapsed.value = true
  }
}

const activeItems = ref();
</script>

<template>
    <div class="w-full min-h-screen flex">
        <!-- Sidebar Wrapper -->
        <div 
            class="fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform lg:translate-x-0 h-full"
            :class="isCollapsed ? '-translate-x-full lg:w-20' : 'translate-x-0 lg:w-64'"
        >
          <SidePanel :collapsed="isCollapsed" @close="closeSidebar"/>  
        </div>

        <!-- Placeholder for desktop under the sidepanel -->
        <div 
            class="hidden lg:block"
            :class="isCollapsed ? 'w-20' : 'w-64'"
        ></div>

        <!-- main column -->
        <div class="flex-1">
            <NavBar class="sticky top-0 bg-(--main-bg-color)" @toggle-sidebar="toggleSidebar"/>  
            <Heading/> 
            <!-- resources dashboard section -->
            <main class="p-4">
                <Dashboard/>
            </main>
        </div>
    </div>
</template>