-- ============================================================
-- SUPABASE TABLE CREATION SCRIPT
-- Wedding Invitation Guest Messages Table
-- ============================================================
-- 
-- INSTRUKSI PENGGUNAAN:
-- 1. Ganti 'template_utama' dengan nama tabel yang Anda inginkan
--    Contoh: 'template_utama', 'wedding_messages', 'guest_rsvp', dll
-- 2. Copy seluruh script ini
-- 3. Buka Supabase Dashboard → SQL Editor
-- 4. Paste dan Run script ini
-- 5. Update wedding-config.js dengan nama tabel yang sama
-- ============================================================

-- GANTI 'template_utama' dengan nama tabel Anda
-- Contoh: template_utama, wedding_ardi_ani, guest_messages_2026, dll

CREATE TABLE IF NOT EXISTS template_utama (
  -- Primary Key
  id BIGSERIAL PRIMARY KEY,
  
  -- Guest Information
  guest_name VARCHAR(255) NOT NULL,
  
  -- Message & RSVP
  message TEXT,
  attendance VARCHAR(50) DEFAULT 'hadir',
  
  -- User Tracking (untuk edit/delete permission)
  user_id VARCHAR(255),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES untuk Performance
-- ============================================================

-- Index untuk sorting by created_at (untuk menampilkan pesan terbaru)
CREATE INDEX IF NOT EXISTS idx_template_utama_created_at 
ON template_utama(created_at DESC);

-- Index untuk searching by guest_name
CREATE INDEX IF NOT EXISTS idx_template_utama_guest_name 
ON template_utama(guest_name);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- ============================================================

-- Enable RLS
ALTER TABLE template_utama ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (makes script idempotent)
DROP POLICY IF EXISTS "Anyone can insert messages" ON template_utama;
DROP POLICY IF EXISTS "Anyone can view messages" ON template_utama;
DROP POLICY IF EXISTS "Users can update own messages" ON template_utama;
DROP POLICY IF EXISTS "Users can delete own messages" ON template_utama;
DROP POLICY IF EXISTS "Allow update with user_id match" ON template_utama;
DROP POLICY IF EXISTS "Allow delete with user_id match" ON template_utama;

-- Policy: Anyone can INSERT (submit messages)
CREATE POLICY "Anyone can insert messages" 
ON template_utama 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Policy: Anyone can SELECT all messages
CREATE POLICY "Anyone can view messages" 
ON template_utama 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policy: Allow UPDATE for all users (application handles user_id matching)
-- Note: Security relies on application-level checks in script_form.js
CREATE POLICY "Allow update with user_id match" 
ON template_utama 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- Policy: Allow DELETE for all users (application handles user_id matching)
-- Note: Security relies on application-level checks in script_form.js
CREATE POLICY "Allow delete with user_id match" 
ON template_utama 
FOR DELETE 
TO anon, authenticated 
USING (true);

-- ============================================================
-- TRIGGER untuk auto-update updated_at
-- ============================================================

-- Function untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk auto-update
CREATE TRIGGER update_template_utama_updated_at 
BEFORE UPDATE ON template_utama 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SAMPLE DATA (Optional - untuk testing)
-- ============================================================

-- Uncomment baris di bawah jika ingin insert sample data
/*
INSERT INTO template_utama (guest_name, message, attendance) VALUES
('Budi Santoso', 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah mawaddah warahmah. Barakallah!', 'hadir'),
('Siti Nurhaliza', 'MasyaAllah, bahagia sekali melihat kalian berdua. Semoga langgeng sampai kakek nenek ya!', 'hadir'),
('Ahmad Hidayat', 'Congratulations! Semoga pernikahan kalian diberkahi Allah SWT dan penuh kebahagiaan.', 'hadir'),
('Dewi Lestari', 'Alhamdulillah akhirnya menikah juga! Selamat ya, semoga cepet punya momongan hehe', 'hadir'),
('Rudi Hartono', 'Selamat menikah bro! Semoga jadi suami yang baik dan bertanggung jawab. Aamiin!', 'tidak_hadir'),
('Fitri Handayani', 'Barakallahu laka wa baraka alaika wa jamaa bainakuma fi khair. Selamat menempuh hidup baru!', 'hadir'),
('Eko Prasetyo', 'Wah akhirnya nikah juga! Selamat ya, semoga samawa dan selalu bahagia. Maaf ga bisa hadir.', 'tidak_hadir'),
('Rina Wijaya', 'Selamat untuk pernikahan kalian! Semoga menjadi pasangan yang saling melengkapi dan penuh cinta.', 'hadir'),
('Hendra Gunawan', 'Alhamdulillah, selamat menempuh hidup baru. Semoga Allah memberikan keberkahan dalam rumah tangga kalian.', 'hadir'),
('Maya Sari', 'Selamat ya! Semoga pernikahan ini menjadi awal kebahagiaan yang abadi. Love you both!', 'hadir');
*/

-- ============================================================
-- VERIFICATION QUERY
-- ============================================================

-- Run query ini untuk memverifikasi tabel sudah dibuat
-- SELECT * FROM template_utama LIMIT 10;

-- ============================================================
-- CATATAN PENTING:
-- ============================================================
-- 1. Jangan lupa ganti 'template_utama' di SEMUA tempat
-- 2. Setelah membuat tabel, update wedding-config.js:
--    supabase: {
--      tableName: "template_utama"  // Ganti dengan nama tabel Anda
--    }
-- 3. Untuk production, pertimbangkan menambah validasi lebih ketat
-- 4. Monitor usage di Supabase Dashboard → Database → Tables
-- ============================================================
