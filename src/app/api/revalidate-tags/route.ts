import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('X-Api-Key');
  const tag = req.nextUrl.searchParams.get('tag');

  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: 'No tags found' }, { status: 404 });
  }

  try {
    revalidateTag(tag);
    return NextResponse.json({
      revalidated: true,
      tag: tag,
    });
  } catch (err) {
    return NextResponse.json('Error revalidating', {
      status: 500,
    });
  }
}
