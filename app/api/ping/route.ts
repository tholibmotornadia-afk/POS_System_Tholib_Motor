import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Jalankan query paling ringan hanya untuk "membangunkan" database Supabase
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'awake', message: 'Supabase is awake!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Failed to wake database' }, { status: 500 });
  }
}
