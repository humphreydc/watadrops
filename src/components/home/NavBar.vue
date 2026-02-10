<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
import { auth, db } from '@/firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

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
const role = ref(null)
const requestApproved = ref(false)
const loading = ref(true)

// Check approval in Firestore
const checkStudentRequestStatus = async (uid) => {
  try {
    const q = query(
      collection(db, "dashboardRequests"),
      where("uid", "==", uid),
      where("status", "==", "approved")
    )

    const snapshot = await getDocs(q)

    requestApproved.value = !snapshot.empty

  } catch (error) {
    console.error("Error checking request status:", error)
    requestApproved.value = false
  }
}

// Auth listener
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

// 🔥 NEW: Decide button label dynamically
const dashboardButtonLabel = computed(() => {
  if (isAdmin.value) return "Dashboard"

  if (isStudent.value) {
    return requestApproved.value
      ? "Dashboard"
      : "Request Student Dashboard"
  }

  return "Dashboard"
})

// 🔥 Click logic
const goToDashboard = () => {
  if (isAdmin.value) {
    router.push("/admin-dashboard")
    return
  }

  if (isStudent.value) {
    if (requestApproved.value) {
      router.push("/student-dashboard")
    } else {
      router.push("/student-request")
    }
  }
}
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
          <li v-for="item in navItems" :key="item.id">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>

        <div class="flex items-center gap-4" v-if="!loading">

          <!-- Not Signed In -->
          <template v-if="!isSignedIn">
            <router-link to="/register" class="border py-1 px-5 rounded-sm bg-white">
              Login
            </router-link>
            <router-link to="/register" class="border py-1 px-5 rounded-sm bg-white">
              Sign Up
            </router-link>
          </template>

          <!-- 🔥 SINGLE BUTTON WITH DYNAMIC LABEL -->
          <button
            v-else
            @click="goToDashboard"
            class="border py-2 px-5 rounded-lg text-white font-semibold bg-(--primary-color)"
          >
            {{ dashboardButtonLabel }}
          </button>

        </div>
      </div>
    </div>

    <!-- Mobile Navbar -->
    <div class="flex justify-between items-center px-6 py-3 lg:hidden">
      <div class="flex items-center gap-4">
        <img src="/src/assets/logo.png" alt="logo" class="w-8">
        <h1 class="text-2xl font-bold bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">Watts & Drops</h1>
      </div>

      <button @click="isMenuOpen = !isMenuOpen" class="text-2xl">
        {{ isMenuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <div v-if="isMenuOpen" class="flex flex-col items-center gap-6 py-8 lg:hidden">
      <ul class="flex flex-col items-center gap-6">
        <li v-for="item in navItems" :key="item.id">
          <a :href="item.href" @click="isMenuOpen = false">{{ item.label }}</a>
        </li>
      </ul>

      <div class="flex items-center gap-2" v-if="!loading">

        <template v-if="!isSignedIn">
          <router-link to="/register">Login</router-link>
          <router-link to="/register">Sign Up</router-link>
        </template>

        <!-- 🔥 SAME LOGIC FOR MOBILE -->
        <button
          v-else
          @click="goToDashboard"
          class="border py-1 px-5 rounded-lg bg-(--primary-color) text-white"
        >
          {{ dashboardButtonLabel }}
        </button>

      </div>
    </div>

  </nav>
</template>
