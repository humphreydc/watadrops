// src/composables/useStudentReports.js
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export function useStudentReports() {
  const reports = ref([])
  const loading = ref(true)

  let unsubscribe = null

  onAuthStateChanged(auth, (user) => {
    if (unsubscribe) unsubscribe()

    if (!user) {
      reports.value = []
      loading.value = false
      return
    }

    loading.value = true

    const q = query(
      collection(db, "reports"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    unsubscribe = onSnapshot(q, (snapshot) => {
      reports.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      loading.value = false
    })
  })

  return { reports, loading }
}
