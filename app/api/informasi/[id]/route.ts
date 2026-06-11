import { NextRequest, NextResponse } from 'next/server';
import { updateInformasi, deleteInformasi } from '@/lib/services/informasi.service';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const informasi = await updateInformasi(params.id, body);
    if (!informasi) {
      return NextResponse.json({ error: 'Informasi tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ data: informasi });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengupdate informasi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteInformasi(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Informasi tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus informasi' }, { status: 500 });
  }
}
