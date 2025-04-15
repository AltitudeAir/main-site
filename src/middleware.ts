import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const { pathname, method } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-Api-Key, Content-Type'
    );
    if (method === 'OPTIONS') {
      return new NextResponse(null, { headers: response.headers });
    }

    return response;
  }

  if (pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'], // Matches all API routes
};
