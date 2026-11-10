import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { isSafePreview } from "@/lib/preview";
import { runtimeValue } from "@/lib/runtime-config";
import {
  getAuthProvider,
  type Role,
} from "@/lib/auth";
import { proxySupabaseAuth } from "@/lib/supabase/proxy";
import { enforceAdminMutationSecurity } from "@/lib/request-security";
import { canCoordinatorAccessAdminPath } from "@/lib/route-access";
import { roleHomePath } from "@/lib/auth";

const SESSION_COOKIE = "love_senior_session";

const ROLE_PREFIX: Record<string, Role> = {
  "/admin": "admin",
  "/familia": "familia",
  "/cuidador": "cuidador",
};

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const safePreview = isSafePreview();

  if (safePreview) {
    const isLogout = pathname === "/api/auth/logout" &&
      req.method.toUpperCase() === "POST";
    if (pathname.startsWith("/api/") && !isLogout) {
      return NextResponse.json(
        { error: "A API não está disponível nesta prévia protegida." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (MUTATING_METHODS.has(req.method.toUpperCase()) && !isLogout) {
      return NextResponse.json(
        { error: "Esta prévia protegida é somente leitura." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  const mutationSecurityResponse = enforceAdminMutationSecurity(req);
  if (mutationSecurityResponse) return mutationSecurityResponse;

  const matchedPrefix = Object.keys(ROLE_PREFIX).find((p) => pathname.startsWith(p));
  if (!matchedPrefix) return NextResponse.next();

  if (safePreview) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("preview", "segura");
    return NextResponse.redirect(url);
  }

  const requiredRole = ROLE_PREFIX[matchedPrefix];
  if (getAuthProvider() === "supabase") {
    return proxySupabaseAuth(req, requiredRole);
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  try {
    const secretValue = runtimeValue("LOVE_SENIOR_SESSION_SECRET");
    if (!secretValue) throw new Error("LOVE_SENIOR_SESSION_SECRET não configurada.");
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretValue));
    if (
      typeof payload.userId !== "string" ||
      typeof payload.sessionVersion !== "number" ||
      !(payload.role === "admin" || payload.role === "coordenador_operacional" || payload.role === "familia" || payload.role === "cuidador")
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (
      (payload.role !== requiredRole && !(
        requiredRole === "admin"
        && payload.role === "coordenador_operacional"
        && canCoordinatorAccessAdminPath(pathname)
      ))
    ) {
      const url = req.nextUrl.clone();
      url.pathname = roleHomePath(payload.role);
      url.search = "";
      return NextResponse.redirect(url);
    }
    const { queryOne } = await import("@/lib/db");
    const user = await queryOne<{ role: string; session_version: number }>(
      "SELECT role, session_version FROM users WHERE id = $1 AND deleted_at IS NULL",
      [payload.userId]
    );
    if (!user || user.role !== payload.role || user.session_version !== payload.sessionVersion) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } catch (error) {
    console.error("[proxy] A sessão recebida não pôde ser validada.", {
      error: error instanceof Error ? error.message : "Erro desconhecido",
      pathname,
    });
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/familia/:path*", "/cuidador/:path*", "/api/:path*"],
};
