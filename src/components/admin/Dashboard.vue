<script setup>
import Electricity from '@/components/resources/Electricity.vue';
import Water from '@/components/resources/Water.vue';
import Graph from '@/components/admin/sections/Graph.vue';
</script>

<template>
   <section class="grid grid-cols-1 lg:grid-cols-2 py-4 sm:px-8 sm:pt-12 gap-6 fade-up">
        <Electricity/>
        <Water/>
        <div class="grid col-span-1 lg:col-span-2">
            <div class="">
               <Graph/> 
            </div>
        </div>
   </section>
</template>