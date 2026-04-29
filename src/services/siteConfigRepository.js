import { requireSupabase } from '../lib/supabaseClient'

export async function getSiteConfig() {
  const { data, error } = await requireSupabase().from('site_config').select('*').eq('id', 1).single()
  if (error) throw error
  return data
}

export async function updateSiteConfig(payload) {
  const { data, error } = await requireSupabase()
    .from('site_config')
    .upsert({ ...payload, id: 1, updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) throw error
  return data
}
