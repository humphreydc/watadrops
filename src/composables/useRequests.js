import { ref, onMounted } from 'vue'
import { db } from '@/firebase/config'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore'

export function useRequests() {
  const requests = ref([])
  const lastVisible = ref(null)
  const loading = ref(false)

  const loadRequests = () => {
    const q = query(
      collection(db, 'requests'),
      orderBy('createdAt', 'desc'),
      limit(10)
    )

    onSnapshot(q, snapshot => {
      requests.value = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }))

      lastVisible.value = snapshot.docs[snapshot.docs.length - 1]
    })
  }

  const loadMore = async () => {
    if (!lastVisible.value) return

    loading.value = true

    const q = query(
      collection(db, 'requests'),
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible.value),
      limit(10)
    )

    onSnapshot(q, snapshot => {
      const more = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }))

      requests.value.push(...more)

      lastVisible.value = snapshot.docs[snapshot.docs.length - 1]
      loading.value = false
    })
  }

  const addRequest = async (data) => {
    await addDoc(collection(db, 'requests'), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
      resolvedAt: null
    })
  }

  const resolveRequest = async (id, summary) => {
    await updateDoc(doc(db, 'requests', id), {
      status: 'resolved',
      resolvedAt: serverTimestamp(),
      resolution: summary
    })
  }

  const assignRequest = async (id) => {
    await updateDoc(doc(db, 'requests', id), {
      status: 'assigned'
    })
  }

  onMounted(loadRequests)

  return {
    requests,
    addRequest,
    resolveRequest,
    assignRequest,
    loadMore,
    loading
  }
}
