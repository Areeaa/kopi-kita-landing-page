import { requireSupabase, supabase } from '../lib/supabaseClient'

export async function signInAdmin(email, password) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOutAdmin() {
  if (!supabase) return
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  if (!supabase) return null
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export function onAuthStateChange(callback) {
  if (!supabase) return { unsubscribe: () => {} }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return data.subscription
}
