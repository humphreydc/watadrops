<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore'

const category = ref('')
const location = ref('')
const description = ref('')

const message = ref('')
const messageType = ref('')
const loading = ref(false)

const submitReport = async () => {
  try {
    message.value = ''
    loading.value = true

    if (!category.value || !location.value || !description.value) {
      message.value = "Please fill out all required fields"
      messageType.value = "error"
      loading.value = false
      return
    }

    // Get user info from Firestore
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    const userData = userDoc.exists() ? userDoc.data() : { name: 'Unknown', studentNumber: 'N/A' }

    await addDoc(collection(db, "reports"), {
      userId: auth.currentUser.uid,
      userName: userData.name,
      studentNumber: userData.studentNumber,
      category: category.value,
      location: location.value,
      description: description.value,
      status: "Pending",
      createdAt: serverTimestamp()
    })

    message.value = "Report submitted successfully!"
    messageType.value = "success"

    category.value = ''
    location.value = ''
    description.value = ''

  } catch (error) {
    console.error(error)
    message.value = "Failed to submit report"
    messageType.value = "error"
  } finally {
    loading.value = false
  }
}
</script>

<template>
<section class="px-4 py-8 lg:py-12 lg:px-8 fade-up">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
    <!-- Report Form -->
    <div class="w-full">
      <div class="card-border">
        <h2 class="text-2xl font-bold text-(--primary-color) mb-4">Report an Issue</h2>

        <div v-if="message" class="mb-4 text-sm font-semibold"
          :class="{
            'text-green-600': messageType === 'success',
            'text-red-600': messageType === 'error'
          }">
          {{ message }}
        </div>

        <form @submit.prevent="submitReport" class="space-y-4">

          <div>
            <label class="block text-sm font-semibold mb-1">Category</label>
            <select v-model="category" class="input-border w-full px-4 py-2.5">
              <option value="" disabled selected hidden>Select Category</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Facility">Facility</option>
              <option value="Equipment">Equipment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">Location</label>
            <input
              v-model="location"
              type="text"
              class="input-border w-full px-4 py-2.5"
              placeholder="e.g. Room 302, Library"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">Description</label>
            <textarea
              v-model="description"
              rows="4"
              class="input-border w-full px-4 py-2.5"
              placeholder="Describe the issue in detail..."
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 bg-(--primary-color) text-white font-semibold rounded-lg cursor-pointer"
          >
            {{ loading ? "Submitting..." : "Submit Report" }}
          </button>

        </form>
      </div>
    </div>

    <!-- Maintenance Awareness -->
    <div class="w-full">
      <div class="card-border p-8">
        <h2 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Maintenance Awareness</h2>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white bg-green-400">
                1
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed pt-0.5">
              Identify the specific room or area where the issue occurs.
            </p>
          </div>
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white bg-green-400">
                2
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed pt-0.5">
              Fill out the request form. Your report will be visible to admin with your name and student number.
            </p>
          </div>
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white bg-green-400">
                3
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed pt-0.5">
              Once maintenance resolves the issue, the alert will be cleared.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>