import { createClient } from '@supabase/supabase-js'

// Robust initialization to prevent crashes during build or if environment variables are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If credentials are missing, we use a plausible-looking placeholder URL to prevent the 'supabaseUrl is required' error
// This allows the app to boot and show the high-fidelity UI even without a live database.
const finalUrl = (!supabaseUrl || supabaseUrl === 'undefined') ? 'https://project-id-placeholder.supabase.co' : supabaseUrl
const finalKey = (!supabaseAnonKey || supabaseAnonKey === 'undefined') ? 'placeholder-key' : supabaseAnonKey

export const supabase = createClient(finalUrl, finalKey)
