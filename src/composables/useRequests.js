import { ref, onMounted } from 'vue'
import { db } from '@/firebase/config'
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore'

export function useRequests() {
  const requests = ref([])
  const loading = ref(true)

  const fetchRequests = () => {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      requests.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      loading.value = false
    }, (err) => {
      console.error(err)
      loading.value = false
    })
  }

  const resolveRequest = async (id, note) => {
    await updateDoc(doc(db, "reports", id), {
      status: "resolved",
      adminNote: note
    })
  }

  const assignRequest = async (id) => {
    await updateDoc(doc(db, "reports", id), {
      status: "assigned"
    })
  }

  const loadMore = () => {
    console.log("Load more clicked")
  }

  onMounted(fetchRequests)

  return {
    requests,
    loading,
    resolveRequest,
    assignRequest,
    loadMore
  }
}
