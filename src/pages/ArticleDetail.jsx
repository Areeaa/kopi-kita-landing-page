import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Seo from '../components/Seo'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getArticleBySlug } from '../services/articleRepository'
import { getSiteConfig } from '../services/siteConfigRepository'
import { sanitizeHtml, stripHtml } from '../utils/html'

const emptySiteConfig = {
  about_text: '',
  address: '',
  whatsapp_number: '',
  instagram_url: '',
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [config, setConfig] = useState(emptySiteConfig)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase belum dikonfigurasi.')
      setLoading(false)
      return
    }

    async function load() {
      try {
        setLoading(true)
        const [articleData, configData] = await Promise.all([getArticleBySlug(slug), getSiteConfig()])
        setArticle(articleData)
        setConfig(configData)
        setError('')
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug])

  if (loading) {
    return (
      <>
        <Seo title="Memuat Artikel | KOPI KITA" />
        <Navbar />
        <main className="grid min-h-[60vh] place-items-center bg-coffee-50 px-4 text-center text-coffee-900">
          <p>Memuat artikel...</p>
        </main>
        <Footer config={config} />
      </>
    )
  }

  if (error || !article) {
    return (
      <>
        <Seo title="Artikel Tidak Ditemukan | KOPI KITA" />
        <Navbar />
        <main className="grid min-h-[60vh] place-items-center bg-coffee-50 px-4 text-center">
          <div>
            <h1 className="text-3xl font-black text-coffee-900">Artikel tidak ditemukan</h1>
            <p className="mt-3 text-coffee-900/65">{error || 'Konten artikel belum tersedia.'}</p>
            <Link to="/#artikel" className="btn-primary mt-6">
              <ArrowLeft size={18} /> Kembali
            </Link>
          </div>
        </main>
        <Footer config={config} />
      </>
    )
  }

  return (
    <>
      <Seo title={`${article.title} | KOPI KITA`} description={stripHtml(article.content).slice(0, 150)} />
      <Navbar />
      <main className="bg-coffee-50">
        <article className="section-shell max-w-4xl py-12">
          <Link to="/#artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-leaf">
            <ArrowLeft size={18} /> Kembali
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-leaf">{article.category || 'Artikel'}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-coffee-900 sm:text-5xl">{article.title}</h1>
          <img className="mt-8 h-[420px] w-full rounded-lg object-cover" src={article.thumbnail_url} alt={article.title} />
          <div
            className="article-content mt-8 text-coffee-900/75"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
          />
        </article>
      </main>
      <Footer config={config} />
    </>
  )
}
