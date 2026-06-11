import { query, queryOne } from '@/lib/db/client';
import { Sertifikat } from '@/types/sertifikat';

export async function getAllSertifikat(): Promise<Sertifikat[]> {
  const sql = `
    SELECT s.*, u.full_name as santri_name, u.nis, k.nama as kelas_nama, u.kelas_id
    FROM sertifikat s
    JOIN users u ON s.santuario_id = u.id
    LEFT JOIN kelas k ON u.kelas_id = k.id
    ORDER BY s.created_at DESC
  `;
  return query<Sertifikat>(sql);
}

export async function getSertifikatBySantri(santuarioId: string): Promise<Sertifikat[]> {
  const sql = `
    SELECT s.*, u.full_name as santri_name, u.nis, k.nama as kelas_nama, u.kelas_id
    FROM sertifikat s
    JOIN users u ON s.santuario_id = u.id
    LEFT JOIN kelas k ON u.kelas_id = k.id
    WHERE s.santuario_id = $1
    ORDER BY s.created_at DESC
  `;
  return query<Sertifikat>(sql, [santuarioId]);
}

const ALLOWED_COLS = new Set([
  'santuario_id','juz','tgl_cetak','no_sertifikat','file_url','status',
  'nomor_sertifikat','nama_surat','status_kelulusan','paragraf_teks',
  'nama_sekolah','alamat_sekolah','akreditasi',
  'nilai_tajwid','nilai_makhraj','nilai_kelancaran','nilai_rata',
  'kota_penandatangan','nama_penanggung_jawab','jabatan'
]);

export async function createSertifikat(data: Record<string, unknown>): Promise<Sertifikat> {
  const cols: string[] = [];
  const vals: unknown[] = [];
  let idx = 1;
  for (const [key, val] of Object.entries(data)) {
    if (ALLOWED_COLS.has(key)) {
      cols.push(key);
      vals.push(val ?? null);
      idx++;
    }
  }
  if (cols.length === 0) throw new Error('No valid columns to insert');
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
  const sql = `INSERT INTO sertifikat (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`;
  return queryOne<Sertifikat>(sql, vals) as Promise<Sertifikat>;
}

export async function updateSertifikat(id: string, data: Partial<Sertifikat>): Promise<Sertifikat | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const sql = `UPDATE sertifikat SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;
  return queryOne<Sertifikat>(sql, values);
}

export async function deleteSertifikat(id: string): Promise<boolean> {
  const result = await query<{ id: string }>('DELETE FROM sertifikat WHERE id = $1 RETURNING id', [id]);
  return result.length > 0;
}

// Map camelCase frontend fields to snake_case DB columns + handle status
function mapRecord(r: Record<string, unknown>): Record<string, unknown> {
  const mapped: Record<string, unknown> = {};
  // Direct mappings
  if (r.santriId) mapped.santuario_id = r.santriId;
  if (r.santuario_id) mapped.santuario_id = r.santuario_id;
  if (r.nomorSertifikat) mapped.nomor_sertifikat = r.nomorSertifikat;
  if (r.no_sertifikat) mapped.nomor_sertifikat = String(r.no_sertifikat);
  if (r.namaSurat) mapped.nama_surat = r.namaSurat;
  if (r.juzKe) mapped.juz = Number(r.juzKe);
  if (r.juz !== undefined && r.juz !== null) mapped.juz = Number(r.juz);
  if (r.statusKelulusan) mapped.status_kelulusan = r.statusKelulusan;
  if (r.paragrafTeks) mapped.paragraf_teks = r.paragrafTeks;
  if (r.namaSekolah) mapped.nama_sekolah = r.namaSekolah;
  if (r.alamatSekolah) mapped.alamat_sekolah = r.alamatSekolah;
  if (r.akreditasi) mapped.akreditasi = r.akreditasi;
  if (r.nilaiTajwid !== undefined) mapped.nilai_tajwid = r.nilaiTajwid;
  if (r.nilaiMakhraj !== undefined) mapped.nilai_makhraj = r.nilaiMakhraj;
  if (r.nilaiKelancaran !== undefined) mapped.nilai_kelancaran = r.nilaiKelancaran;
  if (r.nilaiRata !== undefined) mapped.nilai_rata = r.nilaiRata;
  if (r.kotaPenandatangan) mapped.kota_penandatangan = r.kotaPenandatangan;
  if (r.tanggalTerbit) mapped.tgl_cetak = r.tanggalTerbit;
  if (r.tgl_cetak) mapped.tgl_cetak = r.tgl_cetak;
  if (r.namaPenanggungJawab) mapped.nama_penanggung_jawab = r.namaPenanggungJawab;
  if (r.jabatan) mapped.jabatan = r.jabatan;
  if (r.file_url) mapped.file_url = r.file_url;
  // Status: isPublished boolean → 'TERBIT'/'DALAM_PROSES'
  if (r.isPublished === true) mapped.status = 'TERBIT';
  else if (r.isPublished === false) mapped.status = 'DALAM_PROSES';
  else if (r.status) mapped.status = r.status;
  return mapped;
}

export async function syncSertifikatRecords(records: Record<string, unknown>[]): Promise<void> {
  for (const rec of records) {
    const id = rec.id as string | undefined;
    if (id && String(id).startsWith('srt-')) {
      // New record (temp id) → INSERT
      const mapped = mapRecord(rec);
      if (!mapped.santuario_id || !mapped.juz) continue;
      await createSertifikat(mapped);
    } else if (id) {
      // Existing record → UPDATE
      const mapped = mapRecord(rec);
      await updateSertifikat(id, mapped);
    }
  }
}

export async function getNextNoSertifikat(): Promise<string> {
  const sql = "SELECT COALESCE(MAX(CAST(SUBSTRING(no_sertifikat FROM 3) AS INTEGER)), 0) + 1 as next_no FROM sertifikat WHERE no_sertifikat ~ '^SH\\d+$'";
  const result = await queryOne<{ next_no: string }>(sql);
  const nextNo = Number(result?.next_no ?? 1);
  return `SH${String(nextNo).padStart(5, '0')}`;
}
