import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import StudentPage from '@/views/StudentPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import StudentRequest from '@/views/StudentRequest.vue'

import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage
  },
  {
    path: "/student-dashboard",
    name: "StudentDashboard",
    component: StudentPage,
    meta: { requiresApproval: true }
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminPage
  },
  {
    path: "/student-request",
    name: "StudentRequest",
    component: StudentRequest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

const auth = getAuth()
const db = getFirestore()

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser

  try {
    // ===== 1. BLOCK UNAPPROVED STUDENTS FROM DASHBOARD =====
    if (to.meta.requiresApproval) {
      if (!user) {
        return next("/")
      }

      const snap = await getDocs(collection(db, "dashboardRequests"))

      const request = snap.docs.find(
        d => d.data().uid === user.uid && d.data().status === "approved"
      )

      if (!request) {
        alert("You are not approved to access this dashboard yet.")
        return next("/")
      }
    }

    // ===== 2. REDIRECT LOGGED-IN USERS AWAY FROM REGISTER PAGE =====
    if (user && to.name === "Register") {
      const snap = await getDoc(doc(db, "users", user.uid))

      if (snap.exists()) {
        const role = snap.data().role

        if (role === "admin") {
          return next({ name: "AdminDashboard" })
        } else {
          return next({ name: "StudentDashboard" })
        }
      }
    }

    next()

  } catch (err) {
    console.error("Router guard error:", err)
    next()
  }
})

export default router
