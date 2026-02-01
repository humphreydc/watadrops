<script setup>
import { ref } from 'vue';
import Electricity from '@/components/resources/Electricity.vue';
import Water from '@/components/resources/Water.vue';
import DataEntry from '@/components/admin/sections/DataEntry.vue';
import Graph from '@/components/admin/sections/Graph.vue';
</script>

<template>
   <section class="grid grid-cols-1 lg:grid-cols-2 px-4 py-8 sm:px-12 sm:py-16 gap-6">
        <Electricity/>
        <Water/>
        <div class="grid col-span-1 lg:col-span-2 gap-6">
            <div class="">
               <Graph/> 
               <div></div>
            </div>
            
            <DataEntry/>
        </div>
   </section>
</template>