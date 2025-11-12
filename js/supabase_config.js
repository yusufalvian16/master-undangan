// js/supabase_config.js

// SUPABASE INTEGRATION: Inisialisasi Supabase
// Ganti dengan URL dan Anon Key proyek Supabase Anda
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY =
  "";
if (typeof supabase === "undefined") {
  console.error("Supabase library belum termuat! Pastikan CDN sudah benar.");
} else {
  window.supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}
