# Baitul Huffaz

Sistem Manajemen Lembaga Tahfizh Al-Qur'an Baitul Huffaz

## Teknologi

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Hosting:** Vercel
- **Storage:** Neon (PostgreSQL Serverless)

## Fitur

### Dashboard Admin
- Manajemen data Santri
- Manajemen Musyrif/Ustadz
- Manajemen Kelas/Halaqah
- Manajemen Jadwal
- Input& Review Nilai Hafalan
- Generate Raport
- Generate Sertifikat

### Dashboard Musyrif
- Input Setoran Hafalan
- Input Penilaian (Tajwid, Makhraj, Kelancaran)
- Input Kehadiran
- Input Evaluasi Sikap
- Update Target Hafalan
- Download Sertifikat

### Dashboard Santri
- Lihat Nilai Hafalan
- Lihat Raport
- Lihat Progress Target
- Akses Zoom Link
- Download Sertifikat

## Instalasi

```bash
# Clone repository
git clone <repo-url>
cd baitul-huffaz

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local dengan credentials Supabase Anda

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Dapatkan URL dan ANON KEY dari Settings > API
3. Jalankan SQL migrations di `database/migrations/`
4. Update `.env.local` dengan credentials Anda

## Setup Database Schema

```sql
-- Jalankan di Supabase SQL Editor

-- Users table (sudah ada)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'SANTRI' CHECK (role IN ('ADMIN', 'MUSYRIF', 'SANTRI')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kelas table
CREATE TABLE public.kelas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(100) NOT NULL,
  musyrif_id UUID REFERENCES public.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Setoran table
CREATE TABLE public.setoran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  santuario_id UUID REFERENCES public.users(id),
  musyrif_id UUID REFERENCES public.users(id),
  surah VARCHAR(100) NOT NULL,
  ayat_start INT,
  ayat_end INT,
  tajwid_score INT,
  makhraj_score INT,
  kelancaran_score INT,
  rata_rata INT,
  status VARCHAR(20) CHECK (status IN ('LANJUT', 'ULANGI')),
  catatan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jadwal table
CREATE TABLE public.jadwal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sesi VARCHAR(100) NOT NULL,
  jam_mulai TIME,
  jam_selesai TIME,
  lokasi VARCHAR(200),
  musyrif_id UUID REFERENCES public.users(id),
  hari VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Absensi table
CREATE TABLE public.absensi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  santuario_id UUID REFERENCES public.users(id),
  tanggal DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('HADIR', 'IZIN', 'SAKIT', 'ALPA')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Evaluasi table
CREATE TABLE public.evaluasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  santuario_id UUID REFERENCES public.users(id),
  musyrif_id UUID REFERENCES public.users(id),
  predikat_adab VARCHAR(50),
  catatan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Target Hafalan table
CREATE TABLE public.target_hafalan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  santuario_id UUID REFERENCES public.users(id),
  juz_target INT,
  progres INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sertifikat table
CREATE TABLE public.sertifikat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  santuario_id UUID REFERENCES public.users(id),
  juz INT NOT NULL,
  tgl_cetak DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Deploy ke Vercel

1. Push kode ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Import repository GitHub
4. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## Akun Demo

Untuk testing tanpa database:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Musyrif | musyrif | musyrif123 |
| Santri | santri | santai123 |

## License

MIT License
