<script setup>
import NavBar from '@/components/student/NavBar.vue';
import Heading from '@/components/common/Heading.vue';
import Dashboard from '@/components/admin/Dashboard.vue';

</script>

<template>
    <div class="w-full min-h-screen flex">
        <!-- main column -->
        <div class="flex-1">
            <NavBar class="sticky top-0 bg-(--main-bg-color)" @toggle-sidebar="toggleSidebar"/>  
            <Heading userType="student"/>
            <!-- resources dashboard section -->
            <main class="p-4">
                <Dashboard/>
            </main>
        </div>
    </div>
</template>