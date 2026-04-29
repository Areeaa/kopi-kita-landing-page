import { requireSupabase } from '../lib/supabaseClient'

const table = 'articles'

export async function getArticles(limit) {
  let query = requireSupabase().from(table).select('*').order('created_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getArticleBySlug(slug) {
  const { data, error } = await requireSupabase().from(table).select('*').eq('slug', slug).single()
  if (error) throw error
  return data
}

export async function saveArticle(payload) {
  const client = requireSupabase()

  if (payload.id) {
    const { data, error } = await client.from(table).update(payload).eq('id', payload.id).select().single()
    if (error) throw error
    return data
  }

  const { id, ...insertPayload } = payload
  const { data, error } = await client.from(table).insert(insertPayload).select().single()
  if (error) throw error
  return data
}

export async function deleteArticle(id) {
  const { error } = await requireSupabase().from(table).delete().eq('id', id)
  if (error) throw error
}
