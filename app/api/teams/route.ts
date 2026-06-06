import { NextResponse } from "next/server";
import { getTeams } from "@/lib/services/sports-data";

export async function GET() {
  return NextResponse.json(await getTeams());
}
