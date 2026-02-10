<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const showModal = ref(false)
const user = ref(null)
const isSubmitting = ref(false) // Loading state

const form = ref({
  name: '',
  studentNumber: '',
  reason: ''
})

onAuthStateChanged(auth, (u) => {
  user.value = u
})

const submitRequest = async () => {
  if (!user.value) return alert("You must be logged in first.")
  if (!form.value.name || !form.value.studentNumber) return alert("Please fill in all fields.")

  isSubmitting.value = true
  try {
    await addDoc(collection(db, "dashboardRequests"), {
      uid: user.value.uid,
      email: user.value.email,      
      name: form.value.name,
      studentNumber: form.value.studentNumber,
      reason: form.value.reason,
      status: "pending",
      createdAt: serverTimestamp()
    })

    alert("Request sent to admin for approval!")
    form.value = { name: '', studentNumber: '', reason: '' }
    showModal.value = false
  } catch (err) {
    console.error(err)
    alert("Failed to send request")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">

    <!-- Navbar -->
    <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 sm:px-12 py-4 flex items-center justify-between">
        <h1 class="text-2xl lg:text-3xl font-black tracking-tight bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent flex items-center gap-4">
         <img src="/src/assets/logo.png" alt="logo" class="w-8">
         Watts & Drops
      </h1>
      <div class="flex items-center gap-6">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:block">Student Portal</p>
        <button @click="showModal = true" class="gradient-btn text-xs sm:text-base px-2 py-1 sm:px-6 sm:py-2">
          Dashboard
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="grow flex items-center justify-center py-12 px-6">
      <header class="max-w-4xl w-full text-center space-y-6">
        <div class="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
          Sustainability Tracking
        </div>
        <h2 class="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
          Campus <span class="bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">Resource Usage</span>
        </h2>
        <p class="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Real-time monitoring of university electricity and water consumption. Request access to see live data and analytics.
        </p>
        
        <div class="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div class="text-emerald-500 mb-2">⚡ Electricity</div>
                <p class="text-sm text-gray-500">Track peak usage and grid efficiency across campus buildings.</p>
            </div>
            <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div class="text-cyan-500 mb-2">💧 Water</div>
                <p class="text-sm text-gray-500">Monitor conservation efforts and daily flow rates.</p>
            </div>
        </div>
      </header>
    </main>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md mx-4">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Request Access</h2>
          <p class="text-gray-500 text-sm">Fill in your details to get dashboard credentials.</p>
        </div>

        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Full Name</label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Student ID</label>
            <input v-model="form.studentNumber" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Reason</label>
            <textarea v-model="form.reason" rows="3" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"></textarea>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8">
          <button @click="showModal = false" class="px-6 py-2.5 text-gray-500 font-medium hover:text-gray-800 transition">
            Cancel
          </button>
          <button @click="submitRequest" :disabled="isSubmitting" class="gradient-btn px-8">
            {{ isSubmitting ? 'Sending...' : 'Submit Request' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 py-8 text-center">
      <p class="text-gray-400 text-sm">
        © 2026 Watts & Drops <span class="mx-2">|</span> Sustainable Campus Initiative
      </p>
    </footer>
  </div>
</template>
