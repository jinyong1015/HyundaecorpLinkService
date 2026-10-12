import { LinkList } from "./link-list";
import { ProfileSection } from "./profile-section";
import { ThemeToggle } from "./theme-toggle";
import { WaveBackground } from "./wave-background";

export function HomePage() {
  return (
    <div className="relative min-h-dvh text-[var(--foreground)]">
      <WaveBackground />
      <ThemeToggle />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-5 pb-10 pt-16 sm:px-6 sm:pt-20">
        <ProfileSection />
        <LinkList />

        <footer className="mt-auto pt-16 pb-2 text-center text-xs text-[var(--foreground-muted)]">
          © 2026
        </footer>
      </main>
    </div>
  );
}
