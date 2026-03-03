import { cookies } from "next/headers";

const SESSION_KEY = "saas_uid";

export function setSession(userId: string) {
  cookies().set(SESSION_KEY, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSession() {
  cookies().delete(SESSION_KEY);
}

export function getSessionUserId() {
  return cookies().get(SESSION_KEY)?.value;
}
