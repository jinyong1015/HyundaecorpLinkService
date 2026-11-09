"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AUTH_USERNAME } from "@/lib/auth-public";
import { WaveBackground } from "./wave-background";
import { ThemeToggle } from "./theme-toggle";

type LoginGateProps = {
  children: ReactNode;
};

export function LoginGate({ children }: LoginGateProps) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/check", { cache: "no-store" });
        const data = (await response.json()) as { authenticated?: boolean };
        if (!cancelled) {
          setAuthenticated(Boolean(data.authenticated));
        }
      } catch {
        if (!cancelled) setAuthenticated(false);
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void checkAuth();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (ready && !authenticated) {
      passwordRef.current?.focus();
    }
  }, [ready, authenticated]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: AUTH_USERNAME,
          password,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setError(data.message ?? "비밀번호가 올바르지 않습니다.");
        setPassword("");
        passwordRef.current?.focus();
        return;
      }

      setAuthenticated(true);
    } catch {
      setError("잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return (
      <div className="relative flex min-h-dvh items-center justify-center text-[var(--foreground)]">
        <WaveBackground />
        <div className="relative z-10 h-8 w-8 animate-pulse rounded-full bg-[var(--border)]" />
      </div>
    );
  }

  if (authenticated) {
    return children;
  }

  return (
    <div className="relative min-h-dvh text-[var(--foreground)]">
      <WaveBackground />
      <ThemeToggle />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[420px] items-center px-5 py-16 sm:px-6">
        <section className="w-full rounded-[28px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 overflow-hidden rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
              <Image
                src="/avatar.png"
                alt="Hyundaecorp"
                width={148}
                height={80}
                className="h-20 w-[148px] object-contain"
                priority
              />
            </div>
            <p className="text-[12px] font-medium tracking-[0.18em] text-[var(--foreground-muted)] uppercase">
              Restricted Access
            </p>
            <h1 className="mt-2 text-[28px] font-semibold tracking-tight">
              Hyundaecorp
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-secondary)]">
              비밀번호를 입력하면 서비스 링크로 이동합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[var(--foreground-secondary)]">
                아이디
              </span>
              <input
                type="text"
                value={AUTH_USERNAME}
                readOnly
                tabIndex={-1}
                aria-readonly="true"
                className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] px-4 text-[15px] text-[var(--foreground-secondary)] outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[var(--foreground-secondary)]">
                비밀번호
              </span>
              <input
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--foreground-muted)] focus:border-[var(--border-hover)] focus:shadow-[0_0_0_4px_var(--focus-ring)]"
              />
            </label>

            {error ? (
              <p
                role="alert"
                className="rounded-xl bg-[color-mix(in_srgb,#ff453a_12%,transparent)] px-3 py-2 text-[13px] text-[#ff6961]"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting || password.length === 0}
              className="mt-2 h-12 w-full rounded-2xl bg-[var(--foreground)] text-[15px] font-semibold text-[var(--background)] transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {submitting ? "확인 중..." : "입장하기"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
