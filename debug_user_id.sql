-- Debug script untuk cek user_id di database
-- Run ini di Supabase SQL Editor untuk troubleshooting

-- 1. Cek apakah kolom user_id sudah ada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'template_utama' 
AND column_name = 'user_id';

-- 2. Cek semua pesan dan user_id mereka
SELECT id, guest_name, user_id, created_at 
FROM template_utama 
ORDER BY created_at DESC 
LIMIT 10;

-- 3. Hitung berapa pesan yang punya user_id vs yang tidak
SELECT 
  COUNT(*) as total_messages,
  COUNT(user_id) as messages_with_user_id,
  COUNT(*) - COUNT(user_id) as messages_without_user_id
FROM template_utama;
