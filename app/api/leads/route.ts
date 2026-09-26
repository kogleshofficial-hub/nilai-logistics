import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const whatsapp = String(body.whatsapp ?? "").trim();
    const route = String(body.route ?? "").trim();
    const cargoType = String(body.cargoType ?? "").trim();
    const quantity = Number(body.quantity ?? 0);
    const quantityUnit = body.quantityUnit === "cbm" ? "cbm" : "kg";

    if (!name || !email || !whatsapp || !route || !cargoType) return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    if (name.length > 120 || email.length > 254 || whatsapp.length > 40 || route.length > 120 || cargoType.length > 120) return NextResponse.json({ error: "One or more details are too long." }, { status: 400 });
    if (!emailPattern.test(email)) return NextResponse.json({ error: "Please enter a valid corporate email address." }, { status: 400 });
    if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 1000000) return NextResponse.json({ error: "Please enter a valid shipment quantity." }, { status: 400 });

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error("DATABASE_URL is not configured.");
      return NextResponse.json({ error: "Lead capture is temporarily unavailable." }, { status: 503 });
    }

    const sql = neon(databaseUrl);
    await sql \`
      INSERT INTO leads (name, email, whatsapp, route, cargo_type, quantity, quantity_unit, source, metadata)
      VALUES (${name}, ${email}, ${whatsapp}, ${route}, ${cargoType}, ${quantity}, ${quantityUnit}, ${"instant-quote"}, ${JSON.stringify({ user_agent: request.headers.get("user-agent"), submitted_at: new Date().toISOString() })})
    \`;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead capture failed:", error);
    return NextResponse.json({ error: "We could not save the request. Please try again." }, { status: 500 });
  }
}
