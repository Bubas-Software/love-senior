import { redirect } from "next/navigation";
import { getSession, roleHomePath, type Role, type SessionPayload } from "./auth";

export async function requirePageRole(...roles: Role[]): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!roles.includes(session.role)) redirect(roleHomePath(session.role));
  return session;
}
