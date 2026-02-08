<script setup>
import { ref, computed } from 'vue'
import { auth, db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

// Props & emits
const props = defineProps({
  collapsed: Boolean
})
const emit = defineEmits(['close', 'select'])

// ===== USER ROLE LOGIC =====
const userRole = ref('student')   // default
const loadingRole = ref(true)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        userRole.value = snap.data().role || 'student'
      }
    } catch (err) {
      console.error("Failed to get role:", err)
      userRole.value = 'student'
    } finally {
      loadingRole.value = false
    }
  } else {
    userRole.value = 'student'
    loadingRole.value = false
  }
})
// ======================


// ===== ICONS =====
const baseIcons = {
  overview: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"/>
    </svg>`,

  request: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
    </svg>`,

  resolution: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>`
}

// ===== ADMIN MENU =====
const adminNavItems = [
  { id: "overview", label: "Overview", icon: baseIcons.overview },
  { id: "request", label: "Request", icon: baseIcons.request },
  { id: "resolution", label: "Resolution", icon: baseIcons.resolution }
]

// ===== STUDENT MENU =====
const studentNavItems = [
  { id: "overview", label: "My Dashboard", icon: baseIcons.overview },
  { id: "report", label: "Report Issue", icon: baseIcons.request },
  { id: "history", label: "History", icon: baseIcons.resolution }
]

// ===== COMPUTED NAV ITEMS =====
const navItems = computed(() => {
  return userRole.value === 'admin' ? adminNavItems : studentNavItems
})

const activeItemId = ref("overview")

const isActive = (item) => {
  activeItemId.value = item.id
  emit('select', item.id)
  emit('close')
}
</script>

<template>
  <aside class="h-full bg-white border border-gray-200 hover:shadow-sm transition-all duration-300 flex flex-col">

    <div class="flex flex-col p-4 gap-16 flex-1">

      <!-- LOGO + TITLE -->
      <div :class="collapsed ? 'flex items-center justify-center' : 'flex items-center gap-4'">
        <img src="/src/assets/logo.png" alt="logo" class="w-8">
        <h1 v-if="!collapsed" class="text-2xl text-(--primary-color) font-bold">
          {{ loadingRole ? 'Loading...' : (userRole === 'admin' ? 'Admin Portal' : 'Student Portal') }}
        </h1>
        <button 
          @click="emit('close')" 
          class="lg:hidden p-2 text-xl text-gray-500 cursor-pointer">
          ✕
        </button>
      </div>

      <!-- NAVIGATION -->
      <div class="text-gray-600 flex flex-col gap-6">
        <p v-if="!collapsed" class="text-base font-semibold">
          {{ userRole === 'admin' ? 'Command Center' : 'Student Menu' }}
        </p>

        <ul class="flex flex-col gap-2">
          <li 
            v-for="item in navItems"
            :key="item.id"
            class="flex items-center text-sm font-semibold py-2 px-3 gap-3 cursor-pointer rounded-sm"
            @click="isActive(item)"
            :class="[
              activeItemId === item.id 
                ? (collapsed ? 'text-(--primary-color)' : 'bg-(--primary-color) text-white') 
                : 'text-gray-600 hover:bg-gray-100',
              collapsed ? 'justify-center px-0' : ''
            ]"
          >
            <span v-html="item.icon"></span>
            <span v-if="!collapsed">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- BACK TO HOME -->
    <div class="p-4 border-t border-gray-200">
      <router-link 
        to="/" 
        class="flex items-center gap-3 w-full text-left py-2 px-2 text-gray-600 hover:bg-gray-100 transition rounded-sm"
        :class="collapsed ? 'justify-center px-0' : ''"
        @click="emit('close')"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6">
          </path>
        </svg>
        <span v-if="!collapsed" class="text-sm font-semibold">Back to Home</span>
      </router-link>
    </div>
  </aside>
</template>
