import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getArticles } from '../services/articleRepository'
import { getProducts } from '../services/productRepository'
import { getSiteConfig } from '../services/siteConfigRepository'
import { getTestimonials } from '../services/testimonialRepository'

const emptySiteConfig = {
  about_text: '',
  address: '',
  whatsapp_number: '',
  instagram_url: '',
}

export default function useLandingData() {
  const [state, setState] = useState({
    products: [],
    articles: [],
    config: emptySiteConfig,
    testimonials: [],
    loading: true,
    error: '',
  })

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState((current) => ({
        ...current,
        loading: false,
        error: 'Supabase belum dikonfigurasi.',
      }))
      return
    }

    async function load() {
      try {
        const [products, articles, config, testimonials] = await Promise.all([
          getProducts(),
          getArticles(6),
          getSiteConfig(),
          getTestimonials(),
        ])
        setState({ products, articles, config, testimonials, loading: false, error: '' })
      } catch (error) {
        setState((current) => ({ ...current, loading: false, error: error.message }))
      }
    }

    load()
  }, [])

  return state
}
