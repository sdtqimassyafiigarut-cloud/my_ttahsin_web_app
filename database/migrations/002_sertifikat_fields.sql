-- ============================================
-- ADD RICH FIELDS TO SERTIFIKAT TABLE
-- Sync admin SertifikatRecord with DB persistence
-- ============================================

ALTER TABLE sertifikat
  ADD COLUMN IF NOT EXISTS nomor_sertifikat VARCHAR(100),
  ADD COLUMN IF NOT EXISTS nama_surat VARCHAR(255) DEFAULT '',
  ADD COLUMN IF NOT EXISTS status_kelulusan VARCHAR(50) DEFAULT 'Proses',
  ADD COLUMN IF NOT EXISTS paragraf_teks TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS nama_sekolah VARCHAR(255) DEFAULT '',
  ADD COLUMN IF NOT EXISTS alamat_sekolah TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS akreditasi VARCHAR(10) DEFAULT 'A',
  ADD COLUMN IF NOT EXISTS nilai_tajwid INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS nilai_makhraj INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS nilai_kelancaran INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS nilai_rata INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS kota_penandatangan VARCHAR(100) DEFAULT 'Palembang',
  ADD COLUMN IF NOT EXISTS nama_penanggung_jawab VARCHAR(255) DEFAULT '',
  ADD COLUMN IF NOT EXISTS jabatan VARCHAR(100) DEFAULT 'Kepala Pondok';
