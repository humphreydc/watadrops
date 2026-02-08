<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { Target, Leaf, Award, Droplets, TrendingUp, Zap } from 'lucide-vue-next';

const router = useRouter()
const isLogin = ref(true)

// form fields
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const studentNumber = ref('')
const role = ref('student')
const userName = ref('')

// FEEDBACK STATES
const message = ref('')
const messageType = ref('') // success | error | info
const loading = ref(false)

const toggleMode = (mode) => {
  isLogin.value = mode === 'login'
  message.value = ''
}

const redirectByRole = () => {
  message.value = "Login successful!"
  messageType.value = "success"

  setTimeout(() => {
    router.push('/')
  }, 1200)
}

/* SIGN UP */
const signup = async () => {
  try {
    message.value = ''
    loading.value = true

    if (!email.value || !password.value || !studentNumber.value) {
      message.value = "Please fill out all fields"
      messageType.value = "error"
      loading.value = false
      return
    }

    if (password.value !== confirmPassword.value) {
      message.value = "Passwords do not match"
      messageType.value = "error"
      loading.value = false
      return
    }

    await createUserWithEmailAndPassword(auth, email.value, password.value)

    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      name: userName.value,
      email: email.value,
      role: 'student',
      studentNumber: studentNumber.value,
      createdAt: new Date()
    })

    message.value = "Account created successfully! Logging you in..."
    messageType.value = "success"

    setTimeout(() => {
      redirectByRole('student')
    }, 1200)

  } catch (error) {
    console.error(error)

    message.value = error.message.replace("Firebase: ", "")
    messageType.value = "error"

  } finally {
    loading.value = false
  }
}

/* LOGIN */
const login = async () => {
  try {
    message.value = ''
    loading.value = true

    if (!email.value || !password.value) {
      message.value = "Please enter email and password"
      messageType.value = "error"
      loading.value = false
      return
    }

    const res = await signInWithEmailAndPassword(auth, email.value, password.value)

    const userDoc = await getDoc(doc(db, 'users', res.user.uid))

    if (!userDoc.exists()) {
      message.value = "User data not found. Please contact admin."
      messageType.value = "error"
      loading.value = false
      return
    }

    const userData = userDoc.data()

    if (userData.role !== role.value) {
      message.value = "Incorrect role selected for this account"
      messageType.value = "error"
      loading.value = false
      return
    }

    redirectByRole(userData.role)

  } catch (error) {
    console.error(error)

    message.value = "Login failed: " + error.message.replace("Firebase: ", "")
    messageType.value = "error"

  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center px-4 py-8 relative overflow-hidden">
    <!-- Background Design -->
    <div class="absolute inset-0 bg-linear-to-br from-green-50 via-white to-blue-50"></div>
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Large circles - Blue and Green -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-24 left-1/3 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 -right-12 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-1000"></div>
      <div class="absolute bottom-1/4 -left-12 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-3000"></div>
      <div class="absolute top-1/3 left-1/2 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-5000"></div>
      <div class="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-6000"></div>
      <div class="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-7000"></div>
      <div class="absolute bottom-1/2 left-1/4 w-56 h-56 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-8000"></div>
      <div class="absolute top-2/3 right-1/3 w-56 h-56 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-9000"></div>
      <div class="absolute top-1/5 right-1/5 w-48 h-48 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-10000"></div>
      <div class="absolute bottom-1/5 left-2/3 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-11000"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <!-- Floating droplet shapes - Blue and Green -->
      <div class="absolute top-[5%] left-[10%] w-3 h-3 bg-blue-400 rounded-full opacity-25 animate-float"></div>
      <div class="absolute top-[8%] left-[45%] w-2 h-2 bg-green-400 rounded-full opacity-25 animate-float animation-delay-1000"></div>
      <div class="absolute top-[12%] right-[15%] w-4 h-4 bg-teal-300 rounded-full opacity-25 animate-float animation-delay-2000"></div>

      <!-- Upper Mid Area -->
      <div class="absolute top-[20%] left-[25%] w-3 h-3 bg-cyan-400 rounded-full opacity-20 animate-float animation-delay-3000"></div>
      <div class="absolute top-[22%] right-[30%] w-2 h-2 bg-blue-300 rounded-full opacity-25 animate-float animation-delay-4000"></div>
      <div class="absolute top-[28%] left-[60%] w-3 h-3 bg-emerald-400 rounded-full opacity-20 animate-float animation-delay-5000"></div>

      <!-- Center Area -->
      <div class="absolute top-[40%] left-[10%] w-4 h-4 bg-green-300 rounded-full opacity-25 animate-float animation-delay-6000"></div>
      <div class="absolute top-[42%] right-[12%] w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-float animation-delay-7000"></div>
      <div class="absolute top-[48%] left-[50%] w-2 h-2 bg-teal-400 rounded-full opacity-25 animate-float animation-delay-8000"></div>

      <!-- Lower Mid Area -->
      <div class="absolute bottom-[40%] left-[20%] w-3 h-3 bg-cyan-300 rounded-full opacity-20 animate-float animation-delay-9000"></div>
      <div class="absolute bottom-[38%] right-[22%] w-2 h-2 bg-green-500 rounded-full opacity-25 animate-float animation-delay-10000"></div>
      <div class="absolute bottom-[34%] left-[70%] w-4 h-4 bg-blue-300 rounded-full opacity-20 animate-float animation-delay-11000"></div>

      <!-- Bottom Area -->
      <div class="absolute bottom-[15%] left-[12%] w-3 h-3 bg-teal-300 rounded-full opacity-25 animate-float animation-delay-12000"></div>
      <div class="absolute bottom-[18%] right-[40%] w-2 h-2 bg-emerald-400 rounded-full opacity-20 animate-float animation-delay-13000"></div>
      <div class="absolute bottom-[10%] right-[8%] w-3 h-3 bg-blue-200 rounded-full opacity-25 animate-float animation-delay-14000"></div>

      <!-- Far Corners -->
      <div class="absolute top-[5%] right-[5%] w-2 h-2 bg-green-200 rounded-full opacity-20 animate-float animation-delay-15000"></div>
      <div class="absolute bottom-[5%] left-[5%] w-2 h-2 bg-cyan-200 rounded-full opacity-20 animate-float animation-delay-16000"></div>
      <div class="absolute top-[50%] right-[2%] w-3 h-3 bg-teal-200 rounded-full opacity-20 animate-float animation-delay-17000"></div>
      <div class="absolute bottom-[50%] left-[2%] w-3 h-3 bg-blue-300 rounded-full opacity-20 animate-float animation-delay-18000"></div>
      
    </div>
    
    <!-- Main Content -->
    <div class="w-full max-w-lg relative z-10">
      <div class="card-border py-6 px-8 sm:py-8 sm:px-12 bg-white/80 backdrop-blur-sm">
        <!-- Logo and Title -->
        <div class="flex flex-col items-center mb-8">
          <img 
            src="/src/assets/logo.png" 
            alt="Watts & Drops Logo" 
            class="w-12 sm:w-14 mb-3"
          >
          <div class="text-center">
            <h1 class="text-3xl sm:text-4xl font-black bg-linear-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-1">
              Watts & Drops
            </h1>
            <p class="text-xs sm:text-sm tracking-wide text-gray-600">
              Enterprise Resource Management
            </p>
          </div>
        </div>

        <!-- Tab Switcher -->
        <div class="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            @click="toggleMode('login')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all cursor-pointer',
              isLogin 
                ? 'bg-white text-(--primary-color) shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Login
          </button>
          <button
            @click="toggleMode('signup')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all cursor-pointer',
              !isLogin 
                ? 'bg-white text-(--primary-color) shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Sign Up
          </button>
        </div>
        <!-- FEEDBACK MESSAGE -->
        <div v-if="message" class="mb-4 text-center text-sm font-semibold"
            :class="{
            'text-green-600': messageType === 'success',
            'text-red-600': messageType === 'error',
            'text-blue-600': messageType === 'info'
            }">
        {{ message }}
        </div>
        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="login" class="space-y-4">
            <!-- ROLE SELECTOR (LOGIN ONLY) -->
            <select v-model="role" class="input-border w-full px-4 py-2.5">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>
            <!-- NAME FIELD (optional for display) -->
            <input
                v-model="userName"
                type="text"
                class="input-border w-full px-4 py-2.5"
                placeholder="Name"
            />
            <input
                v-model="email"
                type="text"
                class="input-border w-full px-4 py-2.5"
                placeholder="Email"
            />

            <input
                v-model="password"
                type="password"
                class="input-border w-full px-4 py-2.5"
                placeholder="Password"
            />

            <button
                type="submit"
                class="w-full py-2.5 bg-(--primary-color) text-white font-semibold rounded-lg cursor-pointer"
            >
                Login
            </button>
        </form>

        <!-- Signup Form -->
        <form v-else @submit.prevent="signup" class="space-y-4">

            <input
                v-model="userName"
                type="text"
                class="input-border w-full px-4 py-2.5"
                placeholder="Name"
            />

            <input
                v-model="studentNumber"
                type="text"
                class="input-border w-full px-4 py-2.5"
                placeholder="Student Number"
            />

            <input
                v-model="email"
                type="email"
                class="input-border w-full px-4 py-2.5"
                placeholder="Email Address"
            />

            <input
                v-model="password"
                type="password"
                class="input-border w-full px-4 py-2.5"
                placeholder="Password"
            />

            <input
                v-model="confirmPassword"
                type="password"
                class="input-border w-full px-4 py-2.5"
                placeholder="Confirm Password"
            />

            <button
                type="submit"
                class="w-full py-2.5 bg-(--primary-color) text-white font-semibold rounded-lg cursor-pointer"
            >
                Create Account
            </button>
        </form>  
        <div class="mt-6 pt-4 border-t border-green-100 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Leaf class="h-4 w-4 text-green-500" />
          <span>Powered by Watts & Drops</span>
          <Droplets class="h-4 w-4 text-blue-500" />
        </div> 
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grid pattern background */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Blob animation */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-7000 {
  animation-delay: 7s;
}

.animation-delay-8000 {
  animation-delay: 8s;
}

.animation-delay-9000 {
  animation-delay: 9s;
}

.animation-delay-10000 {
  animation-delay: 10s;
}

.animation-delay-11000 {
  animation-delay: 11s;
}

/* Float animation for droplets */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0.4;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>