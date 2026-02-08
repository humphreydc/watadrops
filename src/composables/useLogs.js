import { ref, onMounted } from 'vue'
import { db } from '@/firebase/config'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

const logs = ref([])

export function useLogs() {
  onMounted(() => {
    const q = query(collection(db, 'logs'), orderBy('date', 'asc'))

    onSnapshot(q, (snapshot) => {
      logs.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  })

  return { logs }
}
