import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://bbkklpycjajwcwmsmfyr.supabase.co';
const supabaseAnonKey = 'sb_publishable_cjFn_nM9TOlFZB3Sft_Alg_tKjjRzWd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});