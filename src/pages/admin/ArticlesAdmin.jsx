import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import ResourceTable from '../../components/admin/ResourceTable'
import { deleteArticle, getArticles, saveArticle } from '../../services/articleRepository'
import { uploadImage } from '../../services/storageService'
import { slugify } from '../../utils/formatters'

const emptyArticle = {
  id: '',
  title: '',
  slug: '',
  content: '',
  thumbnail_url: '',
  category: 'Brewing Guide',
}

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState(emptyArticle)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function loadArticles() {
    setArticles(await getArticles())
  }

  useEffect(() => {
    loadArticles()
  }, [])

  function updateField(key, value) {
    setForm((current) => {
      if (key === 'title' && !current.id) {
        return { ...current, title: value, slug: slugify(value) }
      }

      return { ...current, [key]: value }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const thumbnailUrl = thumbnailFile ? await uploadImage(thumbnailFile, 'articles') : form.thumbnail_url
      await saveArticle({ ...form, thumbnail_url: thumbnailUrl })
      setForm(emptyArticle)
      setThumbnailFile(null)
      await loadArticles()
      setMessage('Artikel berhasil disimpan.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus artikel ini?')) return
    await deleteArticle(id)
    await loadArticles()
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[460px_1fr]">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="flex items-center gap-2 text-2xl font-black text-coffee-900"><Plus /> Artikel</h1>
        {message && <p className="mt-4 rounded-md bg-coffee-50 p-3 text-sm text-coffee-900">{message}</p>}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="field" placeholder="Judul" value={form.title} onChange={(event) => updateField('title', event.target.value)} required />
          <input className="field" placeholder="Slug" value={form.slug} onChange={(event) => updateField('slug', event.target.value)} required />
          <select className="field" value={form.category} onChange={(event) => updateField('category', event.target.value)}>
            <option>Brewing Guide</option>
            <option>Cerita Kopi</option>
            <option>Promo</option>
          </select>
          <textarea className="field min-h-64" placeholder="Konten artikel" value={form.content} onChange={(event) => updateField('content', event.target.value)} required />
          <input className="field" placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={(event) => updateField('thumbnail_url', event.target.value)} />
          <input className="field" type="file" accept="image/*" onChange={(event) => setThumbnailFile(event.target.files?.[0] || null)} />
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Artikel'}</button>
          {form.id && (
            <button type="button" className="btn-secondary w-full" onClick={() => setForm(emptyArticle)}>
              Batal Edit
            </button>
          )}
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black text-coffee-900">Daftar Artikel</h2>
        <ResourceTable
          rows={articles}
          columns={[
            { key: 'title', label: 'Judul' },
            { key: 'category', label: 'Kategori' },
            { key: 'slug', label: 'Slug' },
          ]}
          onEdit={setForm}
          onDelete={handleDelete}
        />
      </section>
    </div>
  )
}
