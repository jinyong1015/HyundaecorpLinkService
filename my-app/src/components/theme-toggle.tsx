"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
      className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] sm:right-6 sm:top-6"
    >
      {ready && theme === "light" ? (
        <Moon className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
