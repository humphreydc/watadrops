<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
import { auth, db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const isMenuOpen = ref(false)

// Navbar links
const navItems = ref([
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "how-it-works", label: "How It Works", href: "#how-it-works" }, 
  { id: "reports", label: "Reports", href: "#reports" },
])

// User state
const user = ref(null)
const role = ref(null) // "admin" or "student"
const requestApproved = ref(false)
const loading = ref(true)

// Helper to check student's request approval
const checkStudentRequestStatus = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      requestApproved.value = userDoc.data().requestApproved || false
    } else {
      requestApproved.value = false
    }
  } catch (error) {
    console.error("Error checking request status:", error)
    requestApproved.value = false
  }
}

// Listen to auth state
onAuthStateChanged(auth, async (currentUser) => {
  loading.value = true
  user.value = currentUser

  if (currentUser) {
    const tokenResult = await getIdTokenResult(currentUser)
    role.value = tokenResult.claims.role || "student"

    if (role.value === "student") {
      await checkStudentRequestStatus(currentUser.uid)
    }
  } else {
    role.value = null
    requestApproved.value = false
  }

  loading.value = false
})

// Computed helpers
const isSignedIn = computed(() => !!user.value)
const isAdmin = computed(() => role.value === "admin")
const isStudent = computed(() => role.value === "student")

// Which button to show
const showDashboard = computed(() => isAdmin.value || (isStudent.value && requestApproved.value))
const showRequestButton = computed(() => isStudent.value && !requestApproved.value)

// Routes
const dashboardRoute = computed(() => isAdmin.value ? "/admin-dashboard" : "/student-dashboard")
const requestRoute = "/student-request"
</script>

<template>
  <nav class="w-full fixed top-0 border border-gray-200 bg-gray-50 z-50">

    <!-- Desktop Navbar -->
    <div class="hidden lg:flex justify-between items-center px-6 py-3 sm:px-10 sm:py-4">
      <div class="flex items-center gap-4">
        <img src="/src/assets/logo.png" alt="logo" class="w-8">
        <h1 class="text-2xl lg:text-3xl bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent font-bold">
          Watts & Drops
        </h1>
      </div>

      <div class="flex items-center gap-8">
        <ul class="flex items-center gap-8 font-medium">
          <li v-for="item in navItems" :key="item.id" class="cursor-pointer text-teal-900">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>

        <div class="flex items-center gap-4" v-if="!loading">
          <!-- Not Signed In -->
          <template v-if="!isSignedIn">
            <router-link to="/register" class="border py-1 px-5 rounded-sm bg-white hover:bg-gray-100">
              Login
            </router-link>
            <router-link to="/register" class="border py-1 px-5 rounded-sm bg-white hover:bg-gray-100">
              Sign Up
            </router-link>
          </template>

          <!-- Admin or approved student -->
          <router-link
            v-else-if="showDashboard"
            :to="dashboardRoute"
            class="border py-2 px-5 rounded-lg text-white font-semibold cursor-pointer bg-(--primary-color) hover:opacity-90"
          >
            Dashboard
          </router-link>

          <!-- Student who has not been approved -->
          <router-link
            v-else-if="showRequestButton"
            :to="requestRoute"
            class="border py-2 px-5 rounded-lg text-white font-semibold cursor-pointer bg-(--primary-color) hover:opacity-90"
          >
            Request Student Dashboard
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile Navbar -->
    <div class="flex justify-between items-center px-6 py-3 lg:hidden">
      <div class="flex items-center gap-4">
        <img src="/src/assets/logo.png" alt="logo" class="w-8">
        <h1 class="text-2xl lg:text-3xl bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent font-bold">Watts & Drops</h1>
      </div>

      <button @click="isMenuOpen = !isMenuOpen" class="w-12 h-12 text-3xl hover:bg-gray-100 rounded-full cursor-pointer">
        {{ isMenuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <div v-if="isMenuOpen" class="flex flex-col items-center gap-6 py-8 lg:hidden">
      <ul class="flex flex-col items-center gap-6">
        <li v-for="item in navItems" :key="item.id" class="cursor-pointer text-teal-900">
          <a :href="item.href" @click="isMenuOpen = false">{{ item.label }}</a>
        </li>
      </ul>

      <div class="flex items-center gap-2" v-if="!loading">
        <!-- Not Signed In -->
        <template v-if="!isSignedIn">
          <router-link to="/register" @click="isMenuOpen = false" class="border py-1 px-5 rounded-sm bg-white hover:bg-gray-100">Login</router-link>
          <router-link to="/register" @click="isMenuOpen = false" class="border py-1 px-5 rounded-sm bg-white hover:bg-gray-100">Sign Up</router-link>
        </template>

        <!-- Admin or approved student -->
        <router-link
          v-else-if="showDashboard"
          :to="dashboardRoute"
          @click="isMenuOpen = false"
          class="border py-1 px-5 rounded-lg bg-(--primary-color) text-white cursor-pointer hover:opacity-90"
        >
          Dashboard
        </router-link>

        <!-- Student who has not been approved -->
        <router-link
          v-else-if="showRequestButton"
          :to="requestRoute"
          @click="isMenuOpen = false"
          class="border py-1 px-5 rounded-lg bg-(--primary-color) text-white cursor-pointer hover:opacity-90"
        >
          Request Student Dashboard
        </router-link>
      </div>
    </div>
  </nav>
</template>
