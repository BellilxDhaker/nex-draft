import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function applySupabaseCookies(from: NextResponse, to: NextResponse) {
  for (const cookie of from.cookies.getAll()) {
    to.cookies.set(cookie);
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/onboarding", "/settings"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthCallbackRoute = pathname.startsWith("/auth/callback");

  const response = NextResponse.next();
  const supabase = createSupabaseServerClient(request, response);
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const isOnboarded = Boolean(user?.user_metadata?.isOnboarded);
  const authedRedirect = isOnboarded ? "/dashboard" : "/onboarding";

  if (isAuthCallbackRoute) {
    return response;
  }

  if (!user && isProtectedRoute) {
    const redirectResponse = NextResponse.redirect(
      new URL("/auth/login", request.url),
    );
    applySupabaseCookies(response, redirectResponse);
    return redirectResponse;
  }

  if (user && pathname === "/auth/login") {
    const redirectResponse = NextResponse.redirect(
      new URL(authedRedirect, request.url),
    );
    applySupabaseCookies(response, redirectResponse);
    return redirectResponse;
  }

  if (user && pathname.startsWith("/dashboard") && !isOnboarded) {
    const redirectResponse = NextResponse.redirect(
      new URL("/onboarding", request.url),
    );
    applySupabaseCookies(response, redirectResponse);
    return redirectResponse;
  }

  if (user && pathname.startsWith("/onboarding") && isOnboarded) {
    const redirectResponse = NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
    applySupabaseCookies(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png).*)"],
};
