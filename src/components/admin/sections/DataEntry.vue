<script setup>
</script>

<template>
    <section class="card-border">
        <h1 class="font-bold text-sm tracking-widest">MANUAL DATA ENTRY</h1>
        <div class="pt-4">
            <!-- data enter form -->
            <form action="" method="post" >
                <!-- resource type data -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
                    <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
                        RESOURCE TYPE
                        <select name="" id="" class="input-border w-full">
                            <option value="electricity">Electricity (kWh)</option>
                            <option value="water">Water (Liters)</option>
                        </select>
                    </div>
                    <!-- value -->
                    <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
                        CONSUMPTION VALUE
                        <input type="number" name="" id="" class="input-border" placeholder="0.00">
                    </div>
                    <!-- location -->
                    <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
                        LOCATION
                        <input type="text" name="" id="" class="input-border" placeholder="e.g. SSC 411">
                    </div>
                    <!-- date -->
                    <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
                        LOG DATE
                        <input type="date" name="" id="" class="input-border">
                    </div>  
                </div>
                <!-- submit button -->
                <div class="flex justify-end mt-6">
                    <button type="submit" class="bg-(--bg-color) text-white font-bold text-xs px-5 py-3 rounded-sm cursor-pointer flex items-center">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"/>
                        </svg>LOG DATA ENTRY
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>