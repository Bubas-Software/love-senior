import { NextResponse } from "next/server";
import { getSession, Role, SessionPayload } from "./auth";
import { isSafePreview } from "./preview";

export async function requireRole(...roles: Role[]): Promise<{ session: SessionPayload } | { error: NextResponse }> {
  const session = await getSession();
  if (isSafePreview()) {
    return {
      error: NextResponse.json(
        { error: "A área restrita não está disponível nesta prévia protegida." },
        { status: 403 }
      ),
    };
  }
  if (!session) {
    return { error: NextResponse.json({ error: "Não autenticado." }, { status: 401 }) };
  }
  if (!roles.includes(session.role)) {
    return { error: NextResponse.json({ error: "Sem permissão." }, { status: 403 }) };
  }
  return { session };
}
