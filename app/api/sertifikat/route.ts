import { NextRequest, NextResponse } from 'next/server';
import { getAllSertifikat, getSertifikatBySantri, syncSertifikatRecords } from '@/lib/services/sertifikat.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const santuario_id = searchParams.get('santuario_id');

    let data;
    if (santuario_id) {
      data = await getSertifikatBySantri(santuario_id);
    } else {
      data = await getAllSertifikat();
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data sertifikat' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Support both single object and { records: [...] } bulk format
    if (body.records && Array.isArray(body.records)) {
      await syncSertifikatRecords(body.records);
    } else {
      await syncSertifikatRecords([body]);
    }
    // Return latest data after sync
    const data = await getAllSertifikat();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan sertifikat' }, { status: 500 });
  }
}
