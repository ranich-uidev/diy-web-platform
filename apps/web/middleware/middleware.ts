import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // 1. Get the subdomain (e.g., 'vantage-estates' from 'vantage-estates.localhost:3000')
  const currentHost = process.env.NODE_ENV === 'production' 
    ? hostname.replace(`.yourdomain.com`, '') 
    : hostname.replace(`.localhost:3000`, '');

  // 2. Prevent infinite loops and ignore main domain/system files
  if (
    !currentHost || 
    currentHost === 'www' || 
    currentHost === 'localhost:3000' ||
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // 3. Rewrite the request to the dynamic tenant route
  // This turns 'vantage-estates.localhost:3000/' into '/vantage-estates/' internally
  return NextResponse.rewrite(new URL(`/${currentHost}${url.pathname}`, req.url));
}