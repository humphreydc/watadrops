<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()

const userName = ref('')
const userEmail = ref('')
const userRole = ref('')
const studentNumber = ref('')
const loadingProfile = ref(true)
const dropdownOpen = ref(false)

// Fetch user info when auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        const data = snap.data()
        userName.value = data.name || user.email
        userEmail.value = data.email || user.email
        userRole.value = data.role || 'student'
        studentNumber.value = data.studentNumber || data.student_number || ''
      } else {
        userName.value = user.email
        userEmail.value = user.email
        userRole.value = 'student'
        studentNumber.value = ''
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err)
      userName.value = user.email
      userEmail.value = user.email
      userRole.value = 'student'
      studentNumber.value = ''
    } finally {
      loadingProfile.value = false
    }
  } else {
    userName.value = 'Guest'
    userEmail.value = ''
    userRole.value = ''
    studentNumber.value = ''
    loadingProfile.value = false
  }
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const logout = async () => {
  try {
    await auth.signOut()
    router.push('/')
  } catch (err) {
    console.error("Logout failed:", err)
  }
}
</script>

<template>
  <nav class="w-full border border-gray-200 z-10 bg-white">
    <div class="flex justify-between items-center py-2 px-2 sm:px-4 gap-2">
      <!-- Left: Sidebar + Title -->
      <div class="flex items-center gap-2 sm:gap-4">
        <button
          @click="emit('toggle-sidebar')" 
          type="button" 
          class="w-10 h-10 sm:w-12 sm:h-12 text-2xl sm:text-3xl hover:bg-gray-50 rounded-full cursor-pointer flex justify-center items-center"
        >☰</button>
        <p class="text-lg sm:text-2xl font-semibold">Dashboard</p>
      </div>

      <!-- Right: Profile Dropdown -->
      <div class="relative flex justify-end">
        <button 
          @click="toggleDropdown" 
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full cursor-pointer hover:bg-gray-50 transition"
        >
          <!-- Show role on navbar (capitalized) -->
          <span class="font-medium truncate text-sm sm:text-base">
            {{ loadingProfile ? 'Loading...' : (userRole.charAt(0).toUpperCase() + userRole.slice(1)) }}
          </span>
          <!-- Arrow indicator -->
          <svg 
            :class="['w-3 h-3 transition-transform duration-200', dropdownOpen ? 'rotate-[-90deg]' : 'rotate-90']"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div 
          v-if="dropdownOpen" 
          class="absolute right-0 w-48 sm:w-56 bg-white border border-gray-300 rounded-t-none rounded-b shadow-lg z-50"
          style="top: 100%;" 
        >
          <!-- User info section -->
          <div class="px-4 py-3 border-b border-gray-300">
            <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
            <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
            <p v-if="studentNumber" class="text-xs text-gray-600 truncate mt-1">
                {{ studentNumber }}
            </p>
          </div>
          
          <!-- Logout button -->
          <button 
            @click="logout" 
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
span.truncate {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  span.truncate {
    max-width: 80px;
  }
}
</style>
