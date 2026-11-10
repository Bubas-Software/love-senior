import { runtimeValue } from "./runtime-config";

export function getWhatsappHref(message = "Olá, gostaria de conhecer os serviços da Love Sênior.") {
  const phone = (runtimeValue("LOVE_SENIOR_WHATSAPP_PHONE") || "").replace(/\D/g, "");
  if (!phone) return undefined;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
