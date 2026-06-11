-- ============================================
-- TABLE: informasi (Admin → Musyrif/Santri)
-- ============================================

CREATE TABLE IF NOT EXISTS informasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  target_role VARCHAR(20) NOT NULL CHECK (target_role IN ('MUSYRIF', 'SANTRI', 'ALL')),
  created_by UUID NOT NULL REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
