import { createHmac, timingSafeEqual } from "crypto";
import { AUTH_USERNAME } from "@/lib/auth-public";

export const AUTH_COOKIE = "hyundaecorp-auth";
export { AUTH_USERNAME };

/** 로그인 유지 시간 (3시간) */
export const AUTH_MAX_AGE_SECONDS = 60 * 60 * 3;

const AUTH_PASSWORD = process.env.SITE_PASSWORD ?? "0535863500";
const AUTH_SECRET =
  process.env.AUTH_SECRET ?? "hyundaecorp-link-auth-secret-v1";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyCredentials(username: string, password: string) {
  return (
    safeEqual(username.trim(), AUTH_USERNAME) &&
    safeEqual(password, AUTH_PASSWORD)
  );
}

export function createAuthToken() {
  const issuedAt = Date.now().toString();
  const signature = createHmac("sha256", AUTH_SECRET)
    .update(`${AUTH_USERNAME}:${issuedAt}`)
    .digest("hex");
  return `${issuedAt}.${signature}`;
}

export function verifyAuthToken(token: string | undefined) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const issuedAtMs = Number(issuedAt);
  if (!Number.isFinite(issuedAtMs)) return false;

  const ageMs = Date.now() - issuedAtMs;
  if (ageMs < 0 || ageMs > AUTH_MAX_AGE_SECONDS * 1000) return false;

  const expected = createHmac("sha256", AUTH_SECRET)
    .update(`${AUTH_USERNAME}:${issuedAt}`)
    .digest("hex");

  return safeEqual(signature, expected);
}
