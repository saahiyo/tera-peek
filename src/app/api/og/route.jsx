import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

let cachedBuffer; // cache in-memory

export async function GET() {
  if (!cachedBuffer) {
    const filePath = path.join(process.cwd(), 'public', 'og.png');
    cachedBuffer = await fs.readFile(filePath);
  }

  return new NextResponse(cachedBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 year CDN cache
    },
  });
}
