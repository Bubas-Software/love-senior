import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";
import { requireRole } from "@/lib/guard";
import { createCoordinatorAccount, listCoordinatorAccounts } from "@/lib/data";
import { isValidEmail } from "@/lib/validation";
import { DUPLICATE_ACCOUNT_EMAIL_MESSAGE, isDuplicateAccountEmailError } from "@/lib/user-errors";

export async function GET() {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;
  try {
    return NextResponse.json({ accounts: await listCoordinatorAccounts() }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return apiError(error, "api/admin/coordenadores", "Não foi possível carregar os Coordenadores.");
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const active = body?.active === undefined ? true : body.active;
  if (!name || !isValidEmail(email) || password.length < 12 || typeof active !== "boolean") {
    return NextResponse.json({ error: "Informe nome, e-mail válido, senha inicial com ao menos 12 caracteres e status válido." }, { status: 400 });
  }

  try {
    const account = await createCoordinatorAccount({ name, email, password, active });
    return NextResponse.json({ ok: true, account }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (isDuplicateAccountEmailError(error)) {
      return NextResponse.json({ error: DUPLICATE_ACCOUNT_EMAIL_MESSAGE, code: "email_already_registered" }, { status: 409 });
    }
    return apiError(error, "api/admin/coordenadores", "Não foi possível criar o Coordenador.");
  }
}
