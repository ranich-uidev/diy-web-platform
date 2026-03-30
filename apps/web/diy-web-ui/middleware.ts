import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  const hostNoPort = hostname.split(':')[0] || '';
  const currentHost = hostNoPort.replace('.localhost', '');

  // EXCLUDE: If it's just localhost/www, do not rewrite.
  if (
    currentHost === 'localhost' || 
    currentHost === 'www'
  ) {
    return NextResponse.next();
  }

  // Prevent rewrite loops:
  // if pathname is already "/{tenant}" or "/{tenant}/...", do nothing.
  const pathname = url.pathname || "/";
  if (pathname === `/${currentHost}` || pathname.startsWith(`/${currentHost}/`)) {
    return NextResponse.next();
  }

  // Rewrite subdomain request to tenant route.
  const rewritePath = `/${currentHost}${pathname}`;
  return NextResponse.rewrite(new URL(rewritePath, req.url));
}

export const config = {
  matcher: [
    // Run middleware only for app routes, not static assets.
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};