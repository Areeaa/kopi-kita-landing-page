import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getSession, onAuthStateChange } from '../services/authService'

export default function PrivateRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    getSession()
      .then((sessionData) => {
        if (mounted) setSession(sessionData)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    const subscription = onAuthStateChange(setSession)
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (!isSupabaseConfigured) return <Navigate to="/admin/login" replace />
  if (loading) return <div className="grid min-h-screen place-items-center bg-coffee-50">Memeriksa sesi admin...</div>
  if (!session) return <Navigate to="/admin/login" replace />

  return children
}
