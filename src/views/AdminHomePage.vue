<script setup>
import NavBar from '@/components/admin/home/NavBar.vue';
import Heading from '@/components/admin/home/Heading.vue';
import About from '@/components/admin/home/About.vue';
import Guide from '@/components/admin/home/Guide.vue';
import IssueReport from '@/components/admin/home/IssueReport.vue';
import Location from '@/components/admin/home/Location.vue';
import Foot from '@/components/admin/home/Foot.vue';
</script>

<template>
    <div class="bg-white">
        <NavBar/>
        <Heading class="fade-up"/>
        <About/>
        <Guide/>
        <IssueReport/>
        <Location/>
        <Foot/>
    </div>
</template>