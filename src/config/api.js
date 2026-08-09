export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';
export const REST_URL = SUPABASE_URL ? `${SUPABASE_URL}/rest/v1` : '';
