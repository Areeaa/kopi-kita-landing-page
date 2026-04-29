import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Seo from '../components/Seo'
import { fallbackArticles, fallbackSiteConfig } from '../data/fallbackData'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getArticleBySlug } from '../services/articleRepository'
import { getSiteConfig } from '../services/siteConfigRepository'

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(fallbackArticles.find((item) => item.slug === slug) || fallbackArticles[0])
  const [config, setConfig] = useState(fallbackSiteConfig)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    async function load() {
      const [articleData, configData] = await Promise.all([getArticleBySlug(slug), getSiteConfig()])
      setArticle(articleData)
      setConfig(configData)
    }

    load()
  }, [slug])

  return (
    <>
      <Seo title={`${article.title} | KOPI KITA`} description={article.content.slice(0, 150)} />
      <Navbar />
      <main className="bg-coffee-50">
        <article className="section-shell max-w-4xl py-12">
          <Link to="/#artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-leaf">
            <ArrowLeft size={18} /> Kembali
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-leaf">{article.category || 'Artikel'}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-coffee-900 sm:text-5xl">{article.title}</h1>
          <img className="mt-8 h-[420px] w-full rounded-lg object-cover" src={article.thumbnail_url} alt={article.title} />
          <div className="prose prose-coffee mt-8 max-w-none whitespace-pre-line text-lg leading-9 text-coffee-900/75">
            {article.content}
          </div>
        </article>
      </main>
      <Footer config={config} />
    </>
  )
}
