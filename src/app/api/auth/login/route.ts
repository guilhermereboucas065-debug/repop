import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";
import { setSession } from "@/lib/session";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await loginUser(body);

  if (!result.ok) {
    return NextResponse.json(result, { status: 401 });
  }

  setSession(result.user.id);

  return NextResponse.json(result);
}
