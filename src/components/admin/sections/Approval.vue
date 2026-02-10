<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '@/firebase/config'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { Users, Mail, Hash, Clock, CheckCircle, XCircle } from 'lucide-vue-next'

const requests = ref([])
const loading = ref(true)
const errorMessage = ref(null)
const selectedStatus = ref('All')

// Available status filters
const statusFilters = ['All', 'Pending', 'Approved', 'Rejected']

// Check if email is valid TUA email
const isTUAEmail = (email) => {
  return email?.toLowerCase().endsWith("@tua.edu.ph")
}

// Filter requests based on selected status
const filteredRequests = computed(() => {
  if (selectedStatus.value === 'All') return requests.value
  return requests.value.filter(r => r.status === selectedStatus.value.toLowerCase())
})

// Count by status
const statusCounts = computed(() => {
  return {
    total: requests.value.length,
    pending: requests.value.filter(r => r.status === 'pending').length,
    approved: requests.value.filter(r => r.status === 'approved').length,
    rejected: requests.value.filter(r => r.status === 'rejected').length
  }
})

// Load all requests and auto-approve valid TUA emails
const loadRequests = async () => {
  try {
    loading.value = true
    errorMessage.value = null

    console.log("Loading dashboard requests...")

    const snap = await getDocs(collection(db, "dashboardRequests"))

    const list = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }))

    console.log("Fetched requests:", list)

    // Auto-approve logic
    for (const req of list) {
      if (
        req.status === "pending" &&
        isTUAEmail(req.email)
      ) {
        await updateDoc(doc(db, "dashboardRequests", req.id), {
          status: "approved",
          autoApproved: true
        })

        req.status = "approved"
        req.autoApproved = true

        console.log(`Auto-approved request for ${req.email}`)
      }
    }

    requests.value = list

  } catch (error) {
    console.error("Error loading requests:", error)
    errorMessage.value = "Failed to load requests. Check console for details."
  } finally {
    loading.value = false
  }
}

const approve = async (id) => {
  try {
    await updateDoc(doc(db, "dashboardRequests", id), {
      status: "approved",
      autoApproved: false
    })

    await loadRequests()

  } catch (error) {
    console.error("Error approving request:", error)
  }
}

const reject = async (id) => {
  try {
    await updateDoc(doc(db, "dashboardRequests", id), {
      status: "rejected",
      autoApproved: false
    })

    await loadRequests()

  } catch (error) {
    console.error("Error rejecting request:", error)
  }
}

// Format timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(loadRequests)
</script>

<template>
  <section class="p-4 lg:px-8 lg:py-12 min-h-[70vh] fade-up">

    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-start justify-between flex-wrap gap-4 mb-3">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Student Dashboard Requests
          </h1>  
          <p class="text-sm text-gray-600">
            Manage and approve student access requests
          </p> 
        </div>
        
        <!-- Stats Cards -->
        <div class="flex gap-3 flex-wrap">
          <div class="bg-blue-50 border border-blue-300 rounded-lg px-5 py-3">
            <p class="text-xs font-semibold text-gray-600 mb-1">Total Requests</p>
            <p class="text-2xl font-bold text-blue-700">{{ statusCounts.total }}</p>
          </div>
          <div v-if="statusCounts.pending > 0" class="bg-yellow-50 border border-yellow-300 rounded-lg px-5 py-3">
            <p class="text-xs font-semibold text-gray-600 mb-1">Pending</p>
            <p class="text-2xl font-bold text-yellow-700">{{ statusCounts.pending }}</p>
          </div>
        </div>
      </div>

      <!-- Status Filter -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-sm font-medium text-gray-700">Filter by:</span>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="status in statusFilters"
            :key="status"
            @click="selectedStatus = status"
            class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            :class="selectedStatus === status 
              ? 'bg-green-500 text-white border-green-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
          >
            {{ status }}
          </button>
        </div>
      </div>
    </div>

    <!-- ERROR MESSAGE -->
    <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700">
      <p class="font-semibold mb-1">Error</p>
      <p class="text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="w-10 h-10 border-3 border-gray-300 border-t-green-500 rounded-full animate-spin mb-3"></div>
      <p class="text-sm text-gray-600">Loading requests...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="filteredRequests.length === 0" class="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-gray-200">
      <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
        <Users class="w-8 h-8 text-gray-400" />
      </div>
      <p class="text-base font-semibold text-gray-800 mb-1">
        {{ selectedStatus === 'All' ? 'No student requests' : `No ${selectedStatus.toLowerCase()} requests` }}
      </p>
      <p class="text-sm text-gray-500">
        {{ selectedStatus === 'All' ? 'Requests will show up here when students apply' : 'Try selecting a different status filter' }}
      </p>
    </div>

    <!-- Desktop Table -->
    <div v-else class="hidden md:block w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b border-gray-200">
            <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Student Info</th>
            <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Contact</th>
            <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase text-center">Status</th>
            <th class="px-6 py-4 text-xs font-bold text-gray-600 uppercase text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="r in filteredRequests" :key="r.id" class="hover:bg-gray-50 transition-colors">
            <!-- Student Info -->
            <td class="px-6 py-5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm">
                  {{ r.name?.charAt(0)?.toUpperCase() || '?' }}
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-900">{{ r.name }}</span>
                  <div class="flex items-center gap-1.5 mt-0.5">
                    <Hash class="w-3 h-3 text-gray-400" />
                    <span class="text-xs text-gray-500">{{ r.studentNumber }}</span>
                  </div>
                </div>
              </div>
            </td>

            <!-- Contact -->
            <td class="px-6 py-5">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-1.5">
                  <Mail class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700">{{ r.email }}</span>
                </div>
                <span
                  v-if="isTUAEmail(r.email)"
                  class="inline-flex items-center gap-1 w-fit px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium"
                >
                  <CheckCircle class="w-3 h-3" />
                  Valid TUA Email
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1 w-fit px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium"
                >
                  <XCircle class="w-3 h-3" />
                  External Email
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-5 text-center">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                :class="{
                  'bg-green-100 text-green-700 border-green-300': r.status === 'approved',
                  'bg-red-100 text-red-700 border-red-300': r.status === 'rejected',
                  'bg-yellow-100 text-yellow-700 border-yellow-300': r.status === 'pending'
                }"
              >
                <CheckCircle v-if="r.status === 'approved'" class="w-3.5 h-3.5" />
                <XCircle v-else-if="r.status === 'rejected'" class="w-3.5 h-3.5" />
                <Clock v-else class="w-3.5 h-3.5" />
                {{ r.status?.charAt(0).toUpperCase() + r.status?.slice(1) }}
                <span v-if="r.autoApproved" class="ml-0.5">(Auto)</span>
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-5">
              <div class="flex items-center justify-center gap-2">
                <button
                  @click="approve(r.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  :class="r.status === 'approved' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'"
                  :disabled="r.status === 'approved'"
                >
                  <CheckCircle class="w-3.5 h-3.5" />
                  Approve
                </button>

                <button
                  @click="reject(r.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  :class="r.status === 'rejected' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'"
                  :disabled="r.status === 'rejected'"
                >
                  <XCircle class="w-3.5 h-3.5" />
                  Decline
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div v-if="filteredRequests.length" class="md:hidden space-y-4">
      <div
        v-for="r in filteredRequests"
        :key="r.id"
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
              {{ r.name?.charAt(0)?.toUpperCase() || '?' }}
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-900">{{ r.name }}</h3>
              <p class="text-xs text-gray-500 flex items-center gap-1">
                <Hash class="w-3 h-3" />
                {{ r.studentNumber }}
              </p>
            </div>
          </div>
          <span
            class="px-2.5 py-1 rounded-md text-xs font-semibold border"
            :class="{
              'bg-green-100 text-green-700 border-green-300': r.status === 'approved',
              'bg-red-100 text-red-700 border-red-300': r.status === 'rejected',
              'bg-yellow-100 text-yellow-700 border-yellow-300': r.status === 'pending'
            }"
          >
            {{ r.status?.charAt(0).toUpperCase() + r.status?.slice(1) }}
          </span>
        </div>

        <!-- Email -->
        <div class="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
          <p class="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
            <Mail class="w-3.5 h-3.5" />
            Email Address
          </p>
          <p class="text-sm text-gray-900 mb-2">{{ r.email }}</p>
          <span
            v-if="isTUAEmail(r.email)"
            class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
          >
            <CheckCircle class="w-3 h-3" />
            Valid TUA Email
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium"
          >
            <XCircle class="w-3 h-3" />
            External Email
          </span>
        </div>

        <!-- Auto Approved Badge -->
        <div v-if="r.autoApproved" class="bg-green-50 border border-green-200 rounded-md p-2 mb-3 text-center">
          <p class="text-xs font-medium text-green-700">✓ Auto-approved (Valid TUA Email)</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <button
            @click="approve(r.id)"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="r.status === 'approved' 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'"
            :disabled="r.status === 'approved'"
          >
            <CheckCircle class="w-4 h-4" />
            Approve
          </button>

          <button
            @click="reject(r.id)"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="r.status === 'rejected' 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-orange-600 text-white hover:bg-orange-700'"
            :disabled="r.status === 'rejected'"
          >
            <XCircle class="w-4 h-4" />
            Decline
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.fade-up {
  animation: fadeUp 0.5s ease-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>