import { query, queryOne } from '@/lib/db/client';
import { Informasi } from '@/types/informasi';

export async function getAllInformasi(targetRole?: string): Promise<Informasi[]> {
  let sql = `
    SELECT i.*, u.full_name as created_by_name
    FROM informasi i
    JOIN users u ON i.created_by = u.id
  `;
  const params: unknown[] = [];
  const conditions: string[] = [];

  if (targetRole) {
    if (targetRole === 'ALL') {
      conditions.push(`(i.target_role = 'ALL')`);
    } else {
      conditions.push(`(i.target_role = $${params.length + 1} OR i.target_role = 'ALL')`);
      params.push(targetRole);
    }
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  sql += ' ORDER BY i.created_at DESC';

  return query<Informasi>(sql, params);
}

export async function getInformasiById(id: string): Promise<Informasi | null> {
  const sql = `
    SELECT i.*, u.full_name as created_by_name
    FROM informasi i
    JOIN users u ON i.created_by = u.id
    WHERE i.id = $1
  `;
  return queryOne<Informasi>(sql, [id]);
}

export async function createInformasi(data: {
  judul: string;
  isi: string;
  target_role: 'MUSYRIF' | 'SANTRI' | 'ALL';
  created_by: string;
}): Promise<Informasi> {
  const sql = `
    INSERT INTO informasi (judul, isi, target_role, created_by)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  return queryOne<Informasi>(sql, [data.judul, data.isi, data.target_role, data.created_by]) as Promise<Informasi>;
}

export async function updateInformasi(id: string, data: {
  judul?: string;
  isi?: string;
  target_role?: 'MUSYRIF' | 'SANTRI' | 'ALL';
  is_active?: boolean;
}): Promise<Informasi | null> {
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
  const sql = `UPDATE informasi SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;
  return queryOne<Informasi>(sql, values);
}

export async function deleteInformasi(id: string): Promise<boolean> {
  const result = await query<{ id: string }>('DELETE FROM informasi WHERE id = $1 RETURNING id', [id]);
  return result.length > 0;
}
