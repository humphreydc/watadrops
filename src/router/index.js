import { createRouter, createWebHistory } from 'vue-router'
import AdminHomePage from '@/views/AdminHomePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import StudentPage from '@/views/StudentPage.vue'
import AdminPage from '@/views/AdminPage.vue'

const routes = [
    {
        path: "/",
        name: "AdminHome",
        component: AdminHomePage
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

export default router
