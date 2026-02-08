<script setup>
import Electricity from '@/components/resources/Electricity.vue';
import Water from '@/components/resources/Water.vue';
import Graph from '@/components/admin/sections/Graph.vue';
import QuickStats from '@/components/resources/QuickStats.vue';
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 py-4 sm:px-8 sm:pt-12 gap-6 fade-up">
    <Electricity class="col-span-1"/>
    <Water/>
    <div class="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <Graph class="col-span-1 lg:col-span-2"/> 
      <QuickStats class="col-span-1"/>
    </div>
  </section>
</template>