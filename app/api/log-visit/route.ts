import { NextRequest, NextResponse } from "next/server";

/**
 * Logs the requesting visitor's IP address to the server console.
 * On Render (and most hosts behind a proxy/load balancer), the actual
 * client IP is not the raw socket address — it's forwarded in the
 * `x-forwarded-for` header, which can contain a comma-separated chain
 * of IPs (client, then any intermediate proxies). The first entry is
 * the original client.
 */
export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : request.headers.get("x-real-ip") ?? "unknown";

  console.log(`[visit] ${new Date().toISOString()} — IP: ${ip}`);

  return NextResponse.json({ ok: true });
}
