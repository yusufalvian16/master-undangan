-- RLS Policies untuk Edit & Delete dengan user_id
-- Run ini di Supabase SQL Editor setelah menambahkan kolom user_id

-- 1. Enable RLS jika belum (biasanya sudah enabled)
ALTER TABLE template_utama ENABLE ROW LEVEL SECURITY;

-- 2. Policy untuk SELECT (read) - semua orang bisa baca
DROP POLICY IF EXISTS "Allow public read access" ON template_utama;
CREATE POLICY "Allow public read access" 
ON template_utama 
FOR SELECT 
USING (true);

-- 3. Policy untuk INSERT - semua orang bisa insert
DROP POLICY IF EXISTS "Allow public insert" ON template_utama;
CREATE POLICY "Allow public insert" 
ON template_utama 
FOR INSERT 
WITH CHECK (true);

-- 4. Policy untuk UPDATE - hanya jika user_id cocok (untuk pesan dengan user_id)
-- ATAU jika user_id NULL (pesan lama bisa diupdate siapa saja - optional)
DROP POLICY IF EXISTS "Allow update own messages" ON template_utama;
CREATE POLICY "Allow update own messages" 
ON template_utama 
FOR UPDATE 
USING (user_id IS NOT NULL); -- Hanya pesan dengan user_id yang bisa diupdate
-- Note: Validasi user_id dilakukan di aplikasi, bukan di RLS

-- 5. Policy untuk DELETE - hanya jika user_id cocok (untuk pesan dengan user_id)
DROP POLICY IF EXISTS "Allow delete own messages" ON template_utama;
CREATE POLICY "Allow delete own messages" 
ON template_utama 
FOR DELETE 
USING (user_id IS NOT NULL); -- Hanya pesan dengan user_id yang bisa dihapus
-- Note: Validasi user_id dilakukan di aplikasi, bukan di RLS

-- Verification: Cek semua policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'template_utama';
