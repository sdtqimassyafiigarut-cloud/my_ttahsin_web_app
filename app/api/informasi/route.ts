import { NextRequest, NextResponse } from 'next/server';
import { getAllInformasi, createInformasi } from '@/lib/services/informasi.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetRole = searchParams.get('target_role');

    const data = await getAllInformasi(targetRole || undefined);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data informasi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const informasi = await createInformasi({
      judul: body.judul,
      isi: body.isi,
      target_role: body.target_role,
      created_by: body.created_by,
    });
    return NextResponse.json({ data: informasi });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan informasi' }, { status: 500 });
  }
}
