import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "pt"];
const defaultLocale = "en";
const PUBLIC_FILE = /\.[^/]+$/;

function detectLocale(request: NextRequest) {

  const accept = request.headers.get("accept-language");

  if (!accept) return defaultLocale;

  if (accept.startsWith("pt")) return "pt";

  return "en";

}

export function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const isInternal =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname);

  if (isInternal) {
    return NextResponse.next();
  }

  const hasLocale =
    locales.some(locale =>
      pathname.startsWith(`/${locale}`)
    );

  if (hasLocale)
    return NextResponse.next();

  const locale = detectLocale(request);

  request.nextUrl.pathname =
    `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);

}

export const config = {
  matcher: ["/:path*"],
};
