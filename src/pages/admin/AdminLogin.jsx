import { Coffee } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Seo from '../../components/Seo'
import { isSupabaseConfigured } from '../../lib/supabaseClient'
import { signInAdmin } from '../../services/authService'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInAdmin(email, password)
      navigate('/admin')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-coffee-50 px-4">
      <Seo title="Login Admin | KOPI KITA" />
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <div className="grid size-12 place-items-center rounded-md bg-coffee-900 text-white">
          <Coffee />
        </div>
        <h1 className="mt-6 text-3xl font-black text-coffee-900">Admin KOPI KITA</h1>
        <p className="mt-2 text-sm text-coffee-900/60">Masuk dengan akun Supabase Auth email dan password.</p>
        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-md bg-crema/20 p-3 text-sm text-coffee-900">
            Supabase belum dikonfigurasi. Isi file .env dari .env.example untuk mengaktifkan login.
          </p>
        )}
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="mt-6 space-y-4">
          <input className="field" type="email" placeholder="Email admin" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input className="field" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button className="btn-primary w-full" disabled={loading || !isSupabaseConfigured}>
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </div>
      </form>
    </main>
  )
}
