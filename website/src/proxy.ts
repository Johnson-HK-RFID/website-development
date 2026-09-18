import { NextResponse, type NextRequest } from "next/server";

// Carry the URL language into unmatched-page responses. Routing itself uses
// native Next.js rewrites, so no absolute proxy rewrite destination is needed.
export default function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-website-locale", /^\/zh-HK(?:\/|$)/.test(request.nextUrl.pathname) ? "zh-HK" : "en");
  return NextResponse.next({request: {headers}});
}
export const config = {matcher: "/((?!api|_next|opengraph-image|.*\\..*).*)"};
