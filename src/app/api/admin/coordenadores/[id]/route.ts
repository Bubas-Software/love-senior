import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";
import { requireRole } from "@/lib/guard";
import { updateCoordinatorAccount } from "@/lib/data";
import { isValidEmail } from "@/lib/validation";
import { DUPLICATE_ACCOUNT_EMAIL_MESSAGE, isDuplicateAccountEmailError } from "@/lib/user-errors";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const { id } = await params;
  if (!UUID_PATTERN.test(id)) return NextResponse.json({ error: "Coordenador inválido." }, { status: 400 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Dados da conta inválidos." }, { status: 400 });
  }
  if (Object.prototype.hasOwnProperty.call(body, "role") || Object.prototype.hasOwnProperty.call(body, "id")) {
    return NextResponse.json({ error: "O papel da conta não pode ser alterado por esta operação." }, { status: 400 });
  }
  const allowedFields = new Set(["name", "email", "password", "active"]);
  if (Object.keys(body).some((field) => !allowedFields.has(field))) {
    return NextResponse.json({ error: "A solicitação contém campos não permitidos." }, { status: 400 });
  }

  const patch: { name?: string; email?: string; password?: string; active?: boolean } = {};
  if (body.name !== undefined) {
    if (typeof body.name !== "string" || !body.name.trim()) return NextResponse.json({ error: "Informe um nome válido." }, { status: 400 });
    patch.name = body.name.trim();
  }
  if (body.email !== undefined) {
    if (typeof body.email !== "string" || !isValidEmail(body.email.trim())) return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
    patch.email = body.email.trim().toLowerCase();
  }
  if (body.password !== undefined) {
    if (typeof body.password !== "string" || body.password.length < 12) return NextResponse.json({ error: "A senha deve ter ao menos 12 caracteres." }, { status: 400 });
    patch.password = body.password;
  }
  if (body.active !== undefined) {
    if (typeof body.active !== "boolean") return NextResponse.json({ error: "Informe um status válido." }, { status: 400 });
    patch.active = body.active;
  }
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: "Nenhuma alteração informada." }, { status: 400 });

  try {
    await updateCoordinatorAccount(id, patch);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (isDuplicateAccountEmailError(error)) {
      return NextResponse.json({ error: DUPLICATE_ACCOUNT_EMAIL_MESSAGE, code: "email_already_registered" }, { status: 409 });
    }
    return apiError(error, "api/admin/coordenadores/[id]", "Não foi possível atualizar o Coordenador.");
  }
}
