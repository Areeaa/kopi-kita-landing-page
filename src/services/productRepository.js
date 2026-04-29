import { requireSupabase } from '../lib/supabaseClient'

const table = 'products'

export async function getProducts() {
  const { data, error } = await requireSupabase().from(table).select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function saveProduct(payload) {
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

export async function deleteProduct(id) {
  const { error } = await requireSupabase().from(table).delete().eq('id', id)
  if (error) throw error
}
