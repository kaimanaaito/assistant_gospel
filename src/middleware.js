import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", `Bearer ${process.env.OPENAI_API_KEY}`);
  requestHeaders.set("Content-Type", "application/json");

  request.nextUrl.href = `https://api.openai.com/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}
