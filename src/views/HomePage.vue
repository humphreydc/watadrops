<script setup>
import NavBar from '@/components/home/NavBar.vue';
import Heading from '@/components/home/Heading.vue';
import About from '@/components/home/About.vue';
import Guide from '@/components/home/Guide.vue';
import IssueReport from '@/components/home/IssueReport.vue';
import Location from '@/components/home/Location.vue';
import Foot from '@/components/home/Foot.vue';
</script>

<template>
    <div class="bg-white">
        <NavBar/>
        <Heading class="fade-up" id="home"/>
        <About id="about"/>
        <Guide id="how-it-works"/>
        <IssueReport id="features"/>
        <Location id="reports"/>
        <Foot/>
    </div>
</template>