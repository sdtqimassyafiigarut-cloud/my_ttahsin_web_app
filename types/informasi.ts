export interface Informasi {
  id: string;
  judul: string;
  isi: string;
  target_role: 'MUSYRIF' | 'SANTRI' | 'ALL';
  created_by: string;
  created_by_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
