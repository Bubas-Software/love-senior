import { beforeEach, describe, expect, it, vi } from "vitest";

const runtimeValue = vi.hoisted(() => vi.fn());

vi.mock("../src/lib/runtime-config", () => ({ runtimeValue }));

import { getSupabasePasswordResetRedirectUrl } from "../src/lib/supabase/auth";

describe("redirect de recuperação de senha Supabase", () => {
  beforeEach(() => {
    runtimeValue.mockReset();
  });

  it("usa a origem HTTP da própria requisição em localhost", () => {
    runtimeValue.mockReturnValue("https://localhost:5173");

    const redirect = new URL(
      getSupabasePasswordResetRedirectUrl("http://localhost:5173/api/auth/forgot-password"),
    );

    expect(redirect.origin).toBe("http://localhost:5173");
    expect(redirect.pathname).toBe("/auth/callback");
    expect(redirect.search).toBe("");
  });

  it("preserva a origem HTTPS configurada em um host de produção", () => {
    runtimeValue.mockReturnValue("https://app.love-senior.test");

    const redirect = new URL(
      getSupabasePasswordResetRedirectUrl("https://app.love-senior.test/api/auth/forgot-password"),
    );

    expect(redirect.origin).toBe("https://app.love-senior.test");
    expect(redirect.pathname).toBe("/auth/callback");
    expect(redirect.search).toBe("");
  });

  it("mantém a origem configurada mesmo quando o proxy informa HTTP no host remoto", () => {
    runtimeValue.mockReturnValue("https://app.love-senior.test");

    const redirect = new URL(
      getSupabasePasswordResetRedirectUrl("http://app.love-senior.test/api/auth/forgot-password"),
    );

    expect(redirect.origin).toBe("https://app.love-senior.test");
  });

  it.each([
    "http://app.love-senior.test",
    "javascript:alert(1)",
    "https://app.love-senior.test/outro-caminho",
  ])("rejeita uma LOVE_SENIOR_APP_URL insegura (%s)", (configuredUrl) => {
    runtimeValue.mockReturnValue(configuredUrl);

    expect(() =>
      getSupabasePasswordResetRedirectUrl("https://app.love-senior.test/api/auth/forgot-password"),
    ).toThrow();
  });
});
