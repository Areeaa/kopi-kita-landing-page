import { ArrowRight, Coffee, Filter, MapPin, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import TestimonialCarousel from '../components/TestimonialCarousel'
import useLandingData from '../hooks/useLandingData'
import { createWhatsAppLink } from '../utils/formatters'
import { stripHtml } from '../utils/html'

const heroImage = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=85'

export default function LandingPage() {
  const { products, articles, config, testimonials, loading, error } = useLandingData()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')

  const categories = useMemo(() => ['Semua', ...new Set(products.map((product) => product.category).filter(Boolean))], [products])
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'Semua' || product.category === category
      const matchesQuery = `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [products, category, query])

  return (
    <>
      <Seo title="KOPI KITA | Kopi Lokal Pilihan" description="Belanja kopi lokal, baca panduan seduh, dan pesan cepat via WhatsApp atau Shopee." />
      <Navbar />
      <main>
        <section id="beranda" className="relative min-h-[86vh] overflow-hidden bg-coffee-900 text-white">
          <img src={heroImage} alt="Secangkir kopi KOPI KITA" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-coffee-900/45" />
          <div className="section-shell relative flex min-h-[86vh] items-center py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-coffee-100">Fresh roast dari Gunung Slamet</p>
              <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">KOPI KITA</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-coffee-50/90">
                Biji kopi pilihan Indonesia untuk seduhan rumah, kedai kecil, dan hadiah yang terasa personal.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#produk" className="btn-primary bg-crema text-coffee-900 hover:bg-white">
                  Lihat Produk <ArrowRight size={18} />
                </a>
                <a href={createWhatsAppLink(config.whatsapp_number)} className="btn-secondary border-white/30 bg-white/95">
                  Konsultasi Seduh
                </a>
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div className="bg-crema/20 py-3 text-center text-sm text-coffee-900">
            Data belum bisa dimuat dari Supabase: {error}
          </div>
        )}

        <section id="profil" className="bg-coffee-50 py-16">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Profil UMKM</p>
              <h2 className="mt-3 text-4xl font-bold text-coffee-900">Dari biji lokal ke cangkir yang akrab.</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-coffee-900/70">
              <p>{config.about_text}</p>
              <p className="flex items-start gap-3 font-semibold text-coffee-900">
                <MapPin className="mt-1 shrink-0 text-leaf" size={20} /> {config.address}
              </p>
            </div>
          </div>
        </section>

        <section id="produk" className="bg-white py-16">
          <div className="section-shell">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Galeri Produk</p>
                <h2 className="mt-3 text-4xl font-bold text-coffee-900">Pilih kopi sesuai gaya seduhmu.</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                <label className="relative">
                  <Search className="absolute top-1/2 -translate-y-1/2 text-coffee-900/45 right-1" size={18} />
                  <input className="field pl-10" placeholder="Cari produk" value={query} onChange={(event) => setQuery(event.target.value)} />
                </label>
                <label className="relative">
                  
                  <select className="field pl-10" value={category} onChange={(event) => setCategory(event.target.value)}>
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} whatsappNumber={config.whatsapp_number} />
              ))}
            </div>
          </div>
        </section>

        <section id="panduan" className="bg-coffee-50 py-16">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Brewing Guide</p>
              <h2 className="mt-3 text-4xl font-bold text-coffee-900">Seduh lebih enak tanpa menebak-nebak.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['V60', '1:15', 'Air 92-94°C, tuang bertahap 3 menit.'],
                ['Aeropress', '1:12', 'Aduk 10 detik, plunge perlahan 30 detik.'],
                ['Espresso', '1:2', '18g masuk, 36g keluar dalam 25-30 detik.'],
              ].map(([method, ratio, note]) => (
                <div key={method} className="rounded-lg bg-white p-5 shadow-sm">
                  <Coffee className="text-leaf" />
                  <h3 className="mt-4 text-xl font-bold">{method}</h3>
                  <p className="mt-1 text-2xl font-black text-crema">{ratio}</p>
                  <p className="mt-3 text-sm leading-6 text-coffee-900/65">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialCarousel items={testimonials} />

        <section id="artikel" className="bg-coffee-50 py-16">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Artikel & Blog</p>
              <h2 className="mt-3 text-4xl font-bold text-coffee-900">Cerita dan edukasi kopi terbaru.</h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.id} to={`/artikel/${article.slug}`} className="overflow-hidden rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <img className="h-48 w-full object-cover" src={article.thumbnail_url} alt={article.title} />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">{article.category || 'Artikel'}</p>
                    <h3 className="mt-3 text-xl font-bold text-coffee-900">{article.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-coffee-900/65">{stripHtml(article.content)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="kontak" className="bg-white py-16">
          <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Kontak</p>
              <h2 className="mt-3 text-4xl font-bold text-coffee-900">Butuh rekomendasi kopi? Kami bantu pilihkan.</h2>
              <p className="mt-4 text-coffee-900/65">{config.address}</p>
            </div>
            <a href={createWhatsAppLink(config.whatsapp_number)} target="_blank" rel="noreferrer" className="btn-primary justify-self-start">
              Chat Fast Response <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer config={config} />
      {loading && <div className="fixed bottom-4 right-4 rounded-md bg-coffee-900 px-4 py-2 text-sm text-white shadow-lg">Memuat data...</div>}
    </>
  )
}
