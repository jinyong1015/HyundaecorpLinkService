import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  createAuthToken,
  verifyCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };

  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json(
      { ok: false, message: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  const username = body.username ?? "";
  const password = body.password ?? "";

  if (!verifyCredentials(username, password)) {
    return NextResponse.json(
      { ok: false, message: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, createAuthToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
