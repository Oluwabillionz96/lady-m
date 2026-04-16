'use server'

// import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { createServerClient } from '../supabase'

export async function logout() {
  const supabase = await createServerClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error logging out:', error)
    return { success: false, error: error.message }
  }
  
  redirect('/admin/login')
}