import { requireSupabase } from '../lib/supabaseClient'

const bucket = 'kopi-kita'

export async function uploadImage(file, folder = 'uploads') {
  if (!file) return ''

  const extension = file.name.split('.').pop()
  const path = `${folder}/${crypto.randomUUID()}.${extension}`
  const client = requireSupabase()
  const { error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw error

  const { data } = client.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
