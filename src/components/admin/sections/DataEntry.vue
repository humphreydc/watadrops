<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const type = ref('electricity')
const value = ref(null)
const location = ref('')
const date = ref('')

const submitLog = async () => {
  if (!value.value || !location.value || !date.value) return

  await addDoc(collection(db, 'logs'), {
    type: type.value,
    value: Number(value.value),
    location: location.value,
    date: Timestamp.fromDate(new Date(date.value))
  })

  // reset form
  value.value = null
  location.value = ''
  date.value = ''
}
</script>

<template>
  <section class="card-border -mt-10 sm:m-8 ">
    <h1 class="font-bold text-sm tracking-widest mb-4">MANUAL DATA ENTRY</h1>

    <form @submit.prevent="submitLog">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        
        <!-- RESOURCE TYPE -->
        <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
          RESOURCE TYPE
          <select v-model="type" class="input-border">
            <option value="electricity">Electricity (kWh)</option>
            <option value="water">Water (Liters)</option>
          </select>
        </div>

        <!-- VALUE -->
        <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
          CONSUMPTION VALUE
          <input
            type="number"
            v-model="value"
            class="input-border"
            placeholder="0.00"
          />
        </div>

        <!-- LOCATION -->
        <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
          LOCATION
          <input
            type="text"
            v-model="location"
            class="input-border"
            placeholder="e.g. SSC 411"
          />
        </div>

        <!-- DATE -->
        <div class="flex flex-col text-xs text-gray-500 font-semibold tracking-widest">
          LOG DATE
          <input type="date" v-model="date" class="input-border" />
        </div>
      </div>

      <!-- SUBMIT -->
      <button
        type="submit"
        class="bg-(--bg-color) text-sm text-white font-bold px-5 py-3 rounded-sm flex items-center ml-auto cursor-pointer"
      >
        LOG DATA ENTRY
      </button>
    </form>
  </section>
</template>