import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getArticles } from '../services/articleRepository'
import { getProducts } from '../services/productRepository'
import { getSiteConfig } from '../services/siteConfigRepository'
import { getTestimonials } from '../services/testimonialRepository'
import { fallbackArticles, fallbackProducts, fallbackSiteConfig, fallbackTestimonials } from '../data/fallbackData'

export default function useLandingData() {
  const [state, setState] = useState({
    products: fallbackProducts,
    articles: fallbackArticles,
    config: fallbackSiteConfig,
    testimonials: fallbackTestimonials,
    loading: isSupabaseConfigured,
    error: '',
  })

  useEffect(() => {
    if (!isSupabaseConfigured) return

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
