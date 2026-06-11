// Script untuk menjalankan migrasi SQL ke NeonDB
// Usage: node database/run-migrations.mjs
// Membutuhkan DATABASE_URL di environment variable

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ DATABASE_URL tidak ditemukan. Set environment variable DATABASE_URL.');
    console.error('   Contoh: $env:DATABASE_URL="postgresql://..."');
    process.exit(1);
  }

  const pool = new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  // Cek tabel migrations tracker
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Migration tracker ready');
  } catch (e) {
    console.error('Gagal membuat migration tracker:', e);
    await pool.end();
    process.exit(1);
  }

  // Baca file migrasi yang sudah diapply
  const applied = new Set<string>();
  try {
    const result = await pool.query('SELECT filename FROM _migrations ORDER BY id');
    result.rows.forEach(r => applied.add(r.filename));
  } catch (e) {
    console.error('Gagal membaca applied migrations:', e);
  }

  // Baca semua file SQL di folder migrations, urutkan
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql') && f !== '001_schema.sql') // skip 001 karena sudah dianggap applied
    .sort();

  let pending = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`✓ ${file} — already applied`);
      continue;
    }

    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    console.log(`▶ Applying ${file}...`);
    try {
      await pool.query(sql);
      await pool.query('INSERT INTO _migrations (filename) VALUES ($1)', [file]);
      console.log(`✓ ${file} — applied successfully`);
      pending++;
    } catch (e: any) {
      console.error(`✗ ${file} — FAILED:`, e.message);
    }
  }

  if (pending === 0) {
    console.log('✅ Semua migrasi sudah terapply.');
  } else {
    console.log(`✅ ${pending} migrasi berhasil diapply.`);
  }

  await pool.end();
}

runMigrations().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
