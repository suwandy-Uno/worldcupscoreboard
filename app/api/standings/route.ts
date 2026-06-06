export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { getStandings } from "@/lib/services/sports-data";

export async function GET() {
  return NextResponse.json(await getStandings());
}
