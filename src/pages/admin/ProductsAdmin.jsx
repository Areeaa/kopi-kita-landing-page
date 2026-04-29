import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import ResourceTable from '../../components/admin/ResourceTable'
import { deleteProduct, getProducts, saveProduct } from '../../services/productRepository'
import { uploadImage } from '../../services/storageService'
import { formatCurrency } from '../../utils/formatters'

const emptyProduct = {
  id: '',
  name: '',
  description: '',
  price: '',
  image_url: '',
  shopee_link: '',
  category: '',
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function loadProducts() {
    setProducts(await getProducts())
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const imageUrl = imageFile ? await uploadImage(imageFile, 'products') : form.image_url
      await saveProduct({ ...form, price: Number(form.price), image_url: imageUrl })
      setForm(emptyProduct)
      setImageFile(null)
      await loadProducts()
      setMessage('Produk berhasil disimpan.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus produk ini?')) return
    await deleteProduct(id)
    await loadProducts()
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="flex items-center gap-2 text-2xl font-black text-coffee-900"><Plus /> Produk</h1>
        {message && <p className="mt-4 rounded-md bg-coffee-50 p-3 text-sm text-coffee-900">{message}</p>}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="field" placeholder="Nama produk" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
          <textarea className="field min-h-28" placeholder="Deskripsi" value={form.description} onChange={(event) => updateField('description', event.target.value)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field" type="number" placeholder="Harga" value={form.price} onChange={(event) => updateField('price', event.target.value)} required />
            <input className="field" placeholder="Kategori" value={form.category} onChange={(event) => updateField('category', event.target.value)} />
          </div>
          <input className="field" placeholder="Link Shopee" value={form.shopee_link} onChange={(event) => updateField('shopee_link', event.target.value)} />
          <input className="field" placeholder="Image URL" value={form.image_url} onChange={(event) => updateField('image_url', event.target.value)} />
          <input className="field" type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Produk'}</button>
          {form.id && (
            <button type="button" className="btn-secondary w-full" onClick={() => setForm(emptyProduct)}>
              Batal Edit
            </button>
          )}
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black text-coffee-900">Daftar Produk</h2>
        <ResourceTable
          rows={products}
          columns={[
            { key: 'name', label: 'Nama' },
            { key: 'category', label: 'Kategori' },
            { key: 'price', label: 'Harga', render: (row) => formatCurrency(row.price) },
          ]}
          onEdit={setForm}
          onDelete={handleDelete}
        />
      </section>
    </div>
  )
}
