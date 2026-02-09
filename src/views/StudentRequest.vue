<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const showModal = ref(false)
const user = ref(null)
const isSubmitting = ref(false) // New loading state

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
    
    <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 sm:px-12 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-black tracking-tight text-emerald-600">
        ⚡ Watts <span class="text-cyan-500">&</span> Drops
      </h1>
      <div class="flex items-center gap-6">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:block">Student Portal</p>
        <button @click="showModal = true" class="gradient-btn shadow-lg shadow-emerald-200">
          Access Dashboard
        </button>
      </div>
    </nav>

    <main class="flex-grow flex items-center justify-center py-12 px-6">
      <header class="max-w-4xl w-full text-center space-y-6">
        <div class="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
          Sustainability Tracking
        </div>
        <h2 class="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
          Campus <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500">Resource Usage</span>
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

    <div v-if="showModal" class="modal-backdrop px-4">
      <div class="modal-container w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Request Access</h2>
          <p class="text-gray-500 text-sm">Fill in your details to get dashboard credentials.</p>
        </div>

        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Full Name</label>
            <input v-model="form.name" placeholder="John Doe" class="custom-input" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Student ID</label>
            <input v-model="form.studentNumber" placeholder="2024-0001" class="custom-input" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Reason</label>
            <textarea v-model="form.reason" rows="3" placeholder="e.g., Research project..." class="custom-input"></textarea>
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

    <footer class="bg-white border-t border-gray-100 py-8 text-center">
      <p class="text-gray-400 text-sm">
        © 2026 Watts & Drops <span class="mx-2">|</span> Sustainable Campus Initiative
      </p>
    </footer>
  </div>
</template>

<style scoped>
.gradient-btn {
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: white;
  font-weight: 700;
  border-radius: 0.75rem;
  padding: 0.6rem 1.25rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}
.gradient-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.1);
}
.gradient-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.custom-input {
  border: 1.5px solid #f3f4f6;
  background-color: #f9fafb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  width: 100%;
  outline: none;
  transition: all 0.2s;
}
.custom-input:focus {
  border-color: #10b981;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.modal-container {
  animation: fade-in 0.2s ease-out;
}
</style>