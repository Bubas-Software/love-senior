"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GOOGLE_ADS_ID = (process.env.NEXT_PUBLIC_LOVE_SENIOR_GOOGLE_ADS_ID || "").trim();
const GOOGLE_ADS_EXTERNAL_SCRIPT_ID = "love-senior-google-ads-external";
const GOOGLE_ADS_INLINE_SCRIPT_ID = "love-senior-google-ads-inline";
const GOOGLE_ADS_SCRIPT_MARKER = "data-love-senior-google-ads";

type GoogleTagCommand = unknown[] | IArguments;

declare global {
  interface Window {
    dataLayer?: GoogleTagCommand[];
    gtag?: (...args: unknown[]) => void;
    __loveSeniorGoogleAdsInitialized?: boolean;
    __loveSeniorGoogleAdsBlocked?: boolean;
  }
}

const PRIVATE_ROUTE_PREFIXES = [
  "/admin",
  "/cuidador",
  "/familia",
  "/login",
  "/esqueci-senha",
  "/redefinir-senha",
] as const;

function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function initializeGoogleAds() {
  if (window.__loveSeniorGoogleAdsBlocked || window.__loveSeniorGoogleAdsInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
  window.__loveSeniorGoogleAdsInitialized = true;
}

function cleanupGoogleAds() {
  document.querySelectorAll(`script[${GOOGLE_ADS_SCRIPT_MARKER}]`).forEach((script) => script.remove());
  window.gtag = undefined;
  window.dataLayer = undefined;
  window.__loveSeniorGoogleAdsInitialized = false;
  window.__loveSeniorGoogleAdsBlocked = true;
}

export function GoogleAdsTag() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GOOGLE_ADS_ID || !pathname || isPrivateRoute(pathname)) {
      cleanupGoogleAds();
      return;
    }

    window.__loveSeniorGoogleAdsBlocked = false;
    initializeGoogleAds();
  }, [pathname]);

  if (!GOOGLE_ADS_ID || !pathname || isPrivateRoute(pathname)) return null;

  return (
    <>
      <Script
        id={GOOGLE_ADS_EXTERNAL_SCRIPT_ID}
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
        data-love-senior-google-ads="external"
      />
      <Script
        id={GOOGLE_ADS_INLINE_SCRIPT_ID}
        strategy="afterInteractive"
        data-love-senior-google-ads="inline"
      >{`
        if (!window.__loveSeniorGoogleAdsInitialized && !window.__loveSeniorGoogleAdsBlocked) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
          window.__loveSeniorGoogleAdsInitialized = true;
        }
      `}</Script>
    </>
  );
}
