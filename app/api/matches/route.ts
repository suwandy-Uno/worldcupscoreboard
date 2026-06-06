import { NextResponse } from "next/server";
import { getMatches } from "@/lib/services/sports-data";

export async function GET() {
  return NextResponse.json(await getMatches());
}
