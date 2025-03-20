import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Default to placeholder values to prevent runtime errors
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
