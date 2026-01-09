// js/supabase_config.js

// SUPABASE INTEGRATION: Initialize Supabase client
// Credentials are read from wedding-config.js

// Wait for weddingConfig to be loaded
if (typeof weddingConfig !== 'undefined' && weddingConfig.supabase?.enabled) {
  const SUPABASE_URL = weddingConfig.supabase.url;
  const SUPABASE_ANON_KEY = weddingConfig.supabase.anonKey;
  
  // Only initialize if credentials are provided
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    if (typeof supabase === 'undefined') {
      console.error("Supabase library not loaded! Make sure CDN is included.");
    } else {
      window.supabaseClient = supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      );
      // console.log('✓ Supabase client initialized successfully');
    }
  } else {
    console.warn('Supabase is enabled but credentials are missing in wedding-config.js');
  }
} else {
  // console.log('Supabase is disabled in wedding-config.js');
}
