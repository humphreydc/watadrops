import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import StudentPage from '@/views/StudentPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
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
        component: StudentPage
    },
    {
        path: "/admin-dashboard",
        name: "AdminDashboard",
        component: AdminPage
    } 
];

const router = createRouter({
    history: createWebHistory(),
    routes
})
const auth = getAuth()
const db = getFirestore()

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser

  if (user) {
    // If going to RegisterPage while logged in, redirect to dashboard
    if (to.name === 'Register') {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        const role = snap.data().role
        if (role === 'admin') return next('/admin-dashboard')
        else return next('/student-dashboard')
      }
    }
  }

  next()
})

export default router
