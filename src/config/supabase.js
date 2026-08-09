import { createClient } from '@supabase/supabase-js';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './api';
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-publishable-key';
export const supabase = createClient(SUPABASE_URL || fallbackUrl, SUPABASE_PUBLISHABLE_KEY || fallbackKey);
