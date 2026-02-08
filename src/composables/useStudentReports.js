import { ref, onMounted } from 'vue'
import { auth, db } from '@/firebase/config'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'

export function useStudentReports() {

  const reports = ref([])
  const loading = ref(false)

  const fetchReports = () => {
    loading.value = true

    const user = auth.currentUser

    if (!user) {
      loading.value = false
      return
    }

    const q = query(
      collection(db, "reports"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    onSnapshot(q, (snapshot) => {
      reports.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      loading.value = false
    })
  }

  onMounted(fetchReports)

  return {
    reports,
    loading
  }
}
