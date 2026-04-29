import { requireSupabase } from '../lib/supabaseClient'

export async function getTestimonials() {
  const { data, error } = await requireSupabase()
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
