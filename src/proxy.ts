import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy for route protection (Next.js 16)
// Note: Firebase Auth state is client-side, so we use a lightweight
// cookie-based approach here. The actual auth check happens in components.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need any protection
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/templates",
    "/pricing",
    "/api/payment/notification", // Midtrans webhook
    "/api/rsvp",
    "/api/wishes",
  ];

  // Check if current path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Check if it's an invitation page (dynamic slug)
  // Invitation pages are public, they are like /andi-dan-sari
  const isInvitationPage =
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/register") &&
    !pathname.startsWith("/templates") &&
    !pathname.startsWith("/pricing") &&
    pathname !== "/";

  // Allow public paths and invitation pages
  if (isPublicPath || isInvitationPage) {
    return NextResponse.next();
  }

  // For protected routes (dashboard, admin), we let the client-side
  // auth check handle the redirect. The middleware just passes through.
  // Client components will use useAuth() to check auth state and redirect.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|wav)$).*)",
  ],
};
