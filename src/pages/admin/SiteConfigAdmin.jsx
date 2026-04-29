import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSiteConfig, updateSiteConfig } from '../../services/siteConfigRepository'

const emptyConfig = {
  about_text: '',
  address: '',
  whatsapp_number: '',
  instagram_url: '',
}

export default function SiteConfigAdmin() {
  const [form, setForm] = useState(emptyConfig)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getSiteConfig().then((config) => setForm({ ...emptyConfig, ...config }))
  }, [])

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const updated = await updateSiteConfig(form)
      setForm({ ...emptyConfig, ...updated })
      setMessage('Profil toko berhasil diperbarui.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-3xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="flex items-center gap-2 text-2xl font-black text-coffee-900"><Save /> Profil Toko</h1>
      <p className="mt-2 text-sm text-coffee-900/65">Data ini dipakai di profil, footer, dan tombol WhatsApp landing page.</p>
      {message && <p className="mt-4 rounded-md bg-coffee-50 p-3 text-sm text-coffee-900">{message}</p>}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <textarea className="field min-h-40" placeholder="Tentang KOPI KITA" value={form.about_text || ''} onChange={(event) => updateField('about_text', event.target.value)} />
        <input className="field" placeholder="Alamat" value={form.address || ''} onChange={(event) => updateField('address', event.target.value)} />
        <input className="field" placeholder="Nomor WhatsApp, contoh 62812..." value={form.whatsapp_number || ''} onChange={(event) => updateField('whatsapp_number', event.target.value)} />
        <input className="field" placeholder="URL Instagram" value={form.instagram_url || ''} onChange={(event) => updateField('instagram_url', event.target.value)} />
        <button className="btn-primary" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Profil'}</button>
      </form>
    </section>
  )
}
