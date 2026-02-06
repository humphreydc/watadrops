import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

const logs = ref([])
let initialized = false

export function useLogs() {
  if (!initialized) {
    const q = query(collection(db, 'logs'), orderBy('date', 'asc'))
    onSnapshot(q, snapshot => {
      logs.value = snapshot.docs.map(doc => doc.data())
    })
    initialized = true
  }

  return { logs }
}
