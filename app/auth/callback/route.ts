import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  const response = NextResponse.redirect(new URL(next, requestUrl.origin));

  if (code) {
    const supabase = createSupabaseServerClient(request, response);
    await supabase.auth.exchangeCodeForSession(code);
  }

  return response;
}
