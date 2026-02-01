<script setup>
import { ref } from 'vue';

</script>

<template>
    <!-- Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony. 
    Then, everything changed when the Fire Nation attacked. Only the Avatar, master of 
    all four elements, could stop them, but when the world needed him most, he vanished. 
    -->
    <!-- Do you remember the 21st night of september? -->
    <!-- firebase crud operation -->
    <div class="flex flex-col sm:flex-row">
        <!-- Electricity (meralco) -->
        <div class="card-border flex flex-col gap-6 w-full">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-100 rounded-xl flex justify-center items-center">
                        <svg class="w-8 h-8" fill="none" stroke="#fe9a00" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-gray-400 text-sm font-medium">INFRASTRUCTURE</div>
                        <div class="text-xl font-bold">Electricity</div>
                    </div>
                </div>
                    
                <div class="flex flex-col items-end gap-2">
                    <!-- here data -->
                    <div class="text-center text-xs text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full border border-green-200">-8%</div>
                    <div class="text-xs text-gray-400">vs last month</div>
                </div>
            </div>
                
            <!-- second inner section data  -->
            <div class="flex justify-between gap-2">
                <!-- basta kung ilang kwh -->
                <div>
                    <div class="text-xs font-medium text-gray-500 mb-1">Total Consumption</div>
                    <div class="font-bold text-sm text-gray-400"><span class="text-3xl font-black text-black mr-1">345</span>kWh</div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="text-xs text-amber-600 font-bold">PEAK LOAD STATUS</div>
                    <div class="flex justify-end items-center gap-1">
                        <div class="w-2 h-4 rounded-full bg-amber-500"></div>
                        <div class="w-2 h-4 rounded-full bg-amber-500"></div>
                        <div class="w-2 h-4 rounded-full bg-amber-500"></div>
                        <div class="w-2 h-4 rounded-full bg-gray-200"></div>
                        <div class="w-2 h-4 rounded-full bg-gray-200"></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <!-- percent calc -->
                    <div class="text-xs text-gray-500 font-bold">Monthly usage</div>
                    <div class="text-xs font-bold"><span>45</span>% Used</div>
                </div>
                <!-- same here -->
                <div class="w-full h-4 bg-gray-100 border border-gray-200 rounded-full flex items-center">
                    <div class="bg-amber-400 w-[45%] h-4 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>    
</template>