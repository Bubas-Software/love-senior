import { runtimeValue } from "./runtime-config";

export function isSafePreview(): boolean {
  return (
    runtimeValue("VERCEL_ENV") === "preview" ||
    runtimeValue("LOVE_SENIOR_SAFE_PREVIEW")?.trim().toLowerCase() === "true"
  );
}
